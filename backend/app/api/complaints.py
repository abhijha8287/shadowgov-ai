from fastapi import APIRouter

from app.demo_data import COMPLAINTS
from app.schemas import ComplaintCreate, ComplaintRead
from app.services.ai import analyze_complaint
from app.services.predictions import predict_resolution_risk

router = APIRouter()


@router.get("", response_model=list[ComplaintRead])
def list_complaints() -> list[dict]:
    return COMPLAINTS


@router.post("", response_model=dict)
def create_complaint(payload: ComplaintCreate) -> dict:
    insight = analyze_complaint(payload)
    prediction = predict_resolution_risk(int(insight["urgency_score"]))
    complaint = payload.model_dump() | {
        "id": len(COMPLAINTS) + 1001,
        "status": "Reported",
        "urgency_score": insight["urgency_score"],
        "risk_level": insight["risk_level"],
    }
    return {"complaint": complaint, "ai_insight": insight, "prediction": prediction}

