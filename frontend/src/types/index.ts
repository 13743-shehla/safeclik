export type UserRole = 'ADMIN' | 'EMPLOYEE';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED';
export type SimulationStatus = 'SENT' | 'OPENED' | 'CLICKED' | 'REPORTED';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department: string;
  job_title: string;
  created_at: string;
  avatar_url?: string;
  security_score?: number;
  risk_level?: RiskLevel;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string;
  order_index: number;
  key_takeaways: string[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer_index: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  module_id: string;
  passing_score: number;
  questions: QuizQuestion[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'Phishing' | 'Passwords' | 'Social Engineering' | 'Ransomware' | 'Remote Work';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_minutes: number;
  badge_name: string;
  icon: string;
  lessons: Lesson[];
  quiz?: Quiz;
  completed?: boolean;
  score?: number;
}

export interface PhishingCampaign {
  id: string;
  title: string;
  scenario_type: 'Urgent CEO Wire' | 'IT Password Reset' | 'Microsoft 365 Shared Document' | 'HR Payroll Notice' | 'Fake Shipping Invoice';
  email_subject: string;
  sender_name: string;
  sender_email: string;
  email_body_template: string;
  status: CampaignStatus;
  created_at: string;
  target_count: number;
  opened_count: number;
  clicked_count: number;
  reported_count: number;
  click_rate: number;
  report_rate: number;
}

export interface PhishingTarget {
  id: string;
  campaign_id: string;
  campaign_title?: string;
  user_id: string;
  user_name: string;
  user_email: string;
  department: string;
  status: SimulationStatus;
  tracking_token: string;
  sent_at: string;
  interacted_at?: string;
}

export interface SecurityScoreBreakdown {
  overall: number;
  risk_level: RiskLevel;
  training_score: number;
  phishing_resilience: number;
  incident_reporting_rate: number;
  last_updated: string;
  trend: '+4' | '-2' | '+8' | '0' | string;
  factors: {
    name: string;
    score: number;
    weight: string;
    status: 'good' | 'warning' | 'danger';
    description: string;
  }[];
}

export interface OSINTScanResult {
  domain: string;
  scan_date: string;
  exposure_score: number; // 0-100 (higher means more exposed)
  risk_level: RiskLevel;
  mail_security: {
    spf_record: boolean;
    dmarc_record: boolean;
    mx_records_found: boolean;
    details: string;
  };
  exposed_credentials_sample: number;
  public_employee_profiles: number;
  vulnerability_indicators: string[];
  recommendations: string[];
}

export interface EmployeeDashboardData {
  user: User;
  security_score: SecurityScoreBreakdown;
  active_modules: TrainingModule[];
  recent_simulations: PhishingTarget[];
  badges: { name: string; icon: string; earned_date: string; description: string }[];
  quick_tips: string[];
}

export interface AdminDashboardData {
  total_employees: number;
  average_security_score: number;
  phishing_click_rate: number;
  training_completion_rate: number;
  active_campaigns_count: number;
  high_risk_employee_count: number;
  department_stats: {
    department: string;
    employee_count: number;
    avg_score: number;
    click_rate: number;
  }[];
  recent_campaigns: PhishingCampaign[];
  recent_activity: {
    id: string;
    timestamp: string;
    description: string;
    type: 'click' | 'report' | 'complete' | 'campaign';
    user: string;
  }[];
}
