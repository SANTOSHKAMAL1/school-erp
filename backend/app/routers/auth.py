import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..email_service import send_otp_email
from ..models import PasswordResetOTP, Student, User
from ..scope import student_of
from ..security import (audit, clear_failures, clear_session, current_user, hash_password, note_failure,
                        password_problem, set_session, throttle, verify_password)
from ..serial import user_out

router = APIRouter(prefix="/api/auth", tags=["auth"])

ROLE_WORD = {"parent": "family", "teacher": "teacher", "hod": "HOD", "superadmin": "administrator"}


class LoginIn(BaseModel):
    login: str
    password: str
    remember: bool = True
    role: str | None = None   # tab chosen on the login page


def find_user(db: Session, raw: str) -> User | None:
    key = raw.strip().lower()
    if not key:
        return None
    u = db.scalar(select(User).where(func.lower(User.login) == key))
    if u:
        return u
    u_email = db.scalar(select(User).where(func.lower(User.email) == key))
    if u_email:
        return u_email
    digits = "".join(c for c in key if c.isdigit())
    if len(digits) >= 10:       # parent mobile number
        digits = digits[-10:]
        hits = [s for s in db.scalars(select(Student).where(Student.active.is_(True)))
                if "".join(c for c in s.phone if c.isdigit())[-10:] == digits]
        if len(hits) == 1:
            return hits[0].user
        staff = [x for x in db.scalars(select(User).where(User.role != "parent"))
                 if "".join(c for c in x.phone if c.isdigit())[-10:] == digits]
        if len(staff) == 1:
            return staff[0]
    return None



def me_payload(db: Session, u: User):
    out = user_out(u, full=True)
    if u.role == "parent":
        st = student_of(db, u)
        if st:
            out["student"] = {"id": st.id, "name": st.name, "admission_no": st.admission_no,
                              "class_id": st.class_id, "class_label": st.classroom.label if st.classroom else None,
                              "parent_name": st.parent_name}
    return out


@router.post("/login")
def login(body: LoginIn, request: Request, response: Response, db: Session = Depends(get_db)):
    key = f"{body.login.strip().lower()}|{request.client.host if request.client else ''}"
    throttle(key)
    u = find_user(db, body.login)
    if not u or not verify_password(body.password, u.password_hash):
        note_failure(key)
        raise HTTPException(401, "Those details do not match. Check the ID and password and try again.")
    if not u.active:
        raise HTTPException(403, "This account has been switched off. Please contact the school office.")
    if body.role and body.role != u.role:
        raise HTTPException(403, f"This is a {ROLE_WORD.get(u.role, u.role)} account — choose the "
                                 f"“{ROLE_WORD.get(u.role, u.role).capitalize()}” tab to sign in.")
    clear_failures(key)
    u.last_login = datetime.utcnow()
    audit(db, u, "login")
    db.commit()
    set_session(response, u, body.remember)
    return me_payload(db, u)


@router.post("/logout")
def logout(response: Response):
    clear_session(response)
    return {"ok": True}


@router.get("/session")
def session(request: Request, db: Session = Depends(get_db)):
    """Like /me but never 401 — the login page uses it to skip straight to the portal."""
    try:
        u = current_user(request, db)
    except HTTPException:
        return {"user": None}
    return {"user": me_payload(db, u)}


@router.get("/me")
def me(user: User = Depends(current_user), db: Session = Depends(get_db)):
    return me_payload(db, user)


class PasswordIn(BaseModel):
    current: str
    new: str


@router.post("/change-password")
def change_password(body: PasswordIn, response: Response, user: User = Depends(current_user),
                    db: Session = Depends(get_db)):
    if not verify_password(body.current, user.password_hash):
        raise HTTPException(400, "The current password is not right.")
    problem = password_problem(body.new)
    if problem:
        raise HTTPException(400, problem)
    user.password_hash = hash_password(body.new)
    user.must_change_password = False
    user.token_version += 1          # signs out other devices
    audit(db, user, "password.change")
    db.commit()
    set_session(response, user, True)
    return {"ok": True}


class ProfileIn(BaseModel):
    phone: str | None = None
    email: str | None = None


@router.put("/profile")
def update_profile(body: ProfileIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    if body.phone is not None:
        user.phone = body.phone.strip()[:30]
    if body.email is not None:
        user.email = body.email.strip()[:160]
    db.commit()
    return me_payload(db, user)


# ---------------- Forgot password via Email OTP ----------------

def mask_email(email: str) -> str:
    if "@" not in email:
        return email
    name, domain = email.split("@", 1)
    if len(name) <= 2:
        masked_name = name[0] + "*"
    else:
        masked_name = name[0] + "*" * (len(name) - 2) + name[-1]
    return f"{masked_name}@{domain}"


class RequestOTPIn(BaseModel):
    login_or_email: str


class VerifyOTPIn(BaseModel):
    login_or_email: str
    otp: str
    new_password: str


@router.post("/forgot-password/request-otp")
def request_password_reset_otp(body: RequestOTPIn, request: Request, db: Session = Depends(get_db)):
    key = f"otp|{body.login_or_email.strip().lower()}|{request.client.host if request.client else ''}"
    throttle(key)
    u = find_user(db, body.login_or_email)
    if not u or not u.active:
        raise HTTPException(404, "No active account found for that ID or email address.")
    if not u.email or "@" not in u.email:
        raise HTTPException(400, "This account does not have a registered email address. Please contact the school office to reset your password.")

    otp = f"{secrets.randbelow(900000) + 100000}"
    expires = datetime.utcnow() + timedelta(minutes=10)

    reset_entry = PasswordResetOTP(
        user_id=u.id,
        email=u.email,
        otp=otp,
        expires_at=expires,
        used=False,
    )
    db.add(reset_entry)
    db.commit()

    try:
        send_otp_email(to_email=u.email, recipient_name=u.name, otp=otp, expires_minutes=10)
    except Exception as e:
        db.delete(reset_entry)
        db.commit()
        raise HTTPException(500, f"Failed to send OTP email: {str(e)}")

    audit(db, u, "password.otp_requested", f"OTP sent to {mask_email(u.email)}")
    return {
        "ok": True,
        "message": f"Verification code sent to {mask_email(u.email)}",
        "masked_email": mask_email(u.email),
    }


@router.post("/forgot-password/verify-otp")
def verify_otp_and_reset_password(body: VerifyOTPIn, db: Session = Depends(get_db)):
    u = find_user(db, body.login_or_email)
    if not u or not u.active:
        raise HTTPException(404, "Account not found.")

    problem = password_problem(body.new_password)
    if problem:
        raise HTTPException(400, problem)

    now = datetime.utcnow()
    otp_record = db.scalar(
        select(PasswordResetOTP)
        .where(
            PasswordResetOTP.user_id == u.id,
            PasswordResetOTP.otp == body.otp.strip(),
            PasswordResetOTP.used.is_(False),
            PasswordResetOTP.expires_at >= now,
        )
        .order_by(PasswordResetOTP.id.desc())
    )
    if not otp_record:
        raise HTTPException(400, "The OTP code is invalid or has expired. Please request a new code.")

    otp_record.used = True
    u.password_hash = hash_password(body.new_password)
    u.must_change_password = False
    u.token_version += 1
    audit(db, u, "password.reset_via_otp")
    db.commit()

    return {"ok": True, "message": "Your password has been reset successfully. You can now sign in with your new password."}

