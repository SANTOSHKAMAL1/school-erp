"""Who can see / change what.

superadmin – everything
hod        – everything inside their department
teacher    – classes they are class teacher of, or teach a subject in
parent     – their own child only
"""
from datetime import date

from fastapi import HTTPException
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from .models import ClassRoom, Student, Subject, User


def deny(msg="You do not have access to this."):
    raise HTTPException(403, msg)


def class_ids_for(db: Session, user: User) -> list[int] | None:
    """Class ids the user may read. None = all classes."""
    if user.role == "superadmin":
        return None
    if user.role == "hod":
        if not user.department_id:
            return []
        return list(db.scalars(select(ClassRoom.id).where(ClassRoom.department_id == user.department_id)))
    if user.role == "teacher":
        own = set(db.scalars(select(ClassRoom.id).where(ClassRoom.class_teacher_id == user.id)))
        taught = set(db.scalars(select(Subject.class_id).where(Subject.teacher_id == user.id)))
        return sorted(own | taught)
    if user.role == "parent":
        st = student_of(db, user)
        return [st.class_id] if st and st.class_id else []
    return []


def student_of(db: Session, user: User) -> Student | None:
    return db.scalar(select(Student).where(Student.user_id == user.id))


def get_class(db: Session, class_id: int) -> ClassRoom:
    c = db.get(ClassRoom, class_id)
    if not c:
        raise HTTPException(404, "Class not found.")
    return c


def can_read_class(db: Session, user: User, c: ClassRoom) -> bool:
    ids = class_ids_for(db, user)
    return ids is None or c.id in ids


def can_manage_class(user: User, c: ClassRoom) -> bool:
    """Create/edit students, mark attendance, approve leave."""
    if user.role == "superadmin":
        return True
    if user.role == "hod":
        return bool(user.department_id) and c.department_id == user.department_id
    if user.role == "teacher":
        return c.class_teacher_id == user.id
    return False


def can_teach(db: Session, user: User, c: ClassRoom, subject_id: int | None) -> bool:
    """Marks and homework: class teacher, subject teacher, HOD, admin."""
    if can_manage_class(user, c):
        return True
    if user.role == "teacher" and subject_id:
        s = db.get(Subject, subject_id)
        return bool(s and s.class_id == c.id and s.teacher_id == user.id)
    return False


def readable_class(db: Session, user: User, class_id: int) -> ClassRoom:
    c = get_class(db, class_id)
    if not can_read_class(db, user, c):
        deny()
    return c


def manageable_class(db: Session, user: User, class_id: int) -> ClassRoom:
    c = get_class(db, class_id)
    if not can_manage_class(user, c):
        deny("Only the class teacher, the HOD or the administrator can do this for this class.")
    return c


def get_student(db: Session, user: User, student_id: int) -> Student:
    st = db.get(Student, student_id)
    if not st:
        raise HTTPException(404, "Student not found.")
    if user.role == "parent":
        if st.user_id != user.id:
            deny()
        return st
    if user.role == "superadmin":
        return st
    if st.class_id is None:
        if user.role == "hod":
            return st
        deny()
    c = db.get(ClassRoom, st.class_id)
    if not can_read_class(db, user, c):
        deny()
    return st


def manageable_student(db: Session, user: User, student_id: int) -> Student:
    st = get_student(db, user, student_id)
    if user.role == "superadmin":
        return st
    c = db.get(ClassRoom, st.class_id) if st.class_id else None
    if not c or not can_manage_class(user, c):
        deny("Only the class teacher, the HOD or the administrator can change this student.")
    return st


def manageable_user(user: User, target: User):
    """superadmin manages everyone; HOD manages teachers in their department."""
    if user.role == "superadmin":
        return
    if user.role == "hod" and target.role == "teacher" and target.department_id == user.department_id:
        return
    deny()


def parse_day(s: str | None) -> date | None:
    if not s:
        return None
    try:
        return date.fromisoformat(s[:10])
    except ValueError:
        raise HTTPException(422, f"Invalid date: {s}")
