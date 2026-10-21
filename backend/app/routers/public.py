"""Open endpoints used by the public website."""
import re
import secrets
from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import storage
from ..content import DEFAULTS, DOC_KEYS, TEXT_KEYS, MAX_TEXT
from ..db import get_db
from ..models import Circular, DisclosureDoc, Enquiry, SiteSetting
from ..security import note_failure, throttle

router = APIRouter(prefix="/api", tags=["public"])

BOARD_LABELS = [("notice", "Notices"), ("circular", "Circulars"), ("event", "Events & results")]


def get_setting(db: Session, key: str):
    row = db.get(SiteSetting, key)
    return row.value if row else DEFAULTS.get(key)


def short_date(d: date) -> str:
    return f"{d.day} {d.strftime('%b')} {d.year}"


def long_date(d: date) -> str:
    return f"{d.day} {d.strftime('%B')} {d.year}"


def circular_text(c: Circular) -> str:
    return f"{c.title}: {c.body}" if c.title else c.body


def website_boards(db: Session):
    today = date.today()
    boards = []
    for cat, label in BOARD_LABELS:
        rows = list(db.scalars(
            select(Circular).where(Circular.on_website.is_(True), Circular.category == cat,
                                   Circular.publish_on <= today)
            .order_by((Circular.event_on if cat == "event" else Circular.publish_on).desc(), Circular.id.desc())
            .limit(8)))
        fresh = sum(1 for r in rows if (today - r.publish_on).days <= 21)
        items = []
        for r in rows:
            when = (f"Published {short_date(r.publish_on)}" if cat != "event"
                    else long_date(r.event_on or r.publish_on))
            items.append({"date": when, "text": circular_text(r), "href": r.attachment or ""})
        boards.append({"label": label, "count": f"{fresh} new" if fresh else "Latest", "items": items})
    return boards


@router.get("/public/site")
def site(db: Session = Depends(get_db)):
    return {
        "ticker": get_setting(db, "ticker"),
        "faqs": get_setting(db, "faqs"),
        "terms": get_setting(db, "terms"),
        "holidays": get_setting(db, "holidays"),
        "school": get_setting(db, "school"),
        "boards": website_boards(db),
        "edits": get_setting(db, "page_edits") or {},
    }


class EnquiryIn(BaseModel):
    kind: str = "admission"
    fields: dict[str, str] = {}
    website: str = ""      # honeypot — real people leave it empty


def pick(fields: dict, *patterns) -> str:
    for label, value in fields.items():
        for p in patterns:
            if re.search(p, label, re.I):
                return (value or "").strip()
    return ""


@router.post("/public/enquiries")
def create_enquiry(body: EnquiryIn, request: Request, db: Session = Depends(get_db)):
    ip = request.client.host if request.client else "?"
    throttle(f"enq|{ip}")
    note_failure(f"enq|{ip}")             # max 8 enquiries / 15 min per address
    if body.website:
        return {"ok": True, "reference": "AG-0000"}
    f = {str(k)[:80]: str(v)[:2000] for k, v in list(body.fields.items())[:20]}
    name = pick(f, r"parent", r"your name", r"full name", r"^name")
    phone = pick(f, r"phone", r"mobile")
    if not name and not phone:
        raise HTTPException(422, "Please add a name and a phone number.")
    ref = "AG-" + str(secrets.randbelow(9000) + 1000)
    kind = body.kind if body.kind in ("visit", "admission", "contact") else "admission"
    e = Enquiry(kind=kind, name=name, phone=phone, email=pick(f, r"e-?mail"),
                child_name=pick(f, r"child"), grade=pick(f, r"grade", r"class"),
                message=pick(f, r"anything", r"message", r"note", r"question", r"what"),
                data=f, reference=ref)
    db.add(e)
    db.commit()
    return {"ok": True, "reference": ref}


# ---- Mandatory Disclosure (same shape the page has always read) ----
@router.get("/disclosure-docs")
def disclosure_docs(db: Session = Depends(get_db)):
    docs = {}
    for d in db.scalars(select(DisclosureDoc).order_by(DisclosureDoc.uploaded_at)):
        if d.key in DOC_KEYS:
            url = storage.url_for(d.stored)
            docs[d.key] = {"url": url, "downloadUrl": url + "?download=1", "name": d.filename,
                           "size": d.size, "uploadedAt": d.uploaded_at.isoformat() + "Z"}
    saved = get_setting(db, "disclosure_text") or {}
    text = {k: str(saved[k])[:MAX_TEXT] for k in TEXT_KEYS if isinstance(saved.get(k), str)}
    return {"docs": docs, "text": text}
