# SafeClick — Project Plan & Architecture

SafeClick is an enterprise cybersecurity awareness and phishing simulation platform designed for modern organizations.

---

## 1. System Architecture

```text
safeclick/
├── frontend/             # React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── api/          # Axios HTTP client & endpoint service definitions
│   │   ├── components/   # Reusable UI (Navbar, Sidebar, Modal, Badge, StatCard, etc.)
│   │   ├── context/      # AuthContext & Notification state
│   │   ├── data/         # Realistic mock data for mock/dev mode
│   │   ├── pages/
│   │   │   ├── public/   # Landing, Login, Register, Simulation Catch Page
│   │   │   ├── employee/ # Overview, Security Score, Training Modules, Simulations, Profile
│   │   │   └── admin/    # Overview, Employees, Training Mgmt, Phishing Campaigns, Analytics, OSINT
│   │   ├── types/        # TypeScript interfaces & domain models
│   │   └── utils/        # Scoring algorithm & formatting utilities
├── backend/              # Python FastAPI + SQLAlchemy + Pydantic + SQLite/PostgreSQL
│   ├── app/
│   │   ├── api/          # Route handlers (/auth, /users, /trainings, /quizzes, /phishing, /dashboard, /osint)
│   │   ├── core/         # Config, security (JWT/bcrypt), database session
│   │   ├── models/       # SQLAlchemy ORM models
│   │   ├── schemas/      # Pydantic validation schemas
│   │   ├── services/     # Business logic (score calculation, phishing simulator, OSINT analyzer)
│   │   └── seed.py       # Seed script with realistic companies, employees, campaigns, quizzes
├── README.md
└── PROJECT_PLAN.md
```

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Cyber Dark/Light palette (slate-900, emerald-500, cyan-500, rose-500)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Data Visualization**: Recharts / Chart.js
- **HTTP Client**: Axios with JWT interceptors & Mock Fallback toggle

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ORM & DB**: SQLAlchemy 2.0 + Alembic (PostgreSQL compatible, SQLite default for zero-friction local run)
- **Auth & Security**: OAuth2 Password Bearer, JWT (python-jose), Password Hashing (passlib/bcrypt)
- **Validation**: Pydantic v2
- **CORS**: FastAPI CORSMiddleware configured for frontend development and production origins

---

## 3. Database Schema

- **User**: `id`, `email`, `hashed_password`, `full_name`, `role` (`ADMIN` | `EMPLOYEE`), `department`, `job_title`, `created_at`
- **TrainingModule**: `id`, `title`, `description`, `category` (Phishing, Password, Social Engineering, Ransomware), `difficulty`, `estimated_minutes`, `badge_name`
- **Lesson**: `id`, `module_id`, `title`, `content_markdown`, `order_index`
- **Quiz**: `id`, `module_id`, `passing_score`
- **QuizQuestion**: `id`, `quiz_id`, `question_text`, `options_json`, `correct_answer_index`, `explanation`
- **QuizAttempt**: `id`, `user_id`, `quiz_id`, `score`, `passed`, `completed_at`
- **TrainingProgress**: `id`, `user_id`, `module_id`, `completed`, `score`, `last_accessed`
- **PhishingCampaign**: `id`, `title`, `scenario_type` (Urgent CEO, Password Reset, Fake Invoice, IT Upgrade), `email_subject`, `email_body_template`, `status` (`DRAFT`, `ACTIVE`, `COMPLETED`), `created_by`, `created_at`
- **PhishingTarget**: `id`, `campaign_id`, `user_id`, `status` (`SENT`, `OPENED`, `CLICKED`, `REPORTED`), `tracking_token`, `sent_at`, `interacted_at`
- **SecurityScore**: `id`, `user_id`, `score` (0-100), `risk_level` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `last_updated`
- **OSINTAnalysisRecord**: `id`, `domain_or_email`, `exposure_score`, `findings_json`, `created_at`

---

## 4. API Endpoints

- **`/api/auth`**:
  - `POST /login` (OAuth2 form / JSON credentials returning JWT token & user profile)
  - `POST /register` (Register new employee / initial admin)
  - `GET /me` (Fetch authenticated user profile)
- **`/api/users`**:
  - `GET /` (Admin: list employees with security scores)
  - `POST /` (Admin: invite / create user)
  - `PUT /{id}` (Update user / department)
  - `DELETE /{id}` (Delete user)
- **`/api/trainings`**:
  - `GET /` (List all training modules with current user completion status)
  - `GET /{id}` (Get module details & lessons)
  - `POST /{id}/progress` (Update lesson progress)
- **`/api/quizzes`**:
  - `GET /{module_id}` (Get quiz questions)
  - `POST /{module_id}/submit` (Submit quiz answers, compute score, update security rating)
- **`/api/phishing`**:
  - `GET /campaigns` (Admin: list campaigns)
  - `POST /campaigns` (Admin: create campaign)
  - `GET /campaigns/{id}/results` (Admin: detailed click rate, report rate, departmental breakdown)
  - `GET /simulate/click/{token}` (Public safe simulation landing page: educational alert when employee clicks fake phishing link)
  - `POST /report` (Employee: report simulated email as phishing)
- **`/api/dashboard`**:
  - `GET /employee` (Personal security score, pending trainings, simulation history, actionable tips)
  - `GET /admin` (Company security score average, phishing susceptibility rate, training completion rate, department risk ranking)
- **`/api/osint`**:
  - `POST /scan-domain` (Safe educational OSINT exposure checker: checks simulated breach exposure, SPF/DMARC posture, email exposure)

---

## 5. Implementation Order

1. **Phase 1 — Frontend First**: Setup Vite React TS Tailwind, build components, public pages, employee portal, admin portal, mock data, charts, responsive UI. Build & verify.
2. **Phase 2 — Backend**: FastAPI modular architecture, SQLAlchemy models, SQLite/PostgreSQL support, JWT auth, RBAC, training/quiz engine, phishing engine, OSINT audit service, rich seed data.
3. **Phase 3 — Integration**: Connect API client, JWT persistence, end-to-end employee & admin workflows.
4. **Phase 4 — Testing & Documentation**: Automated tests, flow validation, comprehensive README.
