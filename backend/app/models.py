from datetime import datetime
from enum import StrEnum

from sqlalchemy import DateTime, Enum, Float, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class ComplaintStatus(StrEnum):
    reported = "Reported"
    under_review = "Under Review"
    assigned = "Assigned"
    in_progress = "In Progress"
    resolved = "Resolved"
    rejected = "Rejected"


class Priority(StrEnum):
    low = "Low"
    medium = "Medium"
    high = "High"
    critical = "Critical"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    role: Mapped[str] = mapped_column(String(40), default="citizen")
    reputation_score: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Department(Base):
    __tablename__ = "departments"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(160), unique=True)
    owner: Mapped[str] = mapped_column(String(160))
    service_level_days: Mapped[int] = mapped_column(Integer, default=10)

    complaints: Mapped[list["Complaint"]] = relationship(back_populates="department")


class Complaint(Base):
    __tablename__ = "complaints"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(220), index=True)
    description: Mapped[str] = mapped_column(Text)
    location: Mapped[str] = mapped_column(String(220), index=True)
    latitude: Mapped[float | None] = mapped_column(Float)
    longitude: Mapped[float | None] = mapped_column(Float)
    category: Mapped[str] = mapped_column(String(80), index=True)
    status: Mapped[ComplaintStatus] = mapped_column(Enum(ComplaintStatus), default=ComplaintStatus.reported)
    priority: Mapped[Priority] = mapped_column(Enum(Priority), default=Priority.medium)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"))
    created_by_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    department: Mapped[Department] = relationship(back_populates="complaints")


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(220), index=True)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"))
    location: Mapped[str] = mapped_column(String(220))
    contractor: Mapped[str] = mapped_column(String(160))
    budget: Mapped[float] = mapped_column(Numeric(12, 2))
    progress: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[str] = mapped_column(String(80), default="On Track")
    risk_score: Mapped[int] = mapped_column(Integer, default=30)


class Budget(Base):
    __tablename__ = "budgets"

    id: Mapped[int] = mapped_column(primary_key=True)
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"))
    fiscal_year: Mapped[str] = mapped_column(String(20))
    allocated_amount: Mapped[float] = mapped_column(Numeric(14, 2))
    spent_amount: Mapped[float] = mapped_column(Numeric(14, 2))


class AIInsight(Base):
    __tablename__ = "ai_insights"

    id: Mapped[int] = mapped_column(primary_key=True)
    target_type: Mapped[str] = mapped_column(String(40))
    target_id: Mapped[int] = mapped_column(Integer)
    summary: Mapped[str] = mapped_column(Text)
    urgency_score: Mapped[int] = mapped_column(Integer)
    risk_level: Mapped[str] = mapped_column(String(40))
    suggested_action: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(primary_key=True)
    complaint_id: Mapped[int] = mapped_column(ForeignKey("complaints.id"))
    resolution_probability: Mapped[float] = mapped_column(Float)
    delay_probability: Mapped[float] = mapped_column(Float)
    escalation_probability: Mapped[float] = mapped_column(Float)
    risk_score: Mapped[int] = mapped_column(Integer)

