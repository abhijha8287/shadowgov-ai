from pydantic import BaseModel, Field


class ComplaintCreate(BaseModel):
    title: str
    description: str
    location: str
    category: str
    department: str
    priority: str = "Medium"
    latitude: float | None = None
    longitude: float | None = None


class ComplaintRead(ComplaintCreate):
    id: int | str
    status: str
    urgency_score: int = 50
    risk_level: str = "Medium"


class ProjectRead(BaseModel):
    id: int | str
    name: str
    department: str
    location: str
    contractor: str
    budget: float
    progress: int
    status: str
    risk_score: int


class DepartmentRead(BaseModel):
    id: int | str
    name: str
    owner: str
    open_complaints: int
    resolution_rate: int
    performance_score: int


class AssistantQuery(BaseModel):
    question: str = Field(min_length=3)
    city: str | None = None
    role: str = "citizen"


class AssistantAnswer(BaseModel):
    answer: str
    citations: list[str] = []
    confidence: float = 0.78

