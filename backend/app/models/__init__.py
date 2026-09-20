from app.core.database import Base
from app.models.user import User
from app.models.training import TrainingModule, Lesson, Quiz, QuizQuestion, QuizAttempt, TrainingProgress
from app.models.phishing import PhishingCampaign, PhishingTarget, PhishingEvent
from app.models.score import SecurityScore, OSINTRecord

__all__ = [
    "Base",
    "User",
    "TrainingModule",
    "Lesson",
    "Quiz",
    "QuizQuestion",
    "QuizAttempt",
    "TrainingProgress",
    "PhishingCampaign",
    "PhishingTarget",
    "PhishingEvent",
    "SecurityScore",
    "OSINTRecord",
]
