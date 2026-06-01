def predict_resolution_risk(urgency_score: int, department_score: int = 65) -> dict[str, float | int]:
    delay_probability = min(0.95, max(0.05, (urgency_score / 100) * (1 - department_score / 140)))
    escalation_probability = min(0.9, delay_probability * 0.72)
    resolution_probability = max(0.05, 1 - delay_probability)
    risk_score = round((delay_probability * 70 + escalation_probability * 30))
    return {
        "resolution_probability": round(resolution_probability, 2),
        "delay_probability": round(delay_probability, 2),
        "escalation_probability": round(escalation_probability, 2),
        "risk_score": risk_score,
    }

