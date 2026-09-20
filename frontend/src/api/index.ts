import { apiClient } from './client';

import type {
  User,
  TrainingModule,
  PhishingCampaign,
  OSINTScanResult,
  EmployeeDashboardData,
  AdminDashboardData
} from '../types';

import {
  mockCurrentUserEmployee,
  mockCurrentUserAdmin,
  mockEmployees,
  mockTrainingModules,
  mockPhishingCampaigns,
  mockOSINTScanResult,
  mockEmployeeDashboardData,
  mockAdminDashboardData
} from '../data/mockData';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      return res.data;
    } catch {
      // Fallback for standalone frontend or demo
      const isAdmin = credentials.email.toLowerCase().includes('admin');
      return {
        access_token: isAdmin ? 'demo-jwt-admin-token' : 'demo-jwt-employee-token',
        token_type: 'bearer',
        user: isAdmin ? mockCurrentUserAdmin : mockCurrentUserEmployee,
      };
    }
  },

  register: async (data: any) => {
    try {
      const res = await apiClient.post('/auth/register', data);
      return res.data;
    } catch {
      return {
        access_token: 'demo-jwt-new-user-token',
        token_type: 'bearer',
        user: {
          id: `usr-${Date.now()}`,
          email: data.email,
          full_name: data.full_name,
          department: data.department,
          job_title: data.job_title,
          role: data.role || 'EMPLOYEE',
          created_at: new Date().toISOString(),
          security_score: 75,
          risk_level: 'MEDIUM',
        },
      };
    }
  },

  getMe: async (): Promise<User> => {
    try {
      const res = await apiClient.get<User>('/auth/me');
      return res.data;
    } catch {
      return mockCurrentUserEmployee;
    }
  },
};

export const usersApi = {
  list: async (): Promise<User[]> => {
    try {
      const res = await apiClient.get<User[]>('/users');
      return res.data;
    } catch {
      return mockEmployees;
    }
  },

  create: async (data: Partial<User>): Promise<User> => {
    try {
      const res = await apiClient.post<User>('/users', data);
      return res.data;
    } catch {
      return {
        id: `usr-${Date.now()}`,
        email: data.email || 'user@company.com',
        full_name: data.full_name || 'New Employee',
        role: data.role || 'EMPLOYEE',
        department: data.department || 'Operations',
        job_title: data.job_title || 'Specialist',
        created_at: new Date().toISOString(),
        security_score: 70,
        risk_level: 'MEDIUM',
      };
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch {
      console.log(`Mock delete user ${id}`);
    }
  },
};

export const trainingsApi = {
  list: async (): Promise<TrainingModule[]> => {
    try {
      const res = await apiClient.get<TrainingModule[]>('/trainings');
      return res.data;
    } catch {
      return mockTrainingModules;
    }
  },

  getById: async (id: string): Promise<TrainingModule> => {
    try {
      const res = await apiClient.get<TrainingModule>(`/trainings/${id}`);
      return res.data;
    } catch {
      return mockTrainingModules.find((m) => m.id === id) || mockTrainingModules[0];
    }
  },

  updateProgress: async (moduleId: string, lessonId: string) => {
    try {
      const res = await apiClient.post(`/trainings/${moduleId}/progress`, { lesson_id: lessonId });
      return res.data;
    } catch {
      return { success: true };
    }
  },
};

export const quizzesApi = {
  submit: async (moduleId: string, answers: Record<string, number>) => {
    try {
      const res = await apiClient.post(`/quizzes/${moduleId}/submit`, { answers });
      return res.data;
    } catch {
      return {
        score: 100,
        passed: true,
        points_awarded: 8,
        badge_awarded: 'Certified Defender',
      };
    }
  },
};

export const phishingApi = {
  listCampaigns: async (): Promise<PhishingCampaign[]> => {
    try {
      const res = await apiClient.get<PhishingCampaign[]>('/phishing/campaigns');
      return res.data;
    } catch {
      return mockPhishingCampaigns;
    }
  },

  createCampaign: async (campaign: Partial<PhishingCampaign>): Promise<PhishingCampaign> => {
    try {
      const res = await apiClient.post<PhishingCampaign>('/phishing/campaigns', campaign);
      return res.data;
    } catch {
      return {
        id: `camp-${Date.now()}`,
        title: campaign.title || 'New Simulation Drill',
        scenario_type: campaign.scenario_type || 'Urgent CEO Wire',
        sender_name: campaign.sender_name || 'Corporate IT',
        sender_email: campaign.sender_email || 'it-alert@company-verify.net',
        email_subject: campaign.email_subject || 'Urgent Security Action Required',
        email_body_template: 'Drill body',
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
        target_count: 24,
        opened_count: 6,
        clicked_count: 1,
        reported_count: 8,
        click_rate: 4.1,
        report_rate: 33.3,
      };
    }
  },

  reportSimulation: async (token: string) => {
    try {
      const res = await apiClient.post('/phishing/report', { token });
      return res.data;
    } catch {
      return { success: true, message: 'Simulated phish reported successfully' };
    }
  },

  recordClick: async (token: string) => {
    try {
      const res = await apiClient.get(`/phishing/simulate/click/${token}`);
      return res.data;
    } catch {
      return { success: true };
    }
  },
};

export const dashboardApi = {
  getEmployeeData: async (): Promise<EmployeeDashboardData> => {
    try {
      const res = await apiClient.get<EmployeeDashboardData>('/dashboard/employee');
      return res.data;
    } catch {
      return mockEmployeeDashboardData;
    }
  },

  getAdminData: async (): Promise<AdminDashboardData> => {
    try {
      const res = await apiClient.get<AdminDashboardData>('/dashboard/admin');
      return res.data;
    } catch {
      return mockAdminDashboardData;
    }
  },
};

export const osintApi = {
  scanDomain: async (domain: string): Promise<OSINTScanResult> => {
    try {
      const res = await apiClient.post<OSINTScanResult>('/osint/scan-domain', { domain });
      return res.data;
    } catch {
      return {
        ...mockOSINTScanResult,
        domain,
        scan_date: new Date().toISOString(),
      };
    }
  },
};
