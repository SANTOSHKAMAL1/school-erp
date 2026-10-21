"""Attendance, assessments & marks, homework."""
import calendar
from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Assessment, Attendance, ClassRoom, Homework, Mark, Student, Subject, User
from ..scope import (can_teach, class_ids_for, deny, get_student, manageable_class, parse_day,
                     readable_class)
from ..security import audit, current_user, staff
from ..serial import assessment_out, homework_out

router = APIRouter(prefix="/api", tags=["records"])

STATUSES = {"P", "A", "L", "H"}


def roster(db, class_id):
    rows = db.scalars(select(Student).where(Student.class_id == class_id, Student.active.is_(True))).all()
    return sorted(rows, key=lambda s: (int(s.roll_no) if s.roll_no.isdigit() else 999, s.name))


# ---------------- attendance ----------------
@router.get("/attendance")
def attendance_sheet(class_id: int, day: str | None = None, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = readable_class(db, user, class_id)
    d = parse_day(day) or date.today()
    marks = {a.student_id: a for a in db.scalars(select(Attendance).where(Attendance.class_id == class_id, Attendance.day == d))}
    from ..scope import can_manage_class
    return {
        "class_id": c.id, "class_label": c.label, "day": d.isoformat(),
        "can_edit": can_manage_class(user, c), "marked": bool(marks),
        "students": [{"student_id": s.id, "name": s.name, "roll_no": s.roll_no, "admission_no": s.admission_no,
                      "status": marks[s.id].status if s.id in marks else None,
                      "note": marks[s.id].note if s.id in marks else ""} for s in roster(db, class_id)],
    }


class AttEntry(BaseModel):
    student_id: int
    status: str
    note: str = ""


class AttIn(BaseModel):
    class_id: int
    day: str
    entries: list[AttEntry]


@router.post("/attendance")
def save_attendance(body: AttIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = manageable_class(db, user, body.class_id)
    d = parse_day(body.day)
    if d > date.today():
        raise HTTPException(422, "Attendance cannot be marked for a future date.")
    valid = {s.id for s in roster(db, c.id)}
    existing = {a.student_id: a for a in db.scalars(select(Attendance).where(Attendance.class_id == c.id, Attendance.day == d))}
    for e in body.entries:
        if e.student_id not in valid or e.status not in STATUSES:
            continue
        a = existing.get(e.student_id)
        if a:
            a.status, a.note, a.marked_by_id = e.status, e.note[:200], user.id
        else:
            db.add(Attendance(student_id=e.student_id, class_id=c.id, day=d, status=e.status, note=e.note[:200],
                              marked_by_id=user.id))
    audit(db, user, "attendance.mark", f"{c.label} {d}")
    db.commit()
    return attendance_sheet(c.id, d.isoformat(), user, db)


def attendance_stats(db, student_id, start=None, end=None):
    q = select(Attendance.status, func.count()).where(Attendance.student_id == student_id)
    if start:
        q = q.where(Attendance.day >= start)
    if end:
        q = q.where(Attendance.day <= end)
    counts = dict(db.execute(q.group_by(Attendance.status)).all())
    total = sum(counts.values())
    present = counts.get("P", 0) + counts.get("L", 0) + 0.5 * counts.get("H", 0)
    return {"days": total, "present": counts.get("P", 0), "absent": counts.get("A", 0), "late": counts.get("L", 0),
            "half": counts.get("H", 0), "percent": round(100 * present / total, 1) if total else None}


@router.get("/attendance/report")
def attendance_report(class_id: int, month: str | None = None, user: User = Depends(staff), db: Session = Depends(get_db)):
    """Month grid for a class: one row per student, one column per school day marked."""
    c = readable_class(db, user, class_id)
    today = date.today()
    y, m = (int(month[:4]), int(month[5:7])) if month else (today.year, today.month)
    start, end = date(y, m, 1), date(y, m, calendar.monthrange(y, m)[1])
    rows = db.scalars(select(Attendance).where(Attendance.class_id == c.id, Attendance.day.between(start, end))).all()
    days = sorted({a.day for a in rows})
    grid = {}
    for a in rows:
        grid.setdefault(a.student_id, {})[a.day.isoformat()] = a.status
    out = []
    for s in roster(db, c.id):
        st = attendance_stats(db, s.id, start, end)
        out.append({"student_id": s.id, "name": s.name, "roll_no": s.roll_no, "days": grid.get(s.id, {}), **st})
    return {"class_label": c.label, "month": f"{y}-{m:02d}", "dates": [d.isoformat() for d in days], "students": out}


@router.get("/attendance/student/{sid}")
def student_attendance(sid: int, month: str | None = None, user: User = Depends(current_user), db: Session = Depends(get_db)):
    st = get_student(db, user, sid)
    q = select(Attendance).where(Attendance.student_id == st.id)
    if month:
        y, m = int(month[:4]), int(month[5:7])
        q = q.where(Attendance.day.between(date(y, m, 1), date(y, m, calendar.monthrange(y, m)[1])))
    rows = db.scalars(q.order_by(Attendance.day.desc()).limit(400)).all()
    return {"overall": attendance_stats(db, st.id),
            "records": [{"day": a.day.isoformat(), "status": a.status, "note": a.note} for a in rows]}


# ---------------- assessments & marks ----------------
class AssessmentIn(BaseModel):
    class_id: int
    subject_id: int | None = None
    name: str
    max_marks: float = 100
    held_on: str | None = None
    published: bool = False


def _assess_stats(db, a: Assessment):
    vals = [m for m in db.scalars(select(Mark.marks).where(Mark.assessment_id == a.id)) if m is not None]
    return {"entered": len(vals), "average": round(sum(vals) / len(vals), 1) if vals else None,
            "highest": max(vals) if vals else None}


@router.get("/assessments")
def list_assessments(class_id: int | None = None, user: User = Depends(staff), db: Session = Depends(get_db)):
    q = select(Assessment)
    if class_id:
        readable_class(db, user, class_id)
        q = q.where(Assessment.class_id == class_id)
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.where(Assessment.class_id.in_(ids or [-1]))
    rows = db.scalars(q.order_by(Assessment.held_on.desc().nulls_last(), Assessment.id.desc())).all()
    out = []
    for a in rows:
        c = db.get(ClassRoom, a.class_id)
        out.append({**assessment_out(a, _assess_stats(db, a)), "can_edit": can_teach(db, user, c, a.subject_id)})
    return out


def _check_subject(db, class_id, subject_id):
    if subject_id:
        s = db.get(Subject, subject_id)
        if not s or s.class_id != class_id:
            raise HTTPException(422, "That subject is not part of this class.")


@router.post("/assessments")
def create_assessment(body: AssessmentIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = readable_class(db, user, body.class_id)
    _check_subject(db, c.id, body.subject_id)
    if not can_teach(db, user, c, body.subject_id):
        deny("You can add assessments only for subjects you teach.")
    if not body.name.strip():
        raise HTTPException(422, "Name the assessment, e.g. Term I or Unit test 2.")
    if body.max_marks <= 0:
        raise HTTPException(422, "Maximum marks must be more than zero.")
    a = Assessment(class_id=c.id, subject_id=body.subject_id, name=body.name.strip(), max_marks=body.max_marks,
                   held_on=parse_day(body.held_on), published=body.published, created_by_id=user.id)
    db.add(a)
    audit(db, user, "assessment.create", f"{a.name} · {c.label}")
    db.commit()
    return assessment_out(a)


def _editable_assessment(db, user, aid) -> Assessment:
    a = db.get(Assessment, aid)
    if not a:
        raise HTTPException(404, "Not found.")
    c = db.get(ClassRoom, a.class_id)
    if not can_teach(db, user, c, a.subject_id):
        deny("You can change marks only for subjects you teach.")
    return a


@router.put("/assessments/{aid}")
def update_assessment(aid: int, body: AssessmentIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    a = _editable_assessment(db, user, aid)
    a.name, a.max_marks, a.held_on, a.published = body.name.strip() or a.name, body.max_marks, parse_day(body.held_on), body.published
    db.commit()
    return assessment_out(a)


@router.delete("/assessments/{aid}")
def delete_assessment(aid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    a = _editable_assessment(db, user, aid)
    db.delete(a)
    db.commit()
    return {"ok": True}


@router.get("/assessments/{aid}/marks")
def get_marks(aid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    a = db.get(Assessment, aid)
    if not a:
        raise HTTPException(404, "Not found.")
    c = readable_class(db, user, a.class_id)
    have = {m.student_id: m for m in db.scalars(select(Mark).where(Mark.assessment_id == a.id))}
    return {"assessment": assessment_out(a), "can_edit": can_teach(db, user, c, a.subject_id),
            "students": [{"student_id": s.id, "name": s.name, "roll_no": s.roll_no,
                          "marks": have[s.id].marks if s.id in have else None,
                          "remark": have[s.id].remark if s.id in have else ""} for s in roster(db, a.class_id)]}


class MarkEntry(BaseModel):
    student_id: int
    marks: float | None = None
    remark: str = ""


class MarksIn(BaseModel):
    entries: list[MarkEntry]
    published: bool | None = None


@router.post("/assessments/{aid}/marks")
def save_marks(aid: int, body: MarksIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    a = _editable_assessment(db, user, aid)
    valid = {s.id for s in roster(db, a.class_id)}
    have = {m.student_id: m for m in db.scalars(select(Mark).where(Mark.assessment_id == a.id))}
    for e in body.entries:
        if e.student_id not in valid:
            continue
        if e.marks is not None and not (0 <= e.marks <= a.max_marks):
            raise HTTPException(422, f"Marks must be between 0 and {a.max_marks:g}.")
        m = have.get(e.student_id)
        if m:
            m.marks, m.remark = e.marks, e.remark[:200]
        else:
            db.add(Mark(assessment_id=a.id, student_id=e.student_id, marks=e.marks, remark=e.remark[:200]))
    if body.published is not None:
        a.published = body.published
    audit(db, user, "marks.save", a.name)
    db.commit()
    return get_marks(aid, user, db)


@router.get("/results/student/{sid}")
def student_results(sid: int, user: User = Depends(current_user), db: Session = Depends(get_db)):
    st = get_student(db, user, sid)
    q = select(Assessment).where(Assessment.class_id == st.class_id)
    if user.role == "parent":
        q = q.where(Assessment.published.is_(True))
    out = []
    for a in db.scalars(q.order_by(Assessment.held_on.desc().nulls_last(), Assessment.id.desc())):
        m = db.scalar(select(Mark).where(Mark.assessment_id == a.id, Mark.student_id == st.id))
        stats = _assess_stats(db, a)
        out.append({**assessment_out(a), "marks": m.marks if m else None, "remark": m.remark if m else "",
                    "percent": round(100 * m.marks / a.max_marks, 1) if m and m.marks is not None else None,
                    "class_average": stats["average"]})
    return out


# ---------------- homework ----------------
class HomeworkIn(BaseModel):
    class_id: int
    subject_id: int | None = None
    title: str
    details: str = ""
    due_on: str | None = None
    attachment: str = ""


@router.get("/homework")
def list_homework(class_id: int | None = None, user: User = Depends(current_user), db: Session = Depends(get_db)):
    q = select(Homework)
    if class_id:
        readable_class(db, user, class_id)
        q = q.where(Homework.class_id == class_id)
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.where(Homework.class_id.in_(ids or [-1]))
    labels = {c.id: c.label for c in db.scalars(select(ClassRoom))}
    rows = db.scalars(q.order_by(Homework.created_at.desc()).limit(300)).all()
    out = []
    for h in rows:
        o = homework_out(h, labels.get(h.class_id))
        if user.role != "parent":
            o["can_edit"] = h.created_by_id == user.id or user.role in ("superadmin", "hod")
        out.append(o)
    return out


@router.post("/homework")
def create_homework(body: HomeworkIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = readable_class(db, user, body.class_id)
    _check_subject(db, c.id, body.subject_id)
    if not can_teach(db, user, c, body.subject_id):
        deny("You can set homework only for subjects you teach.")
    if not body.title.strip():
        raise HTTPException(422, "Give the homework a title.")
    h = Homework(class_id=c.id, subject_id=body.subject_id, title=body.title.strip(), details=body.details.strip(),
                 due_on=parse_day(body.due_on), attachment=body.attachment.strip(), created_by_id=user.id)
    db.add(h)
    db.commit()
    return homework_out(h, c.label)


def _own_homework(db, user, hid):
    h = db.get(Homework, hid)
    if not h:
        raise HTTPException(404, "Not found.")
    if user.role == "teacher" and h.created_by_id != user.id:
        deny("You can change only homework you set.")
    readable_class(db, user, h.class_id)
    return h


@router.put("/homework/{hid}")
def update_homework(hid: int, body: HomeworkIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    h = _own_homework(db, user, hid)
    h.title, h.details, h.due_on, h.attachment = body.title.strip() or h.title, body.details.strip(), parse_day(body.due_on), body.attachment.strip()
    h.subject_id = body.subject_id
    db.commit()
    return homework_out(h)


@router.delete("/homework/{hid}")
def delete_homework(hid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    h = _own_homework(db, user, hid)
    db.delete(h)
    db.commit()
    return {"ok": True}
