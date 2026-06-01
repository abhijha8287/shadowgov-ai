from fastapi import APIRouter

from app.demo_data import DEPARTMENTS
from app.schemas import DepartmentRead

router = APIRouter()


@router.get("", response_model=list[DepartmentRead])
def list_departments() -> list[dict]:
    return DEPARTMENTS

