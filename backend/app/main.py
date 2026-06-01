from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import analytics, assistant, complaints, departments, projects
from app.core.config import settings

app = FastAPI(title="ShadowGov AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaints.router, prefix="/api/complaints", tags=["complaints"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(departments.router, prefix="/api/departments", tags=["departments"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(assistant.router, prefix="/api/assistant", tags=["assistant"])


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "shadowgov-ai"}

