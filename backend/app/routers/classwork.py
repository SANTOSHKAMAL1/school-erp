"""Inside a class: exam mark sheets and results, study materials, student participation."""
from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Assessment, Circular, ClassRoom, Mark, Material, Participation, Student, Subject, User
from ..scope import (can_manage_class, can_teach, class_ids_for, deny, get_student, manageable_class, parse_day,
                     readable_class, student_of)
from ..security import audit, current_user, staff
from ..serial import material_out, participation_out
from .records import roster

router = APIRouter(prefix="/api", tags=["classwork"])

# The school's examinations, in the order they happen in the year.
EXAMS = ["Mid-term", "Quarterly", "Half-yearly", "Annual"]


@router.get("/exams")
def exam_names(user: User = Depends(current_user)):
    return EXAMS


# ---------------- exam mark sheet (every subject of a class for one exam) ----------------
def exam_sheet(db: Session, user: User, c: ClassRoom, name: str):
    subjects = db.scalars(select(Subject).where(Subject.class_id == c.id).order_by(Subject.id)).all()
    tests = {a.subject_id: a for a in db.scalars(select(Assessment).where(Assessment.class_id == c.id,
                                                                          Assessment.name == name))}
    ids = [a.id for a in tests.values()]
    marks = {(m.assessment_id, m.student_id): m.marks
             for m in db.scalars(select(Mark).where(Mark.assessment_id.in_(ids or [-1])))}
    cols = []
    for s in subjects:
        a = tests.get(s.id)
        cols.append({"id": s.id, "name": s.name, "teacher": s.teacher.name if s.teacher else None,
                     "assessment_id": a.id if a else None, "max_marks": a.max_marks if a else None,
                     "published": a.published if a else False, "can_edit": can_teach(db, user, c, s.id)})
    rows = []
    for st in roster(db, c.id):
        got, total, out_of = {}, 0.0, 0.0
        for s in subjects:
            a = tests.get(s.id)
            v = marks.get((a.id, st.id)) if a else None
            got[str(s.id)] = v
            if v is not None:
                total += v
                out_of += a.max_marks
        rows.append({"id": st.id, "name": st.name, "roll_no": st.roll_no, "marks": got,
                     "total": round(total, 1), "out_of": out_of,
                     "percent": round(100 * total / out_of, 1) if out_of else None})
    ranked = sorted((r for r in rows if r["percent"] is not None), key=lambda r: -r["percent"])
    for i, r in enumerate(ranked):
        r["rank"] = i + 1
    held = next((a.held_on for a in tests.values() if a.held_on), None)
    return {"class_id": c.id, "class_label": c.label, "exam": name, "held_on": held.isoformat() if held else None,
            "subjects": cols, "students": rows, "can_publish": can_manage_class(user, c),
            "published": bool(tests) and all(a.published for a in tests.values())}


@router.get("/classes/{cid}/exam")
def get_exam(cid: int, name: str, user: User = Depends(staff), db: Session = Depends(get_db)):
    return exam_sheet(db, user, readable_class(db, user, cid), name.strip())


class ExamEntry(BaseModel):
    student_id: int
    subject_id: int
    marks: float | None = None


class ExamIn(BaseModel):
    name: str
    max_marks: float = 100
    held_on: str | None = None
    entries: list[ExamEntry]


@router.post("/classes/{cid}/exam")
def save_exam(cid: int, body: ExamIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = readable_class(db, user, cid)
    name = body.name.strip()
    if not name or len(name) > 120:
        raise HTTPException(422, "Choose the examination (a name up to 120 characters).")
    if body.max_marks <= 0:
        raise HTTPException(422, "Maximum marks must be more than zero.")
    subjects = {s.id: s for s in db.scalars(select(Subject).where(Subject.class_id == c.id))}
    valid = {s.id for s in roster(db, c.id)}
    tests = {a.subject_id: a for a in db.scalars(select(Assessment).where(Assessment.class_id == c.id,
                                                                          Assessment.name == name))}
    for sid in {e.subject_id for e in body.entries}:
        if sid not in subjects:
            raise HTTPException(422, "That subject is not part of this class.")
        if not can_teach(db, user, c, sid):
            deny(f"You can enter marks only for subjects you teach ({subjects[sid].name} is not yours).")
        if sid not in tests:
            a = Assessment(class_id=c.id, subject_id=sid, name=name, max_marks=body.max_marks,
                           held_on=parse_day(body.held_on), created_by_id=user.id)
            db.add(a)
            db.flush()
            tests[sid] = a
    have = {(m.assessment_id, m.student_id): m
            for m in db.scalars(select(Mark).where(Mark.assessment_id.in_([a.id for a in tests.values()] or [-1])))}
    for e in body.entries:
        if e.student_id not in valid:
            continue
        a = tests[e.subject_id]
        if e.marks is not None and not (0 <= e.marks <= a.max_marks):
            raise HTTPException(422, f"{subjects[e.subject_id].name}: marks must be between 0 and {a.max_marks:g}.")
        m = have.get((a.id, e.student_id))
        if m:
            m.marks = e.marks
        else:
            db.add(Mark(assessment_id=a.id, student_id=e.student_id, marks=e.marks))
    audit(db, user, "exam.save", f"{name} · {c.label}")
    db.commit()
    return exam_sheet(db, user, c, name)


class PublishIn(BaseModel):
    name: str
    published: bool = True
    notify: bool = True


@router.post("/classes/{cid}/exam/publish")
def publish_exam(cid: int, body: PublishIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    """Announce (or withdraw) the results of one exam for the whole class."""
    c = manageable_class(db, user, cid)
    name = body.name.strip()
    tests = db.scalars(select(Assessment).where(Assessment.class_id == c.id, Assessment.name == name)).all()
    if not tests:
        raise HTTPException(422, "Enter some marks for this examination first.")
    for a in tests:
        a.published = body.published
    if body.published and body.notify:
        db.add(Circular(category="event", title=f"{name} results", audience="class", class_id=c.id,
                        body=f"{name} examination results for {c.label} are published. See the Results tab for "
                             f"marks in every subject.", publish_on=date.today(), event_on=date.today(),
                        created_by_id=user.id))
    audit(db, user, "exam.publish" if body.published else "exam.unpublish", f"{name} · {c.label}")
    db.commit()
    return exam_sheet(db, user, c, name)


# ---------------- study materials ----------------
class MaterialIn(BaseModel):
    class_id: int
    subject_id: int | None = None
    title: str
    description: str = ""
    url: str
    filename: str = ""


@router.get("/materials")
def list_materials(class_id: int | None = None, user: User = Depends(current_user), db: Session = Depends(get_db)):
    q = select(Material)
    if class_id:
        readable_class(db, user, class_id)
        q = q.where(Material.class_id == class_id)
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.where(Material.class_id.in_(ids or [-1]))
    labels = {c.id: c.label for c in db.scalars(select(ClassRoom))}
    out = []
    for m in db.scalars(q.order_by(Material.created_at.desc()).limit(300)):
        o = material_out(m, labels.get(m.class_id))
        if user.role != "parent":
            o["can_edit"] = m.created_by_id == user.id or can_manage_class(user, db.get(ClassRoom, m.class_id))
        out.append(o)
    return out


@router.post("/materials")
def create_material(body: MaterialIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = readable_class(db, user, body.class_id)
    if body.subject_id:
        s = db.get(Subject, body.subject_id)
        if not s or s.class_id != c.id:
            raise HTTPException(422, "That subject is not part of this class.")
    if not can_teach(db, user, c, body.subject_id):
        deny("You can share material only for subjects you teach.")
    if not body.title.strip():
        raise HTTPException(422, "Give the material a title.")
    if not body.url.startswith(("/uploads/", "https://")):
        raise HTTPException(422, "Attach the file first.")
    m = Material(class_id=c.id, subject_id=body.subject_id, title=body.title.strip()[:200],
                 description=body.description.strip(), url=body.url, filename=body.filename[:255],
                 created_by_id=user.id)
    db.add(m)
    audit(db, user, "material.create", f"{m.title} · {c.label}")
    db.commit()
    return material_out(m, c.label)


@router.delete("/materials/{mid}")
def delete_material(mid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    m = db.get(Material, mid)
    if not m:
        raise HTTPException(404, "Not found.")
    c = readable_class(db, user, m.class_id)
    if m.created_by_id != user.id and not can_manage_class(user, c):
        deny("You can remove only material you shared.")
    db.delete(m)
    db.commit()
    return {"ok": True}


# ---------------- participation ----------------
class ParticipationIn(BaseModel):
    student_ids: list[int]
    event: str
    category: str = ""
    achievement: str = "Participated"
    held_on: str | None = None
    note: str = ""


@router.get("/participation")
def list_participation(class_id: int | None = None, student_id: int | None = None,
                       user: User = Depends(current_user), db: Session = Depends(get_db)):
    q = select(Participation).join(Student, Student.id == Participation.student_id)
    if user.role == "parent":
        st = student_of(db, user)
        q = q.where(Participation.student_id == (st.id if st else -1))
    elif student_id:
        get_student(db, user, student_id)
        q = q.where(Participation.student_id == student_id)
    elif class_id:
        readable_class(db, user, class_id)
        q = q.where(Student.class_id == class_id)
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.where(Student.class_id.in_(ids or [-1]))
    rows = db.scalars(q.order_by(Participation.held_on.desc().nulls_last(), Participation.id.desc()).limit(500))
    out = []
    for p in rows:
        o = participation_out(p)
        if user.role != "parent":
            o["can_edit"] = p.created_by_id == user.id or user.role in ("superadmin", "hod")
        out.append(o)
    return out


@router.post("/participation")
def add_participation(body: ParticipationIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    if not body.event.strip():
        raise HTTPException(422, "Name the event or activity.")
    if not body.student_ids:
        raise HTTPException(422, "Choose at least one student.")
    made = []
    for sid in dict.fromkeys(body.student_ids):
        st = get_student(db, user, sid)             # staff may record for students in classes they can see
        p = Participation(student_id=st.id, event=body.event.strip()[:200], category=body.category.strip()[:40],
                          achievement=(body.achievement.strip() or "Participated")[:120],
                          held_on=parse_day(body.held_on), note=body.note.strip()[:300], created_by_id=user.id)
        db.add(p)
        made.append(p)
    audit(db, user, "participation.add", f"{body.event.strip()[:60]} · {len(made)} students")
    db.commit()
    return [participation_out(p) for p in made]


@router.delete("/participation/{pid}")
def delete_participation(pid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    p = db.get(Participation, pid)
    if not p:
        raise HTTPException(404, "Not found.")
    get_student(db, user, p.student_id)
    if p.created_by_id != user.id and user.role not in ("superadmin", "hod"):
        deny("You can remove only what you recorded.")
    db.delete(p)
    db.commit()
    return {"ok": True}
