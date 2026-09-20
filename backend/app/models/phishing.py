from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class PhishingCampaign(Base):
    __tablename__ = "phishing_campaigns"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    title = Column(String, nullable=False)
    scenario_type = Column(String, nullable=False) # Urgent CEO Wire, IT Password Reset, etc.
    email_subject = Column(String, nullable=False)
    sender_name = Column(String, nullable=False)
    sender_email = Column(String, nullable=False)
    email_body_template = Column(Text, nullable=False)
    status = Column(String, default="ACTIVE", nullable=False) # DRAFT, ACTIVE, COMPLETED
    created_by = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    targets = relationship("PhishingTarget", back_populates="campaign", cascade="all, delete-orphan")

class PhishingTarget(Base):
    __tablename__ = "phishing_targets"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    campaign_id = Column(String, ForeignKey("phishing_campaigns.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status = Column(String, default="SENT", nullable=False) # SENT, OPENED, CLICKED, REPORTED
    tracking_token = Column(String, unique=True, index=True, default=lambda: f"tok-{uuid.uuid4().hex[:12]}")
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
    interacted_at = Column(DateTime(timezone=True), nullable=True)

    campaign = relationship("PhishingCampaign", back_populates="targets")
    user = relationship("User")
    events = relationship("PhishingEvent", back_populates="target", cascade="all, delete-orphan")

class PhishingEvent(Base):
    __tablename__ = "phishing_events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    target_id = Column(String, ForeignKey("phishing_targets.id", ondelete="CASCADE"), nullable=False)
    event_type = Column(String, nullable=False) # OPEN, CLICK, REPORT
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    target = relationship("PhishingTarget", back_populates="events")
