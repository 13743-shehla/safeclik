from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PhishingCampaignCreate(BaseModel):
    title: str
    scenario_type: str
    sender_name: str
    sender_email: str
    email_subject: str
    email_body_template: Optional[str] = "Phishing drill template body"
    target_department: Optional[str] = "All"

class PhishingCampaignOut(BaseModel):
    id: str
    title: str
    scenario_type: str
    sender_name: str
    sender_email: str
    email_subject: str
    email_body_template: str
    status: str
    created_at: Optional[datetime] = None
    target_count: int = 0
    opened_count: int = 0
    clicked_count: int = 0
    reported_count: int = 0
    click_rate: float = 0.0
    report_rate: float = 0.0

    class Config:
        from_attributes = True

class PhishingTargetOut(BaseModel):
    id: str
    campaign_id: str
    campaign_title: Optional[str] = None
    user_id: str
    user_name: Optional[str] = None
    user_email: Optional[str] = None
    department: Optional[str] = None
    status: str
    tracking_token: str
    sent_at: Optional[datetime] = None
    interacted_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ReportPhishRequest(BaseModel):
    token: str
