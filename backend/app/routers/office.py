"""Fees, enquiries, website content, Mandatory Disclosure, uploads, activity, dashboards."""
import re
import secrets
from datetime import date, datetime, timedelta
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import BaseModel
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from .. import config, storage
from ..content import DEFAULTS, DOC_KEYS, MAX_TEXT, PHOTO_KEYS, TEXT_KEYS
from ..db import get_db
from ..models import (Assessment, Attendance, AuditLog, Circular, ClassRoom, Department, DisclosureDoc, Enquiry,
                      Fee, Homework, LeaveRequest, Mark, Message, SiteSetting, Student, Subject, TimetableSlot, User)
from ..scope import class_ids_for, deny, get_student, parse_day, student_of
from ..security import admin_or_hod, audit, current_user, staff, superadmin
from ..serial import circular_out, enquiry_out, fee_out, homework_out, slot_out, user_out
from .public import circular_text, get_setting, long_date
from .records import attendance_stats

router = APIRouter(prefix="/api", tags=["office"])


# ---------------- fees ----------------
class FeeIn(BaseModel):
    student_id: int | None = None
    class_id: int | None = None          # create the same fee for a whole class
    title: str
    amount: float
    due_on: str | None = None
    status: str = "due"
    paid_on: str | None = None
    receipt_no: str = ""
    mode: str = ""
    note: str = ""


@router.get("/fees")
def list_fees(student_id: int | None = None, class_id: int | None = None, status: str | None = None,
              user: User = Depends(current_user), db: Session = Depends(get_db)):
    q = select(Fee).join(Student, Student.id == Fee.student_id)
    if user.role == "parent":
        st = student_of(db, user)
        q = q.where(Fee.student_id == st.id)
    else:
        if user.role == "teacher":
            deny("Fees are handled by the office.")
        ids = class_ids_for(db, user)
        if ids is not None:
            q = q.where(Student.class_id.in_(ids or [-1]))
        if student_id:
            q = q.where(Fee.student_id == student_id)
        if class_id:
            q = q.where(Student.class_id == class_id)
    if status:
        q = q.where(Fee.status == status)
    return [fee_out(f) for f in db.scalars(q.order_by(Fee.due_on.desc().nulls_last(), Fee.id.desc()).limit(3000))]


def _receipt_no(db):
    n = db.scalar(select(func.count()).select_from(Fee).where(Fee.status == "paid")) or 0
    return f"AGR-{date.today().year}-{n + 1:05d}"


@router.post("/fees")
def create_fee(body: FeeIn, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    if body.amount <= 0 or not body.title.strip():
        raise HTTPException(422, "Enter a title and an amount.")
    if body.class_id:
        students = db.scalars(select(Student).where(Student.class_id == body.class_id, Student.active.is_(True))).all()
    elif body.student_id:
        students = [db.get(Student, body.student_id)]
    else:
        raise HTTPException(422, "Choose a student or a class.")
    made = []
    for st in students:
        if not st:
            continue
        f = Fee(student_id=st.id, title=body.title.strip(), amount=body.amount, due_on=parse_day(body.due_on),
                note=body.note.strip())
        db.add(f)
        made.append(f)
    audit(db, user, "fee.create", f"{body.title} × {len(made)}")
    db.commit()
    return {"created": len(made)}


@router.put("/fees/{fid}")
def update_fee(fid: int, body: FeeIn, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    f = db.get(Fee, fid)
    if not f:
        raise HTTPException(404, "Not found.")
    f.title, f.amount, f.due_on, f.note = body.title.strip() or f.title, body.amount, parse_day(body.due_on), body.note.strip()
    if body.status not in ("due", "paid", "waived"):
        raise HTTPException(422, "Status must be due, paid or waived.")
    if body.status == "paid" and f.status != "paid":
        f.paid_on = parse_day(body.paid_on) or date.today()
        f.receipt_no = body.receipt_no.strip() or _receipt_no(db)
        f.mode = body.mode.strip() or "Cash"
    elif body.status != "paid":
        f.paid_on, f.receipt_no = None, ""
    f.status = body.status
    audit(db, user, "fee.update", f"{f.title} → {f.status}")
    db.commit()
    return fee_out(f)


@router.delete("/fees/{fid}")
def delete_fee(fid: int, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    f = db.get(Fee, fid)
    if not f:
        raise HTTPException(404, "Not found.")
    db.delete(f)
    db.commit()
    return {"ok": True}


# ---------------- enquiries ----------------
class EnquiryUpdate(BaseModel):
    status: str
    notes: str = ""


@router.get("/enquiries")
def list_enquiries(status: str | None = None, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    q = select(Enquiry)
    if status:
        q = q.where(Enquiry.status == status)
    return [enquiry_out(e) for e in db.scalars(q.order_by(Enquiry.id.desc()).limit(1000))]


@router.put("/enquiries/{eid}")
def update_enquiry(eid: int, body: EnquiryUpdate, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    e = db.get(Enquiry, eid)
    if not e:
        raise HTTPException(404, "Not found.")
    e.status, e.notes = body.status, body.notes
    db.commit()
    return enquiry_out(e)


@router.delete("/enquiries/{eid}")
def delete_enquiry(eid: int, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    e = db.get(Enquiry, eid)
    if e:
        db.delete(e)
        db.commit()
    return {"ok": True}


# ---------------- website content ----------------
EDITABLE = {"ticker", "faqs", "terms", "holidays", "school"}


@router.get("/site/{key}")
def read_setting(key: str, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    if key not in EDITABLE and key != "disclosure_text":
        raise HTTPException(404, "Unknown section.")
    return {"key": key, "value": get_setting(db, key), "default": DEFAULTS.get(key)}


@router.put("/site/{key}")
def write_setting(key: str, body: dict, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    if key not in EDITABLE:
        raise HTTPException(404, "Unknown section.")
    value = body.get("value")
    if key == "school":
        if not isinstance(value, dict):
            raise HTTPException(422, "Expected the school details.")
        value = {k: str(v)[:300] for k, v in value.items()}
    else:
        if not isinstance(value, list):
            raise HTTPException(422, "Expected a list.")
        value = [{k: str(v)[:1500] for k, v in item.items()} for item in value[:100] if isinstance(item, dict)]
    row = db.get(SiteSetting, key)
    if row:
        row.value = value
    else:
        db.add(SiteSetting(key=key, value=value))
    audit(db, user, "site.update", key)
    db.commit()
    return {"key": key, "value": value}


@router.delete("/site/{key}")
def reset_setting(key: str, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    row = db.get(SiteSetting, key)
    if row:
        db.delete(row)
        audit(db, user, "site.reset", key)
        db.commit()
    return {"key": key, "value": DEFAULTS.get(key)}


# ---------------- live-site edits ----------------
# Text and photos changed in place on the public pages: {"text": {original: new}, "img": {original src: new src}}.
class SiteEditIn(BaseModel):
    kind: str
    original: str
    value: str | None = None      # None (or the original) puts the original back


@router.put("/site-edits")
def save_site_edit(body: SiteEditIn, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    if body.kind not in ("text", "img"):
        raise HTTPException(422, "Unknown kind of edit.")
    original = body.original.strip()
    if not original or len(original) > 3000:
        raise HTTPException(422, "That piece of the page cannot be edited.")
    value = body.value.strip() if body.value is not None else None
    if value is not None and len(value) > 6000:
        raise HTTPException(422, "Keep it under 6,000 characters.")
    if body.kind == "img" and value and not value.startswith(("/uploads/", "https://", "/images/", "/assets/")):
        raise HTTPException(422, "Upload the photo first.")
    row = db.get(SiteSetting, "page_edits")
    data = dict(row.value) if row else {}
    bucket = dict(data.get(body.kind) or {})
    if not value or value == original:
        bucket.pop(original, None)
    else:
        if len(bucket) >= 3000 and original not in bucket:
            raise HTTPException(422, "Too many edits — restore some first.")
        bucket[original] = value
    data[body.kind] = bucket
    if row:
        row.value = data
    else:
        db.add(SiteSetting(key="page_edits", value=data))
    audit(db, user, "site.edit", f"{body.kind}: {original[:60]}")
    db.commit()
    return data


@router.delete("/site-edits")
def reset_site_edits(user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    row = db.get(SiteSetting, "page_edits")
    if row:
        db.delete(row)
        audit(db, user, "site.edit.reset")
        db.commit()
    return {}


# ---------------- Mandatory Disclosure ----------------
@router.put("/disclosure/text")
def save_disclosure_text(body: dict, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    values = body.get("values") or {}
    clean = {k: str(values[k]).strip()[:MAX_TEXT] for k in TEXT_KEYS if isinstance(values.get(k), str)}
    row = db.get(SiteSetting, "disclosure_text")
    if row:
        row.value = clean
    else:
        db.add(SiteSetting(key="disclosure_text", value=clean))
    audit(db, user, "disclosure.text")
    db.commit()
    return {"ok": True, "text": clean}


def _safe_name(name: str) -> str:
    stem = re.sub(r"[^A-Za-z0-9._-]+", "-", Path(name).name).strip("-.") or "file"
    return stem[-120:]


@router.post("/disclosure/docs/{key}")
async def upload_disclosure(key: str, file: UploadFile = File(...), user: User = Depends(admin_or_hod),
                            db: Session = Depends(get_db)):
    if key not in DOC_KEYS:
        raise HTTPException(404, "Unknown row.")
    photo = key in PHOTO_KEYS
    data = await file.read()
    name = file.filename or "upload"
    if photo:
        if not re.search(r"\.(jpe?g|png|webp)$", name, re.I) or len(data) > config.MAX_IMAGE_BYTES:
            raise HTTPException(422, "Upload a JPG, PNG or WebP photo up to 15 MB.")
    else:
        if not name.lower().endswith(".pdf") or not data.startswith(b"%PDF") or len(data) > config.MAX_PDF_BYTES:
            raise HTTPException(422, "Upload a PDF up to 40 MB.")
    rel = f"disclosure/{key}/{secrets.token_hex(4)}-{_safe_name(name)}"
    stored = await storage.save(rel, data, file.content_type)
    for old in db.scalars(select(DisclosureDoc).where(DisclosureDoc.key == key)):
        storage.remove(old.stored)
        db.delete(old)
    db.add(DisclosureDoc(key=key, filename=name, stored=stored, size=len(data)))
    audit(db, user, "disclosure.upload", f"{key}: {name}")
    db.commit()
    return {"ok": True}


@router.delete("/disclosure/docs/{key}")
def delete_disclosure(key: str, user: User = Depends(admin_or_hod), db: Session = Depends(get_db)):
    for old in db.scalars(select(DisclosureDoc).where(DisclosureDoc.key == key)):
        storage.remove(old.stored)
        db.delete(old)
    audit(db, user, "disclosure.delete", key)
    db.commit()
    return {"ok": True}


# ---------------- generic attachment upload (circulars, homework) ----------------
ALLOWED = re.compile(r"\.(pdf|jpe?g|png|webp|docx?|xlsx?|pptx?)$", re.I)


@router.post("/uploads")
async def upload_file(file: UploadFile = File(...), user: User = Depends(staff)):
    data = await file.read()
    name = file.filename or "file"
    if not ALLOWED.search(name):
        raise HTTPException(422, "Attach a PDF, image, Word, Excel or PowerPoint file.")
    if len(data) > config.MAX_PDF_BYTES:
        raise HTTPException(422, "Files can be up to 40 MB.")
    rel = f"files/{date.today():%Y/%m}/{secrets.token_hex(5)}-{_safe_name(name)}"
    stored = await storage.save(rel, data, file.content_type)
    return {"url": storage.url_for(stored), "name": name, "size": len(data)}


# ---------------- activity ----------------
@router.get("/activity")
def activity(limit: int = 100, user: User = Depends(superadmin), db: Session = Depends(get_db)):
    rows = db.scalars(select(AuditLog).order_by(AuditLog.id.desc()).limit(min(limit, 500))).all()
    return [{"id": a.id, "at": a.at.isoformat() + "Z", "action": a.action, "detail": a.detail,
             "user": a.user.name if a.user else None, "role": a.user.role if a.user else None} for a in rows]


# ---------------- dashboards ----------------
def count(db, model, *where):
    return db.scalar(select(func.count()).select_from(model).where(*where)) or 0


@router.get("/dashboard")
def dashboard(user: User = Depends(staff), db: Session = Depends(get_db)):
    today = date.today()
    ids = class_ids_for(db, user)
    in_scope = (lambda col: col.in_(ids or [-1])) if ids is not None else (lambda col: True)
    students_q = [Student.active.is_(True)] + ([in_scope(Student.class_id)] if ids is not None else [])
    total_students = count(db, Student, *students_q)
    marked = db.execute(select(Attendance.status, func.count()).join(Student, Student.id == Attendance.student_id)
                        .where(Attendance.day == today, *students_q).group_by(Attendance.status)).all()
    m = dict(marked)
    present_today = m.get("P", 0) + m.get("L", 0) + m.get("H", 0)
    classes = db.scalars(select(ClassRoom).where(in_scope(ClassRoom.id)) if ids is not None else select(ClassRoom)).all()
    check = [c for c in classes if c.class_teacher_id == user.id] if user.role == "teacher" else classes
    unmarked = [c.label for c in check
                if count(db, Student, Student.class_id == c.id, Student.active.is_(True))
                and not count(db, Attendance, Attendance.class_id == c.id, Attendance.day == today)]
    pending_leaves = db.scalar(select(func.count()).select_from(LeaveRequest).join(Student, Student.id == LeaveRequest.student_id)
                               .where(LeaveRequest.status == "pending", *students_q)) or 0
    out = {
        "today": today.isoformat(),
        "students": total_students,
        "classes": len(classes),
        "present_today": present_today,
        "absent_today": m.get("A", 0),
        "marked_today": sum(m.values()),
        "unmarked_classes": unmarked,
        "pending_leaves": pending_leaves,
    }
    if user.role == "superadmin":
        out.update(
            hods=count(db, User, User.role == "hod", User.active.is_(True)),
            teachers=count(db, User, User.role == "teacher", User.active.is_(True)),
            departments=count(db, Department),
            new_enquiries=count(db, Enquiry, Enquiry.status == "new"),
            fees_due=db.scalar(select(func.coalesce(func.sum(Fee.amount), 0)).where(Fee.status == "due")) or 0,
            fees_overdue=count(db, Fee, Fee.status == "due", Fee.due_on < today),
            fees_collected=db.scalar(select(func.coalesce(func.sum(Fee.amount), 0)).where(Fee.status == "paid")) or 0,
            recent_enquiries=[enquiry_out(e) for e in db.scalars(select(Enquiry).order_by(Enquiry.id.desc()).limit(5))],
        )
    if user.role == "hod":
        out.update(teachers=count(db, User, User.role == "teacher", User.department_id == user.department_id,
                                  User.active.is_(True)),
                   department=user.department.name if user.department else None)
    if user.role == "teacher":
        own = db.scalars(select(ClassRoom).where(ClassRoom.class_teacher_id == user.id)).all()
        out["class_teacher_of"] = [{"id": c.id, "label": c.label} for c in own]
        out["subjects"] = [{"id": s.id, "name": s.name, "class_id": s.class_id, "class_label": s.classroom.label}
                           for s in db.scalars(select(Subject).where(Subject.teacher_id == user.id))]
        wd = today.weekday()
        out["today_periods"] = [{**slot_out(t), "class_label": db.get(ClassRoom, t.class_id).label}
                                for t in db.scalars(select(TimetableSlot).where(TimetableSlot.teacher_id == user.id,
                                                                                TimetableSlot.weekday == wd)
                                                    .order_by(TimetableSlot.period))]
    out["unread_messages"] = db.scalar(
        select(func.count()).select_from(Message).join(Student, Student.id == Message.student_id)
        .where(Message.from_parent.is_(True), Message.read.is_(False), *students_q)) or 0
    return out


@router.get("/family")
def family_overview(user: User = Depends(current_user), db: Session = Depends(get_db)):
    """Everything the parent dashboard shows, in one call."""
    if user.role != "parent":
        deny()
    st = student_of(db, user)
    if not st:
        raise HTTPException(404, "No student is linked to this login. Please contact the office.")
    today = date.today()
    c = st.classroom
    att = attendance_stats(db, st.id)
    fees_due = db.scalars(select(Fee).where(Fee.student_id == st.id, Fee.status == "due").order_by(Fee.due_on)).all()
    due_total = sum(f.amount for f in fees_due)
    next_fee = fees_due[0] if fees_due else None
    wd = today.weekday() if today.weekday() < 6 else 0
    periods = db.scalars(select(TimetableSlot).where(TimetableSlot.class_id == st.class_id, TimetableSlot.weekday == wd)
                         .order_by(TimetableSlot.period)).all() if st.class_id else []
    from .comms import visible_circulars
    circs = db.scalars(visible_circulars(db, user).order_by(Circular.publish_on.desc(), Circular.id.desc()).limit(5)).all()
    fresh = sum(1 for x in circs if (today - x.publish_on).days <= 14)
    upcoming = db.scalar(select(Circular).where(Circular.category == "event", Circular.event_on >= today,
                                                Circular.audience.in_(["all", "parents"]))
                         .order_by(Circular.event_on))
    last_result = db.scalar(select(Assessment).where(Assessment.class_id == st.class_id, Assessment.published.is_(True))
                            .order_by(Assessment.held_on.desc().nulls_last(), Assessment.id.desc())) if st.class_id else None
    homework = db.scalars(select(Homework).where(Homework.class_id == st.class_id)
                          .order_by(Homework.created_at.desc()).limit(5)).all() if st.class_id else []
    homework_today = db.scalars(select(Homework).where(Homework.class_id == st.class_id,
                                                       Homework.created_at >= datetime.combine(today, datetime.min.time()))
                                .order_by(Homework.created_at.desc())).all() if st.class_id else []
    meetings = db.scalars(visible_circulars(db, user).where(Circular.category == "meeting",
                                                            or_(Circular.event_on >= today, Circular.event_on.is_(None)))
                          .order_by(Circular.event_on.nulls_last()).limit(3)).all()
    unread = count(db, Message, Message.student_id == st.id, Message.from_parent.is_(False), Message.read.is_(False))

    def money(v):
        s = f"{v:,.0f}"
        # Indian grouping
        n = f"{int(round(v))}"
        if len(n) > 3:
            head, tail = n[:-3], n[-3:]
            head = re.sub(r"(\d)(?=(\d{2})+$)", r"\1,", head)
            s = f"{head},{tail}"
        return f"₹ {s}"

    return {
        "student": {"id": st.id, "name": st.name, "admission_no": st.admission_no, "roll_no": st.roll_no,
                    "class_id": st.class_id, "class_label": c.label if c else "—",
                    "class_teacher": c.class_teacher.name if c and c.class_teacher else None,
                    "class_teacher_phone": c.class_teacher.phone if c and c.class_teacher else "",
                    "parent_name": st.parent_name or user.name},
        "school": get_setting(db, "school"),
        "today": today.isoformat(),
        "today_label": f"{today.strftime('%A')}, {long_date(today)}",
        "weekday": wd,
        "stats": [
            {"label": "Attendance", "value": f"{att['percent']:g}%" if att["percent"] is not None else "—",
             "note": (f"This year to date — {att['absent']} day{'s' if att['absent'] != 1 else ''} absent"
                      if att["days"] else "Not marked yet")},
            {"label": "Fees", "value": money(due_total) if fees_due else "Paid",
             "note": (f"{next_fee.title}, due {long_date(next_fee.due_on)}" if next_fee and next_fee.due_on
                      else (next_fee.title if next_fee else "Nothing due right now"))},
            {"label": "Next event", "value": (f"{upcoming.event_on.day} {upcoming.event_on.strftime('%b')}" if upcoming else "—"),
             "note": (circular_text(upcoming)[:90] if upcoming else "No events scheduled")},
            {"label": "Latest result", "value": "Published" if last_result else "—",
             "note": (f"{last_result.name} — see the report card" if last_result else "Results appear here once published")},
        ],
        "attendance": att,
        "fees": {"due_total": due_total, "due_label": money(due_total) if fees_due else "₹ 0",
                 "next": fee_out(next_fee) if next_fee else None, "count": len(fees_due)},
        "periods": [{"time": f"{p.starts} – {p.ends}" if p.starts else f"Period {p.period}",
                     "subject": p.subject, "teacher": p.teacher.name if p.teacher else ""} for p in periods],
        "circulars": [{"id": x.id, "date": long_date(x.publish_on), "text": circular_text(x), "href": x.attachment}
                      for x in circs],
        "circulars_new": fresh,
        "homework": [homework_out(h, c.label if c else None) for h in homework],
        "homework_today": [homework_out(h, c.label if c else None) for h in homework_today],
        "meetings": [{**circular_out(x), "text": circular_text(x),
                      "when": long_date(x.event_on) if x.event_on else None} for x in meetings],
        "unread_messages": unread,
    }


# ---------------- demo school (for trying the portal) ----------------
@router.get("/demo")
def demo_status(user: User = Depends(superadmin), db: Session = Depends(get_db)):
    from ..seed import DEMO_ACCOUNTS, DEMO_PASSWORD, demo_loaded
    return {"loaded": demo_loaded(db), "password": DEMO_PASSWORD, "accounts": DEMO_ACCOUNTS}


@router.post("/demo")
def load_demo(user: User = Depends(superadmin), db: Session = Depends(get_db)):
    from ..seed import DEMO_PASSWORD, demo
    try:
        accounts = demo(db, verbose=False)
    except ValueError as e:
        raise HTTPException(409, str(e))
    audit(db, user, "demo.load")
    db.commit()
    return {"loaded": True, "password": DEMO_PASSWORD, "accounts": accounts}


@router.delete("/demo")
def unload_demo(user: User = Depends(superadmin), db: Session = Depends(get_db)):
    from ..seed import DEMO_ACCOUNTS, DEMO_PASSWORD, remove_demo
    remove_demo(db)
    audit(db, user, "demo.remove")
    db.commit()
    return {"loaded": False, "password": DEMO_PASSWORD, "accounts": DEMO_ACCOUNTS}
