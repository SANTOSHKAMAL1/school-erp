"""Turn rows into JSON-friendly dicts."""
from .models import (Assessment, Circular, ClassRoom, Department, Enquiry, Fee, Homework, LeaveRequest,
                     Message, Student, Subject, TimetableSlot, User)


def d(v):
    return v.isoformat() if v else None


def user_out(u: User | None, full=False):
    if not u:
        return None
    out = {"id": u.id, "name": u.name, "role": u.role, "login": u.login, "designation": u.designation}
    if full:
        out.update(phone=u.phone, email=u.email, qualification=u.qualification, active=u.active,
                   department_id=u.department_id,
                   department=u.department.name if u.department else None,
                   must_change_password=u.must_change_password,
                   created_at=d(u.created_at), last_login=d(u.last_login))
    return out


def dept_out(x: Department, hod: User | None = None, counts=None):
    return {"id": x.id, "name": x.name, "description": x.description,
            "hod": user_out(hod), **(counts or {})}


def class_out(c: ClassRoom, count: int | None = None):
    return {"id": c.id, "name": c.name, "section": c.section, "label": c.label,
            "academic_year": c.academic_year, "room": c.room,
            "department_id": c.department_id, "department": c.department.name if c.department else None,
            "class_teacher_id": c.class_teacher_id,
            "class_teacher": c.class_teacher.name if c.class_teacher else None,
            "students": count}


def subject_out(s: Subject):
    return {"id": s.id, "class_id": s.class_id, "name": s.name, "teacher_id": s.teacher_id,
            "teacher": s.teacher.name if s.teacher else None,
            "class_label": s.classroom.label if s.classroom else None}


def student_out(s: Student):
    return {"id": s.id, "admission_no": s.admission_no, "name": s.name, "class_id": s.class_id,
            "class_label": s.classroom.label if s.classroom else None, "roll_no": s.roll_no,
            "dob": d(s.dob), "gender": s.gender, "blood_group": s.blood_group,
            "parent_name": s.parent_name, "mother_name": s.mother_name, "phone": s.phone, "email": s.email,
            "address": s.address, "admitted_on": d(s.admitted_on), "active": s.active,
            "login": s.user.login if s.user else None,
            "must_change_password": s.user.must_change_password if s.user else None,
            "last_login": d(s.user.last_login) if s.user else None}


def assessment_out(a: Assessment, stats=None):
    return {"id": a.id, "class_id": a.class_id, "class_label": a.classroom.label if a.classroom else None,
            "subject_id": a.subject_id, "subject": a.subject.name if a.subject else "All subjects",
            "name": a.name, "max_marks": a.max_marks, "held_on": d(a.held_on), "published": a.published,
            **(stats or {})}


def homework_out(h: Homework, class_label=None):
    return {"id": h.id, "class_id": h.class_id, "class_label": class_label, "subject_id": h.subject_id,
            "subject": h.subject.name if h.subject else "General", "title": h.title, "details": h.details,
            "due_on": d(h.due_on), "attachment": h.attachment, "created_at": d(h.created_at),
            "teacher": h.created_by.name if h.created_by else None}


def slot_out(t: TimetableSlot):
    return {"id": t.id, "class_id": t.class_id, "weekday": t.weekday, "period": t.period, "starts": t.starts,
            "ends": t.ends, "subject": t.subject, "teacher_id": t.teacher_id,
            "teacher": t.teacher.name if t.teacher else ""}


def circular_out(c: Circular):
    return {"id": c.id, "category": c.category, "title": c.title, "body": c.body, "audience": c.audience,
            "department_id": c.department_id, "department": c.department.name if c.department else None,
            "class_id": c.class_id, "class_label": c.classroom.label if c.classroom else None,
            "publish_on": d(c.publish_on), "event_on": d(c.event_on), "on_website": c.on_website,
            "attachment": c.attachment, "created_by": c.created_by.name if c.created_by else None,
            "created_by_id": c.created_by_id}


def fee_out(f: Fee):
    return {"id": f.id, "student_id": f.student_id, "student": f.student.name if f.student else None,
            "admission_no": f.student.admission_no if f.student else None,
            "class_label": f.student.classroom.label if f.student and f.student.classroom else None,
            "title": f.title, "amount": f.amount, "due_on": d(f.due_on), "status": f.status,
            "paid_on": d(f.paid_on), "receipt_no": f.receipt_no, "mode": f.mode, "note": f.note}


def message_out(m: Message):
    return {"id": m.id, "student_id": m.student_id, "body": m.body, "from_parent": m.from_parent,
            "sender": m.sender.name if m.sender else None, "read": m.read, "created_at": d(m.created_at)}


def leave_out(l: LeaveRequest):
    return {"id": l.id, "student_id": l.student_id, "student": l.student.name if l.student else None,
            "class_label": l.student.classroom.label if l.student and l.student.classroom else None,
            "from_day": d(l.from_day), "to_day": d(l.to_day), "reason": l.reason, "status": l.status,
            "response": l.response, "decided_by": l.decided_by.name if l.decided_by else None,
            "decided_at": d(l.decided_at), "created_at": d(l.created_at)}


def enquiry_out(e: Enquiry):
    return {"id": e.id, "kind": e.kind, "name": e.name, "phone": e.phone, "email": e.email,
            "child_name": e.child_name, "grade": e.grade, "message": e.message, "data": e.data,
            "status": e.status, "notes": e.notes, "reference": e.reference, "created_at": d(e.created_at)}
