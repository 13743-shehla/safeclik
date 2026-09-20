import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DashboardLayout } from './components/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { SimulationCatchPage } from './pages/public/SimulationCatchPage';

// Employee Pages
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { SecurityScorePage } from './pages/employee/SecurityScorePage';
import { TrainingModulesPage } from './pages/employee/TrainingModulesPage';
import { ModuleDetailPage } from './pages/employee/ModuleDetailPage';
import { QuizTakingPage } from './pages/employee/QuizTakingPage';
import { PhishingSimulationsPage } from './pages/employee/PhishingSimulationsPage';
import { ProfilePage } from './pages/employee/ProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { EmployeesPage } from './pages/admin/EmployeesPage';
import { AdminCampaignsPage } from './pages/admin/AdminCampaignsPage';
import { CampaignDetailPage } from './pages/admin/CampaignDetailPage';
import { AdminTrainingsPage } from './pages/admin/AdminTrainingsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { OSINTPage } from './pages/admin/OSINTPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/phish-test/:token" element={<SimulationCatchPage />} />

          {/* Employee Portal Routes (Wrapped in DashboardLayout) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/security-score" element={<SecurityScorePage />} />
            <Route path="/training" element={<TrainingModulesPage />} />
            <Route path="/training/:id" element={<ModuleDetailPage />} />
            <Route path="/quiz/:moduleId" element={<QuizTakingPage />} />
            <Route path="/simulations" element={<PhishingSimulationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Admin Portal Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<EmployeesPage />} />
            <Route path="/admin/campaigns" element={<AdminCampaignsPage />} />
            <Route path="/admin/campaigns/:id" element={<CampaignDetailPage />} />
            <Route path="/admin/trainings" element={<AdminTrainingsPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/osint" element={<OSINTPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
