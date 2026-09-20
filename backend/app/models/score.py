from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class SecurityScore(Base):
    __tablename__ = "security_scores"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    overall_score = Column(Integer, default=70, nullable=False)
    training_score = Column(Integer, default=50, nullable=False)
    phishing_resilience = Column(Integer, default=75, nullable=False)
    reporting_score = Column(Integer, default=60, nullable=False)
    risk_level = Column(String, default="MEDIUM", nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    last_updated = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = relationship("User")

class OSINTRecord(Base):
    __tablename__ = "osint_records"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    domain = Column(String, nullable=False, index=True)
    exposure_score = Column(Integer, default=30)
    risk_level = Column(String, default="LOW")
    findings_json = Column(Text, nullable=False)
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())
