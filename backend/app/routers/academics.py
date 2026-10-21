"""Classes, subjects, students and timetables."""
import re
from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import ClassRoom, Department, Student, Subject, TimetableSlot, User
from ..scope import (class_ids_for, deny, manageable_class, manageable_student, get_student, parse_day,
                     readable_class)
from ..security import admin_or_hod, audit, current_user, generate_password, hash_password, staff
from ..serial import class_out, slot_out, student_out, subject_out

router = APIRouter(prefix="/api", tags=["academics"])


# ---------------- classes ----------------
class ClassIn(BaseModel):
    name: str
    section: str = "A"
    academic_year: str = "2026-27"
    room: str = ""
    department_id: int | None = None
    class_teacher_id: int | None = None


def student_count(db, cid):
    return db.scalar(select(func.count()).select_from(Student).where(Student.class_id == cid, Student.active.is_(True)))


@router.get("/classes")
def list_classes(user: User = Depends(current_user), db: Session = Depends(get_db)):
    ids = class_ids_for(db, user)
    q = select(ClassRoom)
    if ids is not None:
        q = q.where(ClassRoom.id.in_(ids or [-1]))
    rows = db.scalars(q).all()
    order = lambda c: (_grade_rank(c.name), c.section)
    return [class_out(c, student_count(db, c.id)) for c in sorted(rows, key=order)]


def _grade_rank(name: str):
    n = name.lower()
    for i, k in enumerate(["nursery", "pre", "lkg", "ukg"]):
        if k in n:
            return i
    m = re.search(r"\d+", n)
    return 10 + int(m.group()) if m else 99


def _check_teacher(db, user: User, teacher_id, dept_id):
    if teacher_id is None:
        return
    t = db.get(User, teacher_id)
    if not t or t.role not in ("teacher", "hod") or not t.active:
        raise HTTPException(422, "Choose an active teacher.")
    if user.role == "hod" and t.department_id != user.department_id:
        deny("Choose a teacher from your department.")


@router.post("/classes")
def create_class(body: ClassIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    if user.role == "hod":
        body.department_id = user.department_id
    if not body.name.strip():
        raise HTTPException(422, "Enter the class name, e.g. Grade 5.")
    _check_teacher(db, user, body.class_teacher_id, body.department_id)
    if db.scalar(select(ClassRoom).where(ClassRoom.name == body.name.strip(), ClassRoom.section == body.section.strip(),
                                         ClassRoom.academic_year == body.academic_year)):
        raise HTTPException(409, "This class and section already exist for the year.")
    c = ClassRoom(**{**body.model_dump(), "name": body.name.strip(), "section": body.section.strip()})
    db.add(c)
    audit(db, user, "class.create", f"{c.name} {c.section}")
    db.commit()
    return class_out(c, 0)


@router.put("/classes/{cid}")
def update_class(cid: int, body: ClassIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    c = manageable_class(db, user, cid)
    if user.role == "hod":
        body.department_id = user.department_id
    _check_teacher(db, user, body.class_teacher_id, body.department_id)
    for k, v in body.model_dump().items():
        setattr(c, k, v.strip() if isinstance(v, str) else v)
    audit(db, user, "class.update", c.label)
    db.commit()
    return class_out(c, student_count(db, c.id))


@router.delete("/classes/{cid}")
def delete_class(cid: int, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    c = manageable_class(db, user, cid)
    if student_count(db, cid):
        raise HTTPException(409, "Move the students to another class before deleting this one.")
    audit(db, user, "class.delete", c.label)
    db.delete(c)
    db.commit()
    return {"ok": True}


# ---------------- subjects ----------------
class SubjectIn(BaseModel):
    class_id: int
    name: str
    teacher_id: int | None = None


@router.get("/subjects")
def list_subjects(class_id: int | None = None, mine: bool = False, user: User = Depends(current_user),
                  db: Session = Depends(get_db)):
    q = select(Subject)
    if class_id:
        readable_class(db, user, class_id)
        q = q.where(Subject.class_id == class_id)
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.where(Subject.class_id.in_(ids or [-1]))
    if mine and user.role == "teacher":
        own = [c.id for c in db.scalars(select(ClassRoom).where(ClassRoom.class_teacher_id == user.id))]
        q = q.where(or_(Subject.teacher_id == user.id, Subject.class_id.in_(own or [-1])))
    return [subject_out(s) for s in db.scalars(q.order_by(Subject.class_id, Subject.name))]


@router.post("/subjects")
def create_subject(body: SubjectIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    c = manageable_class(db, user, body.class_id)
    _check_teacher(db, user, body.teacher_id, c.department_id)
    s = Subject(class_id=c.id, name=body.name.strip(), teacher_id=body.teacher_id)
    db.add(s)
    db.commit()
    return subject_out(s)


@router.put("/subjects/{sid}")
def update_subject(sid: int, body: SubjectIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    s = db.get(Subject, sid) or _404()
    c = manageable_class(db, user, s.class_id)
    _check_teacher(db, user, body.teacher_id, c.department_id)
    s.name, s.teacher_id = body.name.strip() or s.name, body.teacher_id
    db.commit()
    return subject_out(s)


@router.delete("/subjects/{sid}")
def delete_subject(sid: int, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    s = db.get(Subject, sid) or _404()
    manageable_class(db, user, s.class_id)
    db.delete(s)
    db.commit()
    return {"ok": True}


def _404():
    raise HTTPException(404, "Not found.")


# ---------------- students ----------------
class StudentIn(BaseModel):
    name: str
    class_id: int | None = None
    admission_no: str = ""
    roll_no: str = ""
    dob: str | None = None
    gender: str = ""
    blood_group: str = ""
    parent_name: str = ""
    mother_name: str = ""
    phone: str = ""
    email: str = ""
    address: str = ""
    admitted_on: str | None = None
    active: bool = True


def next_admission_no(db: Session) -> str:
    year = date.today().year
    prefix = f"AG{year}"
    nums = [int(x[len(prefix):]) for x in db.scalars(select(Student.admission_no).where(Student.admission_no.like(prefix + "%")))
            if x[len(prefix):].isdigit()]
    return f"{prefix}{(max(nums) + 1 if nums else 1):03d}"


@router.get("/students")
def list_students(class_id: int | None = None, q: str = "", include_inactive: bool = False,
                  user: User = Depends(staff), db: Session = Depends(get_db)):
    stmt = select(Student)
    if class_id:
        readable_class(db, user, class_id)
        stmt = stmt.where(Student.class_id == class_id)
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            stmt = stmt.where(Student.class_id.in_(ids or [-1]))
    if not include_inactive:
        stmt = stmt.where(Student.active.is_(True))
    if q.strip():
        like = f"%{q.strip()}%"
        stmt = stmt.where(or_(Student.name.ilike(like), Student.admission_no.ilike(like),
                              Student.parent_name.ilike(like), Student.phone.ilike(like)))
    rows = db.scalars(stmt.order_by(Student.class_id, Student.roll_no, Student.name).limit(2000)).all()
    rows.sort(key=lambda s: (s.class_id or 0, int(s.roll_no) if s.roll_no.isdigit() else 999, s.name))
    return [student_out(s) for s in rows]


@router.get("/students/{sid}")
def get_one_student(sid: int, user: User = Depends(current_user), db: Session = Depends(get_db)):
    return student_out(get_student(db, user, sid))


def _apply_student(st: Student, body: StudentIn):
    for k in ("name", "roll_no", "gender", "blood_group", "parent_name", "mother_name", "phone", "email", "address"):
        setattr(st, k, (getattr(body, k) or "").strip())
    st.dob = parse_day(body.dob)
    st.admitted_on = parse_day(body.admitted_on)


@router.post("/students")
def create_student(body: StudentIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    if not body.class_id:
        raise HTTPException(422, "Choose the class.")
    manageable_class(db, user, body.class_id)
    if not body.name.strip():
        raise HTTPException(422, "Enter the student's name.")
    adm = (body.admission_no.strip().upper() or next_admission_no(db))
    if not re.fullmatch(r"[A-Z0-9/_-]{3,40}", adm):
        raise HTTPException(422, "Admission number: letters, numbers, / or - only.")
    if db.scalar(select(Student).where(Student.admission_no == adm)) or \
            db.scalar(select(User).where(func.lower(User.login) == adm.lower())):
        raise HTTPException(409, "That admission number is already in use.")
    pw = generate_password()
    login_user = User(role="parent", name=body.parent_name.strip() or f"Parent of {body.name.strip()}",
                      login=adm.lower(), phone=body.phone.strip(), email=body.email.strip(),
                      password_hash=hash_password(pw), must_change_password=True, created_by_id=user.id)
    db.add(login_user)
    db.flush()
    st = Student(user_id=login_user.id, admission_no=adm, class_id=body.class_id, created_by_id=user.id,
                 admitted_on=date.today())
    _apply_student(st, body)
    if not st.admitted_on:
        st.admitted_on = date.today()
    db.add(st)
    audit(db, user, "student.create", f"{st.name} ({adm})")
    db.commit()
    return {**student_out(st), "temp_password": pw}


@router.put("/students/{sid}")
def update_student(sid: int, body: StudentIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    st = manageable_student(db, user, sid)
    if body.class_id and body.class_id != st.class_id:
        manageable_class(db, user, body.class_id)      # must be allowed in the new class too
        st.class_id = body.class_id
    _apply_student(st, body)
    if st.user:
        st.user.name = st.parent_name or f"Parent of {st.name}"
        st.user.phone, st.user.email = st.phone, st.email
        if st.active != body.active:
            st.user.active = body.active
            st.user.token_version += 1
    st.active = body.active
    audit(db, user, "student.update", st.name)
    db.commit()
    return student_out(st)


@router.delete("/students/{sid}")
def remove_student(sid: int, hard: bool = False, user: User = Depends(staff), db: Session = Depends(get_db)):
    st = manageable_student(db, user, sid)
    if hard:
        if user.role != "superadmin":
            deny("Only the administrator can permanently delete a student record.")
        audit(db, user, "student.delete", f"{st.name} ({st.admission_no})")
        u = st.user
        db.delete(st)
        if u:
            db.delete(u)
    else:
        st.active = False
        if st.user:
            st.user.active = False
            st.user.token_version += 1
        audit(db, user, "student.deactivate", st.name)
    db.commit()
    return {"ok": True}


@router.post("/students/{sid}/reset-password")
def reset_family_password(sid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    st = manageable_student(db, user, sid)
    pw = generate_password()
    st.user.password_hash = hash_password(pw)
    st.user.must_change_password = True
    st.user.token_version += 1
    audit(db, user, "password.reset", st.user.login)
    db.commit()
    return {"login": st.user.login, "temp_password": pw}


# ---------------- timetable ----------------
class SlotIn(BaseModel):
    weekday: int
    period: int
    starts: str = ""
    ends: str = ""
    subject: str = ""
    teacher_id: int | None = None


class TimetableIn(BaseModel):
    slots: list[SlotIn]


@router.get("/timetable")
def get_timetable(class_id: int | None = None, teacher_id: int | None = None, user: User = Depends(current_user),
                  db: Session = Depends(get_db)):
    q = select(TimetableSlot)
    if class_id:
        readable_class(db, user, class_id)
        q = q.where(TimetableSlot.class_id == class_id)
    elif teacher_id or user.role == "teacher":
        q = q.where(TimetableSlot.teacher_id == (teacher_id or user.id))
    else:
        raise HTTPException(422, "Choose a class.")
    rows = db.scalars(q.order_by(TimetableSlot.weekday, TimetableSlot.period)).all()
    labels = {c.id: c.label for c in db.scalars(select(ClassRoom))}
    return [{**slot_out(t), "class_label": labels.get(t.class_id)} for t in rows]


@router.put("/timetable/{class_id}")
def save_timetable(class_id: int, body: TimetableIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    manageable_class(db, user, class_id)
    for t in db.scalars(select(TimetableSlot).where(TimetableSlot.class_id == class_id)):
        db.delete(t)
    for s in body.slots:
        if not (0 <= s.weekday <= 5) or not s.subject.strip():
            continue
        db.add(TimetableSlot(class_id=class_id, **{**s.model_dump(), "subject": s.subject.strip()}))
    audit(db, user, "timetable.save", str(class_id))
    db.commit()
    return get_timetable(class_id, None, user, db)
