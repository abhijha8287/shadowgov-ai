from fastapi import APIRouter

from app.demo_data import PROJECTS
from app.schemas import ProjectRead

router = APIRouter()


@router.get("", response_model=list[ProjectRead])
def list_projects() -> list[dict]:
    return PROJECTS

