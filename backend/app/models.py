"""Database tables.

Who creates whom:  superadmin -> HOD -> teacher -> student.
A student's login is also the parent's login (role "parent").
"""
from datetime import date, datetime

from sqlalchemy import (JSON, Boolean, Date, DateTime, Float, ForeignKey, Integer, String, Text,
                        UniqueConstraint)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base

ROLES = ("superadmin", "hod", "teacher", "parent")


def now():
    return datetime.utcnow()


class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True)
    description: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    role: Mapped[str] = mapped_column(String(20), index=True)
    name: Mapped[str] = mapped_column(String(160))
    login: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    phone: Mapped[str] = mapped_column(String(30), default="")
    email: Mapped[str] = mapped_column(String(160), default="")
    designation: Mapped[str] = mapped_column(String(120), default="")
    qualification: Mapped[str] = mapped_column(String(160), default="")
    password_hash: Mapped[str] = mapped_column(String(255))
    must_change_password: Mapped[bool] = mapped_column(Boolean, default=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    department_id: Mapped[int | None] = mapped_column(ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    last_login: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    token_version: Mapped[int] = mapped_column(Integer, default=0)

    department = relationship("Department", foreign_keys=[department_id])


class ClassRoom(Base):
    __tablename__ = "classes"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60))          # "Grade 5", "UKG"
    section: Mapped[str] = mapped_column(String(10), default="A")
    academic_year: Mapped[str] = mapped_column(String(20), default="2026-27")
    room: Mapped[str] = mapped_column(String(40), default="")
    department_id: Mapped[int | None] = mapped_column(ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    class_teacher_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    department = relationship("Department")
    class_teacher = relationship("User", foreign_keys=[class_teacher_id])
    __table_args__ = (UniqueConstraint("name", "section", "academic_year"),)

    @property
    def label(self):
        return f"{self.name} {self.section}".strip()


class Subject(Base):
    __tablename__ = "subjects"
    id: Mapped[int] = mapped_column(primary_key=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id", ondelete="CASCADE"), index=True)
    name: Mapped[str] = mapped_column(String(80))
    teacher_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    classroom = relationship("ClassRoom")
    teacher = relationship("User")


class Student(Base):
    __tablename__ = "students"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    admission_no: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(160))
    class_id: Mapped[int | None] = mapped_column(ForeignKey("classes.id", ondelete="SET NULL"), nullable=True, index=True)
    roll_no: Mapped[str] = mapped_column(String(10), default="")
    dob: Mapped[date | None] = mapped_column(Date, nullable=True)
    gender: Mapped[str] = mapped_column(String(20), default="")
    blood_group: Mapped[str] = mapped_column(String(8), default="")
    parent_name: Mapped[str] = mapped_column(String(160), default="")
    mother_name: Mapped[str] = mapped_column(String(160), default="")
    phone: Mapped[str] = mapped_column(String(30), default="")
    email: Mapped[str] = mapped_column(String(160), default="")
    address: Mapped[str] = mapped_column(Text, default="")
    admitted_on: Mapped[date | None] = mapped_column(Date, nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    user = relationship("User", foreign_keys=[user_id])
    classroom = relationship("ClassRoom")


class Attendance(Base):
    __tablename__ = "attendance"
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id", ondelete="CASCADE"), index=True)
    class_id: Mapped[int | None] = mapped_column(ForeignKey("classes.id", ondelete="SET NULL"), nullable=True, index=True)
    day: Mapped[date] = mapped_column(Date, index=True)
    status: Mapped[str] = mapped_column(String(2))          # P, A, L (late), H (half day)
    note: Mapped[str] = mapped_column(String(200), default="")
    marked_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    marked_at: Mapped[datetime] = mapped_column(DateTime, default=now)
    __table_args__ = (UniqueConstraint("student_id", "day"),)


class Assessment(Base):
    __tablename__ = "assessments"
    id: Mapped[int] = mapped_column(primary_key=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id", ondelete="CASCADE"), index=True)
    subject_id: Mapped[int | None] = mapped_column(ForeignKey("subjects.id", ondelete="CASCADE"), nullable=True)
    name: Mapped[str] = mapped_column(String(120))           # "Term I", "Unit test 2"
    max_marks: Mapped[float] = mapped_column(Float, default=100)
    held_on: Mapped[date | None] = mapped_column(Date, nullable=True)
    published: Mapped[bool] = mapped_column(Boolean, default=False)
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    subject = relationship("Subject")
    classroom = relationship("ClassRoom")


class Mark(Base):
    __tablename__ = "marks"
    id: Mapped[int] = mapped_column(primary_key=True)
    assessment_id: Mapped[int] = mapped_column(ForeignKey("assessments.id", ondelete="CASCADE"), index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id", ondelete="CASCADE"), index=True)
    marks: Mapped[float | None] = mapped_column(Float, nullable=True)
    remark: Mapped[str] = mapped_column(String(200), default="")
    __table_args__ = (UniqueConstraint("assessment_id", "student_id"),)


class Homework(Base):
    __tablename__ = "homework"
    id: Mapped[int] = mapped_column(primary_key=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id", ondelete="CASCADE"), index=True)
    subject_id: Mapped[int | None] = mapped_column(ForeignKey("subjects.id", ondelete="SET NULL"), nullable=True)
    title: Mapped[str] = mapped_column(String(200))
    details: Mapped[str] = mapped_column(Text, default="")
    due_on: Mapped[date | None] = mapped_column(Date, nullable=True)
    attachment: Mapped[str] = mapped_column(String(300), default="")
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    subject = relationship("Subject")
    created_by = relationship("User")


class TimetableSlot(Base):
    __tablename__ = "timetable"
    id: Mapped[int] = mapped_column(primary_key=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id", ondelete="CASCADE"), index=True)
    weekday: Mapped[int] = mapped_column(Integer)            # 0 = Monday … 5 = Saturday
    period: Mapped[int] = mapped_column(Integer)
    starts: Mapped[str] = mapped_column(String(10), default="")
    ends: Mapped[str] = mapped_column(String(10), default="")
    subject: Mapped[str] = mapped_column(String(80), default="")
    teacher_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    teacher = relationship("User")


class Circular(Base):
    """Notices, circulars and events. Website boards show those marked for the website."""
    __tablename__ = "circulars"
    id: Mapped[int] = mapped_column(primary_key=True)
    category: Mapped[str] = mapped_column(String(20), default="notice")   # notice | circular | event
    title: Mapped[str] = mapped_column(String(200), default="")
    body: Mapped[str] = mapped_column(Text)
    audience: Mapped[str] = mapped_column(String(20), default="all")     # all | parents | staff | department | class
    department_id: Mapped[int | None] = mapped_column(ForeignKey("departments.id", ondelete="CASCADE"), nullable=True)
    class_id: Mapped[int | None] = mapped_column(ForeignKey("classes.id", ondelete="CASCADE"), nullable=True)
    publish_on: Mapped[date] = mapped_column(Date, default=date.today)
    event_on: Mapped[date | None] = mapped_column(Date, nullable=True)
    on_website: Mapped[bool] = mapped_column(Boolean, default=False)
    attachment: Mapped[str] = mapped_column(String(300), default="")
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    created_by = relationship("User")
    classroom = relationship("ClassRoom")
    department = relationship("Department")


class Fee(Base):
    __tablename__ = "fees"
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(160))
    amount: Mapped[float] = mapped_column(Float)
    due_on: Mapped[date | None] = mapped_column(Date, nullable=True)
    status: Mapped[str] = mapped_column(String(10), default="due")      # due | paid | waived
    paid_on: Mapped[date | None] = mapped_column(Date, nullable=True)
    receipt_no: Mapped[str] = mapped_column(String(40), default="")
    mode: Mapped[str] = mapped_column(String(30), default="")
    note: Mapped[str] = mapped_column(String(200), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    student = relationship("Student")


class Message(Base):
    """Parent ↔ school notes, one thread per student."""
    __tablename__ = "messages"
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id", ondelete="CASCADE"), index=True)
    sender_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    body: Mapped[str] = mapped_column(Text)
    from_parent: Mapped[bool] = mapped_column(Boolean, default=True)
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    sender = relationship("User")


class LeaveRequest(Base):
    __tablename__ = "leave_requests"
    id: Mapped[int] = mapped_column(primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id", ondelete="CASCADE"), index=True)
    from_day: Mapped[date] = mapped_column(Date)
    to_day: Mapped[date] = mapped_column(Date)
    reason: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(12), default="pending")  # pending | approved | rejected
    response: Mapped[str] = mapped_column(String(300), default="")
    decided_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    decided_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    student = relationship("Student")
    decided_by = relationship("User")


class Enquiry(Base):
    """Admission / visit / contact enquiries from the public site."""
    __tablename__ = "enquiries"
    id: Mapped[int] = mapped_column(primary_key=True)
    kind: Mapped[str] = mapped_column(String(20), default="admission")  # visit | admission | contact
    name: Mapped[str] = mapped_column(String(160), default="")
    phone: Mapped[str] = mapped_column(String(40), default="")
    email: Mapped[str] = mapped_column(String(160), default="")
    child_name: Mapped[str] = mapped_column(String(160), default="")
    grade: Mapped[str] = mapped_column(String(60), default="")
    message: Mapped[str] = mapped_column(Text, default="")
    data: Mapped[dict] = mapped_column(JSON, default=dict)
    status: Mapped[str] = mapped_column(String(20), default="new")      # new | contacted | visited | admitted | closed
    notes: Mapped[str] = mapped_column(Text, default="")
    reference: Mapped[str] = mapped_column(String(30), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)


class SiteSetting(Base):
    """Website content the admin edits: ticker, FAQs, term dates, holidays, school details…"""
    __tablename__ = "site_settings"
    key: Mapped[str] = mapped_column(String(60), primary_key=True)
    value: Mapped[dict | list] = mapped_column(JSON)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=now, onupdate=now)


class DisclosureDoc(Base):
    """Latest PDF / photo uploaded for a Mandatory Disclosure row."""
    __tablename__ = "disclosure_docs"
    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(String(20), index=True)
    filename: Mapped[str] = mapped_column(String(255))
    stored: Mapped[str] = mapped_column(String(300))
    size: Mapped[int] = mapped_column(Integer, default=0)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=now)


class AuditLog(Base):
    __tablename__ = "audit_log"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action: Mapped[str] = mapped_column(String(60))
    detail: Mapped[str] = mapped_column(String(400), default="")
    at: Mapped[datetime] = mapped_column(DateTime, default=now, index=True)

    user = relationship("User")


class PasswordResetOTP(Base):
    """Temporary One-Time Password for email verification during password reset."""
    __tablename__ = "password_reset_otps"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    email: Mapped[str] = mapped_column(String(160))
    otp: Mapped[str] = mapped_column(String(10))
    expires_at: Mapped[datetime] = mapped_column(DateTime, index=True)
    used: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=now)

    user = relationship("User")

