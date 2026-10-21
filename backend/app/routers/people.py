"""Departments and staff accounts (HODs, teachers)."""
import re

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import ClassRoom, Department, Student, Subject, User
from ..scope import deny, manageable_user
from ..security import admin_or_hod, audit, generate_password, hash_password, staff, superadmin
from ..serial import dept_out, user_out

router = APIRouter(prefix="/api", tags=["people"])


# ---------------- departments ----------------
class DeptIn(BaseModel):
    name: str
    description: str = ""
    hod_id: int | None = None


def dept_hod(db, dept_id):
    return db.scalar(select(User).where(User.role == "hod", User.department_id == dept_id, User.active.is_(True)))


@router.get("/departments")
def list_departments(user: User = Depends(staff), db: Session = Depends(get_db)):
    out = []
    for x in db.scalars(select(Department).order_by(Department.name)):
        counts = {
            "teachers": db.scalar(select(func.count()).select_from(User).where(
                User.role == "teacher", User.department_id == x.id, User.active.is_(True))),
            "classes": db.scalar(select(func.count()).select_from(ClassRoom).where(ClassRoom.department_id == x.id)),
        }
        out.append(dept_out(x, dept_hod(db, x.id), counts))
    return out


def _set_hod(db, dept: Department, hod_id: int | None):
    if hod_id is None:
        return
    hod = db.get(User, hod_id)
    if not hod or hod.role != "hod":
        raise HTTPException(422, "Choose an HOD account.")
    hod.department_id = dept.id


@router.post("/departments")
def create_department(body: DeptIn, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    if not body.name.strip():
        raise HTTPException(422, "Give the department a name.")
    if db.scalar(select(Department).where(func.lower(Department.name) == body.name.strip().lower())):
        raise HTTPException(409, "A department with this name already exists.")
    x = Department(name=body.name.strip(), description=body.description.strip())
    db.add(x)
    db.flush()
    _set_hod(db, x, body.hod_id)
    audit(db, user, "department.create", x.name)
    db.commit()
    return dept_out(x, dept_hod(db, x.id))


@router.put("/departments/{dept_id}")
def update_department(dept_id: int, body: DeptIn, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    x = db.get(Department, dept_id)
    if not x:
        raise HTTPException(404, "Not found.")
    x.name, x.description = body.name.strip() or x.name, body.description.strip()
    _set_hod(db, x, body.hod_id)
    audit(db, user, "department.update", x.name)
    db.commit()
    return dept_out(x, dept_hod(db, x.id))


@router.delete("/departments/{dept_id}")
def delete_department(dept_id: int, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    x = db.get(Department, dept_id)
    if not x:
        raise HTTPException(404, "Not found.")
    audit(db, user, "department.delete", x.name)
    db.delete(x)
    db.commit()
    return {"ok": True}


# ---------------- staff accounts ----------------
class StaffIn(BaseModel):
    role: str = "teacher"
    name: str
    login: str = ""
    phone: str = ""
    email: str = ""
    designation: str = ""
    qualification: str = ""
    department_id: int | None = None
    active: bool = True
    password: str = ""


def make_login(db: Session, name: str, prefix: str) -> str:
    words = [w for w in re.sub(r"[^a-z ]", " ", name.lower()).split()
             if w not in ("sri", "shri", "smt", "dr", "acharya", "mr", "mrs", "ms", "prof", "pandit")]
    base = prefix + (words[0][:12] if words else "staff")
    cand, n = base, 1
    while db.scalar(select(User).where(func.lower(User.login) == cand)):
        n += 1
        cand = f"{base}{n}"
    return cand


@router.get("/staff")
def list_staff(role: str | None = None, department_id: int | None = None, include_inactive: bool = False,
               user: User = Depends(staff), db: Session = Depends(get_db)):
    q = select(User).where(User.role.in_(["hod", "teacher"]))
    if role:
        q = q.where(User.role == role)
    if user.role == "hod":
        q = q.where(User.department_id == user.department_id)
    elif department_id:
        q = q.where(User.department_id == department_id)
    if not include_inactive:
        q = q.where(User.active.is_(True))
    rows = db.scalars(q.order_by(User.role, User.name)).all()
    out = []
    for u in rows:
        o = user_out(u, full=user.role != "teacher")
        if user.role != "teacher":
            o["class_teacher_of"] = [c.label for c in db.scalars(select(ClassRoom).where(ClassRoom.class_teacher_id == u.id))]
            o["subjects"] = [f"{s.name} · {s.classroom.label}" for s in db.scalars(select(Subject).where(Subject.teacher_id == u.id))]
        out.append(o)
    return out


@router.post("/staff")
def create_staff(body: StaffIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    if body.role not in ("hod", "teacher"):
        raise HTTPException(422, "Role must be HOD or teacher.")
    if user.role == "hod":
        if body.role != "teacher":
            deny("HODs can add teachers only.")
        body.department_id = user.department_id
    if not body.name.strip():
        raise HTTPException(422, "Enter the name.")
    login = body.login.strip().lower() or make_login(db, body.name, "t." if body.role == "teacher" else "hod.")
    if not re.fullmatch(r"[a-z0-9._@-]{3,60}", login):
        raise HTTPException(422, "Login ID: 3–60 letters, numbers, dots or dashes.")
    if db.scalar(select(User).where(func.lower(User.login) == login)):
        raise HTTPException(409, "That login ID is already taken.")
    pw = body.password or generate_password()
    u = User(role=body.role, name=body.name.strip(), login=login, phone=body.phone.strip(), email=body.email.strip(),
             designation=body.designation.strip() or ("Head of Department" if body.role == "hod" else "Teacher"),
             qualification=body.qualification.strip(), department_id=body.department_id,
             password_hash=hash_password(pw), must_change_password=True, created_by_id=user.id)
    db.add(u)
    audit(db, user, f"{body.role}.create", f"{u.name} ({login})")
    db.commit()
    return {**user_out(u, full=True), "temp_password": pw}


@router.put("/staff/{uid}")
def update_staff(uid: int, body: StaffIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    u = db.get(User, uid)
    if not u or u.role not in ("hod", "teacher"):
        raise HTTPException(404, "Not found.")
    manageable_user(user, u)
    u.name = body.name.strip() or u.name
    u.phone, u.email = body.phone.strip(), body.email.strip()
    u.designation, u.qualification = body.designation.strip(), body.qualification.strip()
    if user.role == "superadmin":
        u.department_id = body.department_id
        if body.role in ("hod", "teacher"):
            u.role = body.role
    if body.login.strip() and body.login.strip().lower() != u.login:
        nl = body.login.strip().lower()
        if db.scalar(select(User).where(func.lower(User.login) == nl, User.id != u.id)):
            raise HTTPException(409, "That login ID is already taken.")
        u.login = nl
    if u.active != body.active:
        u.active = body.active
        u.token_version += 1
    audit(db, user, f"{u.role}.update", u.name)
    db.commit()
    return user_out(u, full=True)


@router.post("/users/{uid}/reset-password")
def reset_password(uid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    from ..scope import manageable_student
    u = db.get(User, uid)
    if not u:
        raise HTTPException(404, "Not found.")
    if u.role == "parent":
        st = db.scalar(select(Student).where(Student.user_id == u.id))
        manageable_student(db, user, st.id)
    elif u.role == "superadmin":
        deny()
    else:
        manageable_user(user, u)
    pw = generate_password()
    u.password_hash = hash_password(pw)
    u.must_change_password = True
    u.token_version += 1
    audit(db, user, "password.reset", u.login)
    db.commit()
    return {"login": u.login, "temp_password": pw}


@router.delete("/staff/{uid}")
def deactivate_staff(uid: int, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    u = db.get(User, uid)
    if not u or u.role not in ("hod", "teacher"):
        raise HTTPException(404, "Not found.")
    manageable_user(user, u)
    u.active = False
    u.token_version += 1
    for c in db.scalars(select(ClassRoom).where(ClassRoom.class_teacher_id == u.id)):
        c.class_teacher_id = None
    audit(db, user, f"{u.role}.deactivate", u.name)
    db.commit()
    return {"ok": True}
