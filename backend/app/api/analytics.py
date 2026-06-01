from fastapi import APIRouter

router = APIRouter()


@router.get("/overview")
def overview() -> dict[str, int | float | list[dict[str, int | str]]]:
    return {
        "total_complaints": 1248,
        "open_complaints": 418,
        "resolution_rate": 68,
        "average_resolution_days": 8.4,
        "project_delays": 6,
        "budget_utilization": 72,
        "trends": [
            {"month": "Jan", "complaints": 760, "resolved": 540},
            {"month": "Feb", "complaints": 820, "resolved": 588},
            {"month": "Mar", "complaints": 910, "resolved": 620},
            {"month": "Apr", "complaints": 1040, "resolved": 704},
            {"month": "May", "complaints": 1180, "resolved": 772},
            {"month": "Jun", "complaints": 1248, "resolved": 849},
        ],
    }

