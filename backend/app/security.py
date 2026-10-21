"""Passwords, session cookie and role checks."""
import base64
import hashlib
import hmac
import secrets
import string
import time
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from . import config
from .db import get_db
from .models import AuditLog, User

COOKIE = "ag_session"
ITERATIONS = 260_000


# ---------- passwords ----------
def hash_password(pw: str) -> str:
    salt = secrets.token_bytes(16)
    dk = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, ITERATIONS)
    return f"pbkdf2_sha256${ITERATIONS}${base64.b64encode(salt).decode()}${base64.b64encode(dk).decode()}"


def verify_password(pw: str, stored: str) -> bool:
    try:
        _, it, salt, dk = stored.split("$")
        new = hashlib.pbkdf2_hmac("sha256", pw.encode(), base64.b64decode(salt), int(it))
        return hmac.compare_digest(new, base64.b64decode(dk))
    except Exception:
        return False


def generate_password(n: int = 8) -> str:
    """Readable temporary password, e.g. 'ag-7kq4mz2p'."""
    alphabet = string.ascii_lowercase + string.digits
    alphabet = "".join(c for c in alphabet if c not in "0o1l")
    return "ag-" + "".join(secrets.choice(alphabet) for _ in range(n))


def password_problem(pw: str) -> str | None:
    if len(pw) < 8:
        return "Use at least 8 characters."
    if pw.isdigit() or pw.isalpha():
        return "Mix letters with numbers or symbols."
    return None


# ---------- session ----------
def make_token(user: User, remember: bool) -> tuple[str, int]:
    seconds = config.REMEMBER_DAYS * 86400 if remember else config.SESSION_HOURS * 3600
    payload = {
        "sub": str(user.id),
        "ver": user.token_version,
        "role": user.role,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=seconds),
    }
    return jwt.encode(payload, config.SECRET_KEY, algorithm="HS256"), seconds


def set_session(response, user: User, remember: bool):
    token, seconds = make_token(user, remember)
    response.set_cookie(COOKIE, token, max_age=seconds if remember else None, httponly=True,
                        secure=config.COOKIE_SECURE, samesite="lax", path="/")


def clear_session(response):
    response.delete_cookie(COOKIE, path="/")


def current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.cookies.get(COOKIE)
    if not token:
        raise HTTPException(401, "Please sign in.")
    try:
        data = jwt.decode(token, config.SECRET_KEY, algorithms=["HS256"])
    except jwt.PyJWTError:
        raise HTTPException(401, "Your session has ended. Please sign in again.")
    user = db.get(User, int(data["sub"]))
    if not user or not user.active or user.token_version != data.get("ver"):
        raise HTTPException(401, "Your session has ended. Please sign in again.")
    return user


def require(*roles):
    def dep(user: User = Depends(current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(403, "You do not have access to this.")
        return user
    return dep


staff = require("superadmin", "hod", "teacher")
admin_or_hod = require("superadmin", "hod")
superadmin = require("superadmin")
parent = require("parent")


# ---------- login throttling (per login id + ip) ----------
_attempts: dict[str, list[float]] = {}


def throttle(key: str):
    now = time.time()
    hits = [t for t in _attempts.get(key, []) if now - t < 900]
    _attempts[key] = hits
    if len(hits) >= 8:
        raise HTTPException(429, "Too many attempts. Please wait 15 minutes and try again.")


def note_failure(key: str):
    _attempts.setdefault(key, []).append(time.time())


def clear_failures(key: str):
    _attempts.pop(key, None)


def audit(db: Session, user: User | None, action: str, detail: str = ""):
    db.add(AuditLog(user_id=user.id if user else None, action=action, detail=detail[:400]))
