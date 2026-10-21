"""First-run setup and optional demonstration data.

    python -m app.seed               # create tables + super admin + website content (safe to re-run)
    python -m app.seed --demo        # also add a demo school (departments, staff, classes, students…)
    python -m app.seed --reset-superadmin   # set the super admin password back to AG_SUPERADMIN_PASSWORD
"""
import random
import sys
from datetime import date, timedelta

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from . import config
from .content import SEED_BOARDS
from .models import (Assessment, Attendance, Circular, ClassRoom, Department, Enquiry, Fee, Homework, LeaveRequest,
                     Mark, Message, Student, Subject, TimetableSlot, User)
from .security import hash_password


def ensure_base_data(db: Session):
    if not db.scalar(select(User).where(User.role == "superadmin")):
        db.add(User(role="superadmin", name=config.SUPERADMIN_NAME, login=config.SUPERADMIN_LOGIN.lower(),
                    password_hash=hash_password(config.SUPERADMIN_PASSWORD), must_change_password=True,
                    designation="Administrator"))
    if not db.scalar(select(func.count()).select_from(Circular)):
        for cat, pub, ev, text in SEED_BOARDS:
            db.add(Circular(category=cat, body=text, audience="all", on_website=True,
                            publish_on=date.fromisoformat(pub), event_on=date.fromisoformat(ev) if ev else None))
    db.commit()


# ------------------------------------------------------------------ demo school
DEMO_PASSWORD = "Demo@1234"

DEPTS = [
    ("Pre-Primary", "Nursery, LKG and UKG", ["Nursery", "LKG", "UKG"]),
    ("Primary", "Grades 1 to 5", ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]),
    ("Middle & High School", "Grades 6 to 10", ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10"]),
]
HODS = [("Smt. Padmavathi Rao", "hod.preprimary"), ("Smt. Lakshmi Rao", "hod.primary"),
        ("Sri Mahesh Kumar", "hod.middle")]
TEACHERS = [
    ("Smt. Shobha B.", 0), ("Smt. Kavya Hegde", 0),
    ("Smt. Anitha Murthy", 1), ("Acharya Vasudeva", 1), ("Smt. Deepa Kulkarni", 1), ("Sri Raghavendra", 1),
    ("Acharya Srinivasa", 2), ("Sri Prakash Joshi", 2), ("Smt. Meera Iyer", 2), ("Sri Arun Bhat", 2),
]
FIRST = ["Ananya", "Aditi", "Vedant", "Krishna", "Meghana", "Pranav", "Sahana", "Rohan", "Tejas", "Shreya",
         "Varun", "Nandini", "Akshay", "Bhavana", "Chirag", "Divya", "Gautam", "Ishani", "Karthik", "Lavanya"]
LAST = ["Rao", "Bhat", "Kulkarni", "Joshi", "Hegde", "Acharya", "Murthy", "Iyengar", "Upadhya", "Deshpande"]
FATHERS = ["Sri Raghavendra", "Sri Srinivas", "Sri Venkatesh", "Sri Prasanna", "Sri Gururaj", "Sri Anand",
           "Sri Narayan", "Sri Vijay", "Sri Mohan", "Sri Sudhir"]
SUBJECTS = ["Sanskrit", "English", "Kannada", "Mathematics", "Science", "Social Studies", "Music and games"]
PERIODS = [("8:45", "9:30"), ("9:30", "10:15"), ("10:30", "11:15"), ("11:15", "12:00"), ("1:00", "1:45"), ("2:00", "3:00")]


def school_days(n, end=None):
    d, out = (end or date.today()), []
    while len(out) < n:
        if d.weekday() < 6:
            out.append(d)
        d -= timedelta(days=1)
    return sorted(out)


def demo(db: Session):
    rnd = random.Random(7)
    if db.scalar(select(func.count()).select_from(Department)):
        print("Demo data already present — skipped.")
        return
    pw = hash_password(DEMO_PASSWORD)
    admin = db.scalar(select(User).where(User.role == "superadmin"))
    depts, hods, teachers = [], [], []
    for (name, desc, _), (hname, hlogin) in zip(DEPTS, HODS):
        d = Department(name=name, description=desc)
        db.add(d)
        db.flush()
        depts.append(d)
        h = User(role="hod", name=hname, login=hlogin, password_hash=pw, must_change_password=False,
                 department_id=d.id, designation="Head of Department", phone=f"98450{rnd.randint(10000, 99999)}",
                 email=f"{hlogin}@arundhatigurukulam.in", created_by_id=admin.id)
        db.add(h)
        hods.append(h)
    db.flush()
    for i, (tname, di) in enumerate(TEACHERS):
        login = "t." + tname.split()[1].lower()
        t = User(role="teacher", name=tname, login=login, password_hash=pw, must_change_password=False,
                 department_id=depts[di].id, designation="Teacher", phone=f"99000{rnd.randint(10000, 99999)}",
                 created_by_id=hods[di].id)
        db.add(t)
        teachers.append(t)
    db.flush()
    by_dept = {d.id: [t for t in teachers if t.department_id == d.id] for d in depts}

    classes = []
    for d, (_, _, grades) in zip(depts, DEPTS):
        pool = by_dept[d.id]
        for gi, g in enumerate(grades):
            c = ClassRoom(name=g, section="A", department_id=d.id, room=f"Room {len(classes) + 1}",
                          class_teacher_id=pool[gi % len(pool)].id if gi < len(pool) else None)
            db.add(c)
            classes.append(c)
    db.flush()
    # Grade 5's class teacher is Smt. Lakshmi Rao in the original design — keep that story
    g5 = next(c for c in classes if c.name == "Grade 5")
    g5.class_teacher_id = next(t for t in teachers if t.name == "Smt. Anitha Murthy").id

    for ci, c in enumerate(classes):
        pool = by_dept[c.department_id]
        subs = SUBJECTS if not c.name in ("Nursery", "LKG", "UKG") else ["Sanskrit", "English", "Numbers", "Music and games"]
        made = []
        for si, sname in enumerate(subs):
            s = Subject(class_id=c.id, name=sname, teacher_id=pool[(si + ci) % len(pool)].id)
            db.add(s)
            made.append(s)
        db.flush()
        for wd in range(6):
            for p, (a, b) in enumerate(PERIODS[: (4 if wd == 5 else 6)]):
                s = made[(p + wd + ci) % len(made)]
                db.add(TimetableSlot(class_id=c.id, weekday=wd, period=p + 1, starts=a, ends=b,
                                     subject="Prayer and recitation" if p == 0 else s.name,
                                     teacher_id=c.class_teacher_id if p == 0 else s.teacher_id))

    # students
    n = 0
    students = []
    for c in classes:
        for r in range(1, 9):
            n += 1
            first = FIRST[(n * 3) % len(FIRST)]
            last = LAST[(n * 7) % len(LAST)]
            adm = f"AG2026{n:03d}"
            father = FATHERS[n % len(FATHERS)] + " " + last
            phone = f"98765{43210 + n:05d}"[-10:]
            if f"{first} {last}" == "Ananya Rao":
                last = "Bhat"
            if c.name == "Grade 5" and r == 1:
                first, last, father, phone = "Ananya", "Rao", "Smt. Anuradha Rao", "9876543210"
            u = User(role="parent", name=father, login=adm.lower(), password_hash=pw, must_change_password=False,
                     phone=phone, created_by_id=c.class_teacher_id)
            db.add(u)
            db.flush()
            st = Student(user_id=u.id, admission_no=adm, name=f"{first} {last}", class_id=c.id, roll_no=str(r),
                         gender="Female" if first in ("Ananya", "Aditi", "Meghana", "Sahana", "Shreya", "Nandini",
                                                       "Bhavana", "Divya", "Ishani", "Lavanya") else "Male",
                         parent_name=father, phone=phone, dob=date(2026 - 4 - classes.index(c), 1 + r % 12, 1 + n % 27),
                         address="Basavanagudi, Bengaluru", admitted_on=date(2026, 6, 2), created_by_id=c.class_teacher_id)
            db.add(st)
            students.append(st)
    db.flush()
    days = school_days(30)
    for st in students:
        for d in days:
            roll = rnd.random()
            db.add(Attendance(student_id=st.id, class_id=st.class_id, day=d,
                              status="A" if roll < 0.04 else ("L" if roll < 0.07 else "P"),
                              marked_by_id=db.get(ClassRoom, st.class_id).class_teacher_id))

    for c in classes:
        subs = db.scalars(select(Subject).where(Subject.class_id == c.id)).all()
        for s in subs[:4]:
            a = Assessment(class_id=c.id, subject_id=s.id, name="Term I", max_marks=50, held_on=date(2026, 9, 5),
                           published=True, created_by_id=s.teacher_id)
            db.add(a)
            db.flush()
            for st in [x for x in students if x.class_id == c.id]:
                db.add(Mark(assessment_id=a.id, student_id=st.id, marks=rnd.randint(28, 50)))
        db.add(Homework(class_id=c.id, subject_id=subs[1].id, title="Read chapter 4 and answer the questions",
                        details="Write answers in the class notebook. Bring it on Monday.",
                        due_on=date.today() + timedelta(days=2), created_by_id=subs[1].teacher_id))
        db.add(Homework(class_id=c.id, subject_id=subs[0].id, title="Learn the first five shlokas by heart",
                        details="Recite at home with a parent each evening.", due_on=date.today() + timedelta(days=5),
                        created_by_id=subs[0].teacher_id))

    for st in students:
        db.add(Fee(student_id=st.id, title="Term I instalment", amount=18400, due_on=date(2026, 6, 30), status="paid",
                   paid_on=date(2026, 6, 20), receipt_no=f"AGR-2026-{st.id:05d}", mode="Bank transfer"))
        db.add(Fee(student_id=st.id, title="Term II instalment", amount=18400, due_on=date(2026, 10, 30)))

    ananya = next(s for s in students if s.phone == "9876543210")
    db.add(Message(student_id=ananya.id, sender_id=ananya.user_id, from_parent=True,
                   body="Namaste. Ananya has a cold today and will rest at home. She will be back tomorrow."))
    db.add(Message(student_id=ananya.id, sender_id=g5.class_teacher_id, from_parent=False, read=False,
                   body="Thank you for letting us know. Please make sure she revises the Sanskrit lesson."))
    db.add(LeaveRequest(student_id=ananya.id, from_day=date.today() + timedelta(days=3),
                        to_day=date.today() + timedelta(days=4), reason="Family function in Mysuru."))
    db.add(Circular(category="circular", title="Circular 15/2026", body="Half-yearly examination timetable for Grade 5.",
                    audience="class", class_id=g5.id, publish_on=date.today() - timedelta(days=1),
                    created_by_id=g5.class_teacher_id))
    db.add(Enquiry(kind="visit", name="Smt. Rekha Prakash", phone="9845012345", grade="Grade 3",
                   message="Would like to visit on a weekday morning.", reference="AG-4821",
                   data={"Parent's name": "Smt. Rekha Prakash", "Phone": "9845012345", "Grade applying for": "Grade 3"}))
    db.commit()
    print(f"Demo school created. Every demo account uses the password: {DEMO_PASSWORD}")
    print("  HODs:      hod.preprimary, hod.primary, hod.middle")
    print("  Teachers:  t.anitha (Grade 5 class teacher), t.vasudeva, t.meera …")
    print(f"  Family:    {ananya.admission_no} or 9876543210 (Ananya Rao, Grade 5)")


if __name__ == "__main__":
    from .db import Base, SessionLocal, engine
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        ensure_base_data(db)
        if "--reset-superadmin" in sys.argv:
            u = db.scalar(select(User).where(User.role == "superadmin"))
            u.password_hash = hash_password(config.SUPERADMIN_PASSWORD)
            u.active, u.token_version = True, u.token_version + 1
            db.commit()
            print(f"Super admin '{u.login}' password reset.")
        if "--demo" in sys.argv:
            demo(db)
    print(f"Database: {config.DB_PATH}")
