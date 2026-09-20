from pydantic import BaseModel
from typing import List, Optional

class OSINTScanRequest(BaseModel):
    domain: str

class MailSecurityInfo(BaseModel):
    spf_record: bool
    dmarc_record: bool
    mx_records_found: bool
    details: str

class OSINTScanOut(BaseModel):
    domain: str
    scan_date: str
    exposure_score: int
    risk_level: str
    mail_security: MailSecurityInfo
    exposed_credentials_sample: int
    public_employee_profiles: int
    vulnerability_indicators: List[str]
    recommendations: List[str]
