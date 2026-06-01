from fastapi import APIRouter

from app.schemas import AssistantAnswer, AssistantQuery
from app.services.ai import answer_civic_question

router = APIRouter()


@router.post("/query", response_model=AssistantAnswer)
def query_assistant(payload: AssistantQuery) -> dict:
    return answer_civic_question(payload.question)

