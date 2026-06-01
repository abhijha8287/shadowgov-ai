from app.schemas import ComplaintCreate


def analyze_complaint(complaint: ComplaintCreate) -> dict[str, str | int]:
    urgency = 50
    text = f"{complaint.title} {complaint.description} {complaint.priority}".lower()
    if any(term in text for term in ["school", "clinic", "collapsed", "leakage", "overflow"]):
        urgency += 25
    if complaint.priority.lower() == "critical":
        urgency += 20
    elif complaint.priority.lower() == "high":
        urgency += 12
    urgency = min(urgency, 99)
    risk = "High" if urgency >= 80 else "Medium" if urgency >= 60 else "Low"
    return {
        "category": complaint.category,
        "urgency_score": urgency,
        "department": complaint.department,
        "suggested_action": "Assign to department officer and require first response within service-level window.",
        "risk_level": risk,
        "summary": complaint.description[:220],
    }


def answer_civic_question(question: str) -> dict[str, object]:
    lower = question.lower()
    if "department" in lower and ("worst" in lower or "perform" in lower):
        answer = "Public Works currently has the weakest performance score because open road complaints and delayed resurfacing projects are concentrated in Wards 7, 9, and 12."
    elif "delayed" in lower or "project" in lower:
        answer = "The East Canal Drainage Upgrade and Ward 12 Clinic Access Road are the highest-risk delayed projects, based on progress slippage and complaint correlation."
    elif "budget" in lower:
        answer = "Water & Drainage shows elevated spending this quarter because drainage upgrade invoices are moving faster than verified completion milestones."
    else:
        answer = "The strongest civic signal is unresolved road and drainage work clustered around school, clinic, and market corridors."
    return {
        "answer": answer,
        "citations": ["complaints:CMP-1001", "projects:PRJ-1", "departments:Public Works"],
        "confidence": 0.82,
    }

