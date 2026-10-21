"""First-run setup and optional demonstration data.

    python -m app.seed               # create tables + super admin + website content (safe to re-run)
    python -m app.seed --demo        # also add a demo school (departments, staff, classes, students…)
    python -m app.seed --remove-demo # delete the demo school again
    python -m app.seed --reset-superadmin   # set the super admin password back to AG_SUPERADMIN_PASSWORD
"""
import random
import sys
from datetime import date, timedelta

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from . import config
from .content import SEED_BOARDS
from .models import (Assessment, Attendance, Circular, ClassRoom, Department, Enquiry, Fee, Homework, LeaveRequest,
                     Mark, Material, Message, Participation, SiteSetting, Student, Subject, TimetableSlot, User)
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
DEMO_KEY = "demo_records"          # SiteSetting holding the ids the demo created, so it can be removed

# (department, description, [(grade, [sections])])
DEPTS = [
    ("Pre-Primary", "Nursery, LKG and UKG", [("Nursery", "A"), ("LKG", "A"), ("UKG", "A")]),
    ("Primary", "Grades 1 to 5", [("Grade 1", "AB"), ("Grade 2", "A"), ("Grade 3", "A"), ("Grade 4", "A"), ("Grade 5", "AB")]),
    ("Middle & High School", "Grades 6 to 10", [("Grade 6", "A"), ("Grade 7", "A"), ("Grade 8", "AB"), ("Grade 9", "A"), ("Grade 10", "A")]),
]
HODS = [("Smt. Padmavathi Rao", "hod.preprimary"), ("Smt. Lakshmi Rao", "hod.primary"),
        ("Sri Mahesh Kumar", "hod.middle")]
TEACHERS = [
    ("Smt. Shobha B.", 0, "M.A., D.Ed."), ("Smt. Kavya Hegde", 0, "B.A., NTT"), ("Smt. Gayathri Nayak", 0, "B.Sc., NTT"),
    ("Smt. Anitha Murthy", 1, "M.Sc., B.Ed."), ("Acharya Vasudeva", 1, "Vidwat (Sanskrit)"),
    ("Smt. Deepa Kulkarni", 1, "M.A., B.Ed."), ("Sri Raghavendra", 1, "B.Sc., B.Ed."), ("Smt. Suma Bhat", 1, "M.A., B.Ed."),
    ("Smt. Rekha Shenoy", 1, "B.A., B.Ed."), ("Sri Kiran Rao", 1, "B.P.Ed."),
    ("Acharya Srinivasa", 2, "Vidwat, M.A. (Sanskrit)"), ("Sri Prakash Joshi", 2, "M.Sc., B.Ed."),
    ("Smt. Meera Iyer", 2, "M.A. (English), B.Ed."), ("Sri Arun Bhat", 2, "M.Sc. (Physics), B.Ed."),
    ("Smt. Pooja Hegde", 2, "M.A. (Kannada), B.Ed."), ("Sri Nagaraj K.", 2, "M.A. (History), B.Ed."),
]
FIRST = ["Ananya", "Aditi", "Vedant", "Krishna", "Meghana", "Pranav", "Sahana", "Rohan", "Tejas", "Shreya",
         "Varun", "Nandini", "Akshay", "Bhavana", "Chirag", "Divya", "Gautam", "Ishani", "Karthik", "Lavanya"]
GIRLS = {"Ananya", "Aditi", "Meghana", "Sahana", "Shreya", "Nandini", "Bhavana", "Divya", "Ishani", "Lavanya"}
LAST = ["Rao", "Bhat", "Kulkarni", "Joshi", "Hegde", "Acharya", "Murthy", "Iyengar", "Upadhya", "Deshpande"]
FATHERS = ["Sri Raghavendra", "Sri Srinivas", "Sri Venkatesh", "Sri Prasanna", "Sri Gururaj", "Sri Anand",
           "Sri Narayan", "Sri Vijay", "Sri Mohan", "Sri Sudhir"]
SUBJECTS = ["Sanskrit", "English", "Kannada", "Mathematics", "Science", "Social Studies", "Music and games"]
EARLY_SUBJECTS = ["Sanskrit", "English", "Numbers", "Music and games"]
PERIODS = [("8:45", "9:30"), ("9:30", "10:15"), ("10:30", "11:15"), ("11:15", "12:00"), ("1:00", "1:45"), ("2:00", "3:00")]
# Sample study material shipped with the site (frontend/public/samples)
MATERIALS = {
    "Sanskrit": ("Shloka practice sheet", "/samples/sanskrit-shlokas.pdf", "The five shlokas for this month, with meaning."),
    "Mathematics": ("Worksheet — fractions and decimals", "/samples/maths-worksheet.pdf", "Try all ten questions; answers are on page 2."),
    "Science": ("Chapter notes — plants and food", "/samples/science-notes.pdf", "Read before the next class."),
    "English": ("Reading list for the term", "/samples/english-reading.pdf", "Pick any two books from the list."),
    "Numbers": ("Counting and colouring sheet", "/samples/maths-worksheet.pdf", "Colour the groups and count aloud with a parent."),
}
EXAM_PLAN = [("Mid-term", 50, date(2026, 7, 24)), ("Quarterly", 100, date(2026, 9, 5))]


def school_days(n, end=None):
    d, out = (end or date.today()), []
    while len(out) < n:
        if d.weekday() < 6:
            out.append(d)
        d -= timedelta(days=1)
    return sorted(out)


DEMO_ACCOUNTS = [
    {"role": "HOD", "login": "hod.primary", "name": "Smt. Lakshmi Rao", "note": "Head of the Primary department (Grades 1–5)"},
    {"role": "Teacher", "login": "t.anitha", "name": "Smt. Anitha Murthy", "note": "Class teacher of Grade 5 A; teaches Mathematics"},
    {"role": "Student / parent", "login": "9876543210", "name": "Ananya Rao (Smt. Anuradha Rao)", "note": "Grade 5 A — sign in on the Family tab"},
]


def demo_loaded(db: Session) -> bool:
    return bool(db.scalar(select(User).where(User.login == "hod.primary")))


def demo(db: Session, verbose: bool = True):
    """Add a complete sample school. Safe to call twice; returns the demo logins."""
    if demo_loaded(db):
        if verbose:
            print("Demo data already present — skipped.")
        return DEMO_ACCOUNTS
    taken = [f"{g} {sec}" for _, _, grades in DEPTS for g, sections in grades for sec in sections
             if db.scalar(select(ClassRoom).where(ClassRoom.name == g, ClassRoom.section == sec,
                                                  ClassRoom.academic_year == "2026-27"))]
    if taken:
        raise ValueError(f"The school already has {', '.join(taken[:3])} — the demo school needs those class "
                         f"names free. Load it on a fresh database instead.")
    rnd = random.Random(7)
    made = {"departments": [], "classes": [], "users": [], "enquiries": []}
    pw = hash_password(DEMO_PASSWORD)
    admin = db.scalar(select(User).where(User.role == "superadmin"))
    today = date.today()

    depts, hods = [], []
    for (name, desc, _), (hname, hlogin) in zip(DEPTS, HODS):
        d = db.scalar(select(Department).where(Department.name == name))
        if not d:
            d = Department(name=name, description=desc)
            db.add(d)
            db.flush()
            made["departments"].append(d.id)
        depts.append(d)
        h = User(role="hod", name=hname, login=hlogin, password_hash=pw, must_change_password=False,
                 department_id=d.id, designation="Head of Department", qualification="M.A., M.Ed.",
                 phone=f"98450{rnd.randint(10000, 99999)}", email=f"{hlogin}@arundhatigurukulam.in",
                 created_by_id=admin.id if admin else None)
        db.add(h)
        hods.append(h)
    db.flush()
    teachers = []
    for tname, di, qual in TEACHERS:
        t = User(role="teacher", name=tname, login="t." + tname.split()[1].lower().rstrip("."), password_hash=pw,
                 must_change_password=False, department_id=depts[di].id, designation="Teacher", qualification=qual,
                 phone=f"99000{rnd.randint(10000, 99999)}", created_by_id=hods[di].id)
        db.add(t)
        teachers.append(t)
    db.flush()
    made["users"] += [u.id for u in hods + teachers]
    by_dept = {d.id: [t for t in teachers if t.department_id == d.id] for d in depts}

    classes = []
    for d, (_, _, grades) in zip(depts, DEPTS):
        pool = by_dept[d.id]
        n = 0
        for g, sections in grades:
            for sec in sections:
                c = ClassRoom(name=g, section=sec, department_id=d.id, room=f"Room {len(classes) + 1}",
                              class_teacher_id=pool[n % len(pool)].id)
                db.add(c)
                db.flush()
                made["classes"].append(c.id)
                n += 1
                classes.append(c)
    # Grade 5 A's class teacher is Smt. Anitha Murthy — the demo teacher login
    anitha = next(t for t in teachers if t.login == "t.anitha")
    g5 = next(c for c in classes if c.name == "Grade 5" and c.section == "A")
    for c in classes:
        if c.class_teacher_id == anitha.id and c is not g5:
            c.class_teacher_id = g5.class_teacher_id
    g5.class_teacher_id = anitha.id
    db.flush()

    subjects = {}
    for ci, c in enumerate(classes):
        pool = by_dept[c.department_id]
        names = EARLY_SUBJECTS if c.name in ("Nursery", "LKG", "UKG") else SUBJECTS
        subs = []
        for si, sname in enumerate(names):
            teacher = pool[(si + ci) % len(pool)].id
            if sname == "Mathematics" and c.department_id == g5.department_id and c.name in ("Grade 4", "Grade 5"):
                teacher = anitha.id                      # the demo teacher also teaches maths in Grades 4–5
            s = Subject(class_id=c.id, name=sname, teacher_id=teacher)
            db.add(s)
            subs.append(s)
        db.flush()
        subjects[c.id] = subs
        for wd in range(6):
            for p, (a, b) in enumerate(PERIODS[: (4 if wd == 5 else 6)]):
                s = subs[(p + wd + ci) % len(subs)]
                db.add(TimetableSlot(class_id=c.id, weekday=wd, period=p + 1, starts=a, ends=b,
                                     subject="Prayer and recitation" if p == 0 else s.name,
                                     teacher_id=c.class_teacher_id if p == 0 else s.teacher_id))

    # students — 8 per section; Ananya Rao (Grade 5 A, roll 1) is the demo family
    n, students = 0, []
    for ci, c in enumerate(classes):
        for r in range(1, 9):
            n += 1
            first, last = FIRST[(n * 3) % len(FIRST)], LAST[(n * 7) % len(LAST)]
            father, phone = FATHERS[n % len(FATHERS)] + " " + last, f"98765{43210 + n:05d}"[-10:]
            if first == "Ananya" and last == "Rao":
                last = "Bhat"
            if c is g5 and r == 1:
                first, last, father, phone = "Ananya", "Rao", "Smt. Anuradha Rao", "9876543210"
            adm = f"AGD{n:03d}"
            u = User(role="parent", name=father, login=adm.lower(), password_hash=pw, must_change_password=False,
                     phone=phone, email=f"parent.{adm.lower()}@example.com", created_by_id=c.class_teacher_id)
            db.add(u)
            db.flush()
            made["users"].append(u.id)
            grade_no = ci % 12
            st = Student(user_id=u.id, admission_no=adm, name=f"{first} {last}", class_id=c.id, roll_no=str(r),
                         gender="Female" if first in GIRLS else "Male", parent_name=father,
                         mother_name=("Smt. Anuradha Rao" if c is g5 and r == 1 else f"Smt. {FIRST[(n * 5) % len(FIRST)]} {last}"),
                         phone=phone, email=u.email, dob=date(2022 - grade_no, 1 + r % 12, 1 + n % 27),
                         blood_group=["A+", "B+", "O+", "AB+", "O-"][n % 5],
                         address=f"{n} {['3rd Cross', 'Bull Temple Road', 'Gandhi Bazaar', 'DVG Road'][n % 4]}, Basavanagudi, Bengaluru",
                         admitted_on=date(2026, 6, 2), created_by_id=c.class_teacher_id)
            db.add(st)
            students.append(st)
            st._ability = 0.88 if (c is g5 and r == 1) else rnd.uniform(0.55, 0.92)   # for believable marks
    db.flush()

    for st in students:
        ct = next(c.class_teacher_id for c in classes if c.id == st.class_id)
        for d in school_days(30):
            roll = rnd.random()
            db.add(Attendance(student_id=st.id, class_id=st.class_id, day=d, marked_by_id=ct,
                              status="A" if roll < 0.04 else ("L" if roll < 0.07 else "P")))

    # Mid-term and Quarterly — entered and announced; Half-yearly and Annual are left for you to try
    for c in classes:
        roster = [s for s in students if s.class_id == c.id]
        for exam, out_of, held in EXAM_PLAN:
            for s in subjects[c.id]:
                a = Assessment(class_id=c.id, subject_id=s.id, name=exam, max_marks=out_of, held_on=held,
                               published=True, created_by_id=s.teacher_id)
                db.add(a)
                db.flush()
                for st in roster:
                    v = out_of * min(0.98, max(0.3, rnd.gauss(st._ability, 0.07)))
                    db.add(Mark(assessment_id=a.id, student_id=st.id, marks=round(v * 2) / 2))
        subs = subjects[c.id]
        db.add(Homework(class_id=c.id, subject_id=subs[1].id, title="Read chapter 4 and answer the questions",
                        details="Write answers in the class notebook. Bring it on Monday.",
                        due_on=today + timedelta(days=2), created_by_id=subs[1].teacher_id))
        db.add(Homework(class_id=c.id, subject_id=subs[0].id, title="Learn the first five shlokas by heart",
                        details="Recite at home with a parent each evening.", due_on=today + timedelta(days=5),
                        created_by_id=subs[0].teacher_id,
                        attachment=MATERIALS["Sanskrit"][1]))
        maths = next((s for s in subs if s.name in ("Mathematics", "Numbers")), subs[-1])
        db.add(Homework(class_id=c.id, subject_id=maths.id, title="Today: worksheet questions 1 to 5",
                        details="Show your working. Due tomorrow.", due_on=today + timedelta(days=1),
                        attachment=MATERIALS[maths.name][1] if maths.name in MATERIALS else "",
                        created_by_id=maths.teacher_id))
        for s in subs:
            if s.name in MATERIALS:
                title, url, desc = MATERIALS[s.name]
                db.add(Material(class_id=c.id, subject_id=s.id, title=title, description=desc, url=url,
                                filename=url.rsplit("/", 1)[-1], created_by_id=s.teacher_id))
        db.add(Material(class_id=c.id, subject_id=None, title="Syllabus and exam portions 2026–27",
                        description="Portions for the Half-yearly and Annual examinations.",
                        url="/samples/syllabus-2026-27.pdf", filename="syllabus-2026-27.pdf",
                        created_by_id=c.class_teacher_id))

    events = [("Sanskrit recitation evening", "Sanskrit", date(2026, 9, 27)),
              ("Inter-school chess tournament", "Academic", date(2026, 8, 22)),
              ("Annual sports day — 100 m race", "Sports", date(2026, 8, 14)),
              ("Science model exhibition", "Academic", date(2026, 7, 30)),
              ("Kannada Rajyotsava drawing competition", "Cultural", date(2026, 10, 10))]
    for i, st in enumerate(students):
        if rnd.random() < 0.45:
            ev, cat, when = events[i % len(events)]
            db.add(Participation(student_id=st.id, event=ev, category=cat, held_on=when, created_by_id=st.created_by_id,
                                 achievement=rnd.choice(["Participated", "Participated", "First place", "Second place",
                                                         "Third place", "Certificate of merit"])))
    ananya = next(s for s in students if s.phone == "9876543210")
    for ev, cat, when, ach, note in [
        ("Sanskrit recitation evening", "Sanskrit", date(2026, 9, 27), "First place", "Recited the Purusha Sukta from memory."),
        ("Inter-school chess tournament", "Academic", date(2026, 8, 22), "Participated", "Reached the quarter-final."),
        ("Annual sports day — 100 m race", "Sports", date(2026, 8, 14), "Second place", ""),
    ]:
        db.add(Participation(student_id=ananya.id, event=ev, category=cat, held_on=when, achievement=ach, note=note,
                             created_by_id=anitha.id))

    for st in students:
        db.add(Fee(student_id=st.id, title="Term I instalment", amount=18400, due_on=date(2026, 6, 30), status="paid",
                   paid_on=date(2026, 6, 20), receipt_no=f"AGR-2026-{st.id:05d}", mode="Bank transfer"))
        db.add(Fee(student_id=st.id, title="Term II instalment", amount=18400, due_on=date(2026, 10, 30)))

    primary = depts[1]
    db.add_all([
        Message(student_id=ananya.id, sender_id=ananya.user_id, from_parent=True,
                body="Namaste. Ananya has a cold today and will rest at home. She will be back tomorrow."),
        Message(student_id=ananya.id, sender_id=anitha.id, from_parent=False, read=False,
                body="Thank you for letting us know. Please make sure she revises the Sanskrit lesson."),
        LeaveRequest(student_id=ananya.id, from_day=today + timedelta(days=3), to_day=today + timedelta(days=4),
                     reason="Family function in Mysuru."),
        Circular(category="meeting", title="Parent–teacher meeting", audience="department", department_id=primary.id,
                 body="Parent–teacher meeting for Grades 1 to 5. Meet the class teacher in the classroom between 9 am "
                      "and 12 noon; the Quarterly answer papers will be shown.",
                 publish_on=today - timedelta(days=1), event_on=today + timedelta(days=6), created_by_id=hods[1].id),
        Circular(category="meeting", title="Grade 5 A — progress meeting", audience="class", class_id=g5.id,
                 body="A short meeting about the Half-yearly preparation plan. 10:30 am in Room 7.",
                 publish_on=today, event_on=today + timedelta(days=9), created_by_id=anitha.id),
        Circular(category="circular", title="Circular 15/2026", audience="class", class_id=g5.id,
                 body="Half-yearly examination timetable for Grade 5.", publish_on=today - timedelta(days=1),
                 created_by_id=anitha.id),
        Circular(category="event", title="Kannada Rajyotsava", audience="all",
                 body="Kannada Rajyotsava celebration in the main hall — songs, poems and the flag hoisting.",
                 publish_on=today - timedelta(days=2), event_on=date(2026, 11, 1), on_website=True,
                 created_by_id=hods[1].id),
    ])
    e = Enquiry(kind="visit", name="Smt. Rekha Prakash", phone="9845012345", grade="Grade 3",
                message="Would like to visit on a weekday morning.", reference="AG-4821",
                data={"Parent's name": "Smt. Rekha Prakash", "Phone": "9845012345", "Grade applying for": "Grade 3"})
    db.add(e)
    db.flush()
    made["enquiries"].append(e.id)
    row = db.get(SiteSetting, DEMO_KEY)
    if row:
        row.value = made
    else:
        db.add(SiteSetting(key=DEMO_KEY, value=made))
    db.commit()
    if verbose:
        print(f"Demo school created. Every demo account uses the password: {DEMO_PASSWORD}")
        for a in DEMO_ACCOUNTS:
            print(f"  {a['role']:<17} {a['login']:<14} {a['note']}")
    return DEMO_ACCOUNTS


def remove_demo(db: Session):
    """Delete everything demo() created. Real records the school added stay."""
    row = db.get(SiteSetting, DEMO_KEY)
    made = row.value if row else {}
    users = made.get("users") or []
    if users:
        db.execute(delete(Circular).where(Circular.created_by_id.in_(users)))
        db.execute(delete(Student).where(Student.user_id.in_(users)))
        db.execute(delete(User).where(User.id.in_(users)))
    if made.get("classes"):
        db.execute(delete(ClassRoom).where(ClassRoom.id.in_(made["classes"])))
    if made.get("departments"):
        db.execute(delete(Department).where(Department.id.in_(made["departments"])))
    if made.get("enquiries"):
        db.execute(delete(Enquiry).where(Enquiry.id.in_(made["enquiries"])))
    if row:
        db.delete(row)
    db.commit()


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
        if "--remove-demo" in sys.argv:
            remove_demo(db)
            print("Demo school removed.")
    print(f"Database: {config.DB_PATH}")
