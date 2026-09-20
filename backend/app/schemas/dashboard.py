from pydantic import BaseModel
from typing import List, Optional, Any
from app.schemas.user import UserOut
from app.schemas.training import TrainingModuleOut
from app.schemas.phishing import PhishingCampaignOut, PhishingTargetOut

class SecurityScoreFactor(BaseModel):
    name: str
    score: int
    weight: str
    status: str
    description: str

class SecurityScoreBreakdownOut(BaseModel):
    overall: int
    risk_level: str
    training_score: int
    phishing_resilience: int
    incident_reporting_rate: int
    last_updated: str
    trend: str
    factors: List[SecurityScoreFactor]

class BadgeOut(BaseModel):
    name: str
    icon: str
    earned_date: str
    description: str

class EmployeeDashboardOut(BaseModel):
    user: UserOut
    security_score: SecurityScoreBreakdownOut
    active_modules: List[TrainingModuleOut]
    recent_simulations: List[PhishingTargetOut]
    badges: List[BadgeOut]
    quick_tips: List[str]

class DepartmentStat(BaseModel):
    department: str
    employee_count: int
    avg_score: int
    click_rate: float

class RecentActivity(BaseModel):
    id: str
    timestamp: str
    description: str
    type: str
    user: str

class AdminDashboardOut(BaseModel):
    total_employees: int
    average_security_score: int
    phishing_click_rate: float
    training_completion_rate: float
    active_campaigns_count: int
    high_risk_employee_count: int
    department_stats: List[DepartmentStat]
    recent_campaigns: List[PhishingCampaignOut]
    recent_activity: List[RecentActivity]
