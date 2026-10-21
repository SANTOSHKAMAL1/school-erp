"""Circulars & notices, parent–school messages, leave requests."""
from datetime import date, datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import and_, func, or_, select
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Circular, ClassRoom, LeaveRequest, Message, Student, User
from ..scope import (can_manage_class, class_ids_for, deny, get_student, parse_day, readable_class, student_of)
from ..security import audit, current_user, parent, staff
from ..serial import circular_out, leave_out, message_out

router = APIRouter(prefix="/api", tags=["comms"])


# ---------------- circulars ----------------
class CircularIn(BaseModel):
    category: str = "notice"
    title: str = ""
    body: str
    audience: str = "all"
    department_id: int | None = None
    class_id: int | None = None
    publish_on: str | None = None
    event_on: str | None = None
    on_website: bool = False
    attachment: str = ""


def visible_circulars(db: Session, user: User):
    q = select(Circular)
    if user.role == "superadmin":
        return q
    if user.role == "parent":
        st = student_of(db, user)
        c = db.get(ClassRoom, st.class_id) if st and st.class_id else None
        conds = [Circular.audience.in_(["all", "parents"])]
        if c:
            conds.append(and_(Circular.audience == "class", Circular.class_id == c.id))
            if c.department_id:
                conds.append(and_(Circular.audience == "department", Circular.department_id == c.department_id))
        return q.where(or_(*conds), Circular.publish_on <= date.today())
    ids = class_ids_for(db, user) or [-1]
    conds = [Circular.audience.in_(["all", "staff", "parents"]), Circular.created_by_id == user.id,
             and_(Circular.audience == "class", Circular.class_id.in_(ids))]
    if user.department_id:
        conds.append(and_(Circular.audience == "department", Circular.department_id == user.department_id))
    return q.where(or_(*conds))


@router.get("/circulars")
def list_circulars(category: str | None = None, website: bool | None = None, user: User = Depends(current_user),
                   db: Session = Depends(get_db)):
    q = visible_circulars(db, user)
    if category:
        q = q.where(Circular.category == category)
    if website is not None:
        q = q.where(Circular.on_website.is_(website))
    rows = db.scalars(q.order_by(Circular.publish_on.desc(), Circular.id.desc()).limit(300)).all()
    out = []
    for c in rows:
        o = circular_out(c)
        o["can_edit"] = user.role == "superadmin" or c.created_by_id == user.id
        out.append(o)
    return out


def _validate(db, user: User, body: CircularIn):
    if body.category not in ("notice", "circular", "event"):
        raise HTTPException(422, "Type must be notice, circular or event.")
    if not body.body.strip():
        raise HTTPException(422, "Write the text of the notice.")
    if body.audience not in ("all", "parents", "staff", "department", "class"):
        raise HTTPException(422, "Choose who should see it.")
    if user.role != "superadmin":
        body.on_website = False
    if body.audience == "class":
        if not body.class_id:
            raise HTTPException(422, "Choose the class.")
        c = readable_class(db, user, body.class_id)
        if user.role == "teacher" and not (can_manage_class(user, c) or c.id in (class_ids_for(db, user) or [])):
            deny()
        body.department_id = None
    elif body.audience == "department":
        if user.role == "hod":
            body.department_id = user.department_id
        elif user.role == "teacher":
            deny("Teachers can send circulars to their classes.")
        if not body.department_id:
            raise HTTPException(422, "Choose the department.")
        body.class_id = None
    else:
        if user.role == "teacher":
            deny("Teachers can send circulars to their classes.")
        if user.role == "hod" and body.audience != "staff":
            deny("HODs can send to their department, a class, or staff.")
        body.class_id = body.department_id = None


@router.post("/circulars")
def create_circular(body: CircularIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    _validate(db, user, body)
    c = Circular(category=body.category, title=body.title.strip(), body=body.body.strip(), audience=body.audience,
                 department_id=body.department_id, class_id=body.class_id,
                 publish_on=parse_day(body.publish_on) or date.today(), event_on=parse_day(body.event_on),
                 on_website=body.on_website, attachment=body.attachment.strip(), created_by_id=user.id)
    db.add(c)
    audit(db, user, "circular.create", (c.title or c.body)[:80])
    db.commit()
    return circular_out(c)


def _own(db, user, cid) -> Circular:
    c = db.get(Circular, cid)
    if not c:
        raise HTTPException(404, "Not found.")
    if user.role != "superadmin" and c.created_by_id != user.id:
        deny("You can change only what you posted.")
    return c


@router.put("/circulars/{cid}")
def update_circular(cid: int, body: CircularIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = _own(db, user, cid)
    _validate(db, user, body)
    for k in ("category", "audience", "department_id", "class_id", "on_website"):
        setattr(c, k, getattr(body, k))
    c.title, c.body, c.attachment = body.title.strip(), body.body.strip(), body.attachment.strip()
    c.publish_on = parse_day(body.publish_on) or c.publish_on
    c.event_on = parse_day(body.event_on)
    db.commit()
    return circular_out(c)


@router.delete("/circulars/{cid}")
def delete_circular(cid: int, user: User = Depends(staff), db: Session = Depends(get_db)):
    c = _own(db, user, cid)
    audit(db, user, "circular.delete", (c.title or c.body)[:80])
    db.delete(c)
    db.commit()
    return {"ok": True}


# ---------------- messages ----------------
class MessageIn(BaseModel):
    student_id: int | None = None
    body: str


@router.get("/messages/threads")
def threads(user: User = Depends(staff), db: Session = Depends(get_db)):
    ids = class_ids_for(db, user)
    q = select(Student).where(Student.active.is_(True))
    if ids is not None:
        q = q.where(Student.class_id.in_(ids or [-1]))
    students = {s.id: s for s in db.scalars(q)}
    if not students:
        return []
    last = db.execute(select(Message.student_id, func.max(Message.id)).where(Message.student_id.in_(students))
                      .group_by(Message.student_id)).all()
    out = []
    for sid, mid in last:
        m = db.get(Message, mid)
        unread = db.scalar(select(func.count()).select_from(Message).where(
            Message.student_id == sid, Message.from_parent.is_(True), Message.read.is_(False)))
        s = students[sid]
        out.append({"student_id": sid, "student": s.name, "parent_name": s.parent_name,
                    "class_label": s.classroom.label if s.classroom else None,
                    "last": message_out(m), "unread": unread})
    out.sort(key=lambda t: t["last"]["id"], reverse=True)
    return out


@router.get("/messages")
def get_messages(student_id: int | None = None, user: User = Depends(current_user), db: Session = Depends(get_db)):
    st = student_of(db, user) if user.role == "parent" else get_student(db, user, student_id or 0)
    if not st:
        raise HTTPException(404, "Student not found.")
    rows = db.scalars(select(Message).where(Message.student_id == st.id).order_by(Message.id)).all()
    from_parent = user.role != "parent"       # mark the other side's messages read
    for m in rows:
        if m.from_parent == from_parent and not m.read:
            m.read = True
    db.commit()
    c = db.get(ClassRoom, st.class_id) if st.class_id else None
    return {"student": {"id": st.id, "name": st.name, "parent_name": st.parent_name,
                        "class_label": c.label if c else None,
                        "class_teacher": c.class_teacher.name if c and c.class_teacher else None},
            "messages": [message_out(m) for m in rows]}


@router.post("/messages")
def send_message(body: MessageIn, user: User = Depends(current_user), db: Session = Depends(get_db)):
    text = body.body.strip()
    if not text:
        raise HTTPException(422, "Write a message first.")
    if user.role == "parent":
        st = student_of(db, user)
    else:
        st = get_student(db, user, body.student_id or 0)
    m = Message(student_id=st.id, sender_id=user.id, body=text[:4000], from_parent=user.role == "parent")
    db.add(m)
    db.commit()
    return message_out(m)


@router.get("/messages/unread")
def unread_count(user: User = Depends(current_user), db: Session = Depends(get_db)):
    if user.role == "parent":
        st = student_of(db, user)
        if not st:
            return {"unread": 0}
        n = db.scalar(select(func.count()).select_from(Message).where(
            Message.student_id == st.id, Message.from_parent.is_(False), Message.read.is_(False)))
        return {"unread": n}
    ids = class_ids_for(db, user)
    q = select(func.count()).select_from(Message).join(Student, Student.id == Message.student_id).where(
        Message.from_parent.is_(True), Message.read.is_(False))
    if ids is not None:
        q = q.where(Student.class_id.in_(ids or [-1]))
    return {"unread": db.scalar(q)}


# ---------------- leave requests ----------------
class LeaveIn(BaseModel):
    from_day: str
    to_day: str
    reason: str


class DecideIn(BaseModel):
    status: str
    response: str = ""


@router.get("/leaves")
def list_leaves(status: str | None = None, user: User = Depends(current_user), db: Session = Depends(get_db)):
    q = select(LeaveRequest)
    if user.role == "parent":
        st = student_of(db, user)
        q = q.where(LeaveRequest.student_id == (st.id if st else -1))
    else:
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.join(Student, Student.id == LeaveRequest.student_id).where(Student.class_id.in_(ids or [-1]))
    if status:
        q = q.where(LeaveRequest.status == status)
    rows = db.scalars(q.order_by(LeaveRequest.created_at.desc()).limit(300)).all()
    out = []
    for l in rows:
        o = leave_out(l)
        if user.role != "parent":
            c = db.get(ClassRoom, l.student.class_id) if l.student and l.student.class_id else None
            o["can_decide"] = bool(c and can_manage_class(user, c))
        out.append(o)
    return out


@router.post("/leaves")
def apply_leave(body: LeaveIn, user: User = Depends(parent), db: Session = Depends(get_db)):
    st = student_of(db, user)
    a, b = parse_day(body.from_day), parse_day(body.to_day)
    if not a or not b or b < a:
        raise HTTPException(422, "Check the dates — the last day must be on or after the first.")
    if not body.reason.strip():
        raise HTTPException(422, "Tell the class teacher the reason.")
    l = LeaveRequest(student_id=st.id, from_day=a, to_day=b, reason=body.reason.strip()[:2000])
    db.add(l)
    db.commit()
    return leave_out(l)


@router.put("/leaves/{lid}")
def decide_leave(lid: int, body: DecideIn, user: User = Depends(staff), db: Session = Depends(get_db)):
    l = db.get(LeaveRequest, lid)
    if not l:
        raise HTTPException(404, "Not found.")
    c = db.get(ClassRoom, l.student.class_id) if l.student.class_id else None
    if not c or not can_manage_class(user, c):
        deny("Only the class teacher or HOD can decide this.")
    if body.status not in ("approved", "rejected", "pending"):
        raise HTTPException(422, "Choose approve or decline.")
    l.status, l.response = body.status, body.response.strip()[:300]
    l.decided_by_id, l.decided_at = user.id, datetime.utcnow()
    db.commit()
    return leave_out(l)


@router.delete("/leaves/{lid}")
def withdraw_leave(lid: int, user: User = Depends(parent), db: Session = Depends(get_db)):
    l = db.get(LeaveRequest, lid)
    st = student_of(db, user)
    if not l or l.student_id != st.id:
        raise HTTPException(404, "Not found.")
    if l.status != "pending":
        raise HTTPException(409, "This request has already been answered.")
    db.delete(l)
    db.commit()
    return {"ok": True}
