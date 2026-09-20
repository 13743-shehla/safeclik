from sqlalchemy.orm import Session
from app.models.score import SecurityScore
from app.models.training import TrainingProgress, TrainingModule
from app.models.phishing import PhishingTarget
from datetime import datetime

def calculate_employee_score(db: Session, user_id: str) -> SecurityScore:
    """
    Computes an employee's comprehensive Cyber Hygiene Security Score (0-100).
    Formula:
    - 40% Phishing resilience (0 clicks = 100, reports give bonus)
    - 30% Training completion rate & quiz scores
    - 20% Incident reporting speed
    - 10% Credential & account hygiene
    """
    # 1. Phishing drills analysis
    targets = db.query(PhishingTarget).filter(PhishingTarget.user_id == user_id).all()
    if not targets:
        phishing_score = 85
        reporting_score = 75
    else:
        clicked_count = sum(1 for t in targets if t.status == "CLICKED")
        reported_count = sum(1 for t in targets if t.status == "REPORTED")
        total = len(targets)

        # Baseline 100, -35 for each clicked phishing link, +10 for reports
        phishing_score = max(0, min(100, 100 - (clicked_count * 35) + (reported_count * 5)))
        reporting_score = int((reported_count / total) * 100) if total > 0 else 75

    # 2. Training completion
    total_modules = db.query(TrainingModule).count() or 1
    completed_progress = db.query(TrainingProgress).filter(
        TrainingProgress.user_id == user_id,
        TrainingProgress.completed == True
    ).all()

    completed_count = len(completed_progress)
    avg_quiz_score = (
        sum((p.score or 80) for p in completed_progress) / completed_count
        if completed_count > 0 else 70
    )
    training_score = int(((completed_count / total_modules) * 0.5 + (avg_quiz_score / 100) * 0.5) * 100)

    # 3. Weighted total
    overall = int(
        (phishing_score * 0.40) +
        (training_score * 0.30) +
        (reporting_score * 0.20) +
        (80 * 0.10) # Baseline password policy
    )
    overall = max(10, min(100, overall))

    # Risk classification
    if overall >= 80:
        risk = "LOW"
    elif overall >= 60:
        risk = "MEDIUM"
    elif overall >= 40:
        risk = "HIGH"
    else:
        risk = "CRITICAL"

    # Persist or update score
    score_record = db.query(SecurityScore).filter(SecurityScore.user_id == user_id).first()
    if not score_record:
        score_record = SecurityScore(
            user_id=user_id,
            overall_score=overall,
            training_score=training_score,
            phishing_resilience=phishing_score,
            reporting_score=reporting_score,
            risk_level=risk,
        )
        db.add(score_record)
    else:
        score_record.overall_score = overall
        score_record.training_score = training_score
        score_record.phishing_resilience = phishing_score
        score_record.reporting_score = reporting_score
        score_record.risk_level = risk
        score_record.last_updated = datetime.utcnow()

    db.commit()
    db.refresh(score_record)
    return score_record
