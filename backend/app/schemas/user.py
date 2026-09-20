from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str
    full_name: str
    department: Optional[str] = "General"
    job_title: Optional[str] = "Staff"
    role: Optional[str] = "EMPLOYEE"

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    department: Optional[str] = None
    job_title: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None

class UserOut(UserBase):
    id: str
    created_at: Optional[datetime] = None
    avatar_url: Optional[str] = None
    security_score: Optional[int] = 75
    risk_level: Optional[str] = "MEDIUM"

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

class LoginRequest(BaseModel):
    email: str
    password: str
