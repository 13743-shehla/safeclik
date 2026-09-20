import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockCurrentUserEmployee, mockCurrentUserAdmin } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, pass: string, preferredRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; full_name: string; department: string; job_title: string; password: string; role?: UserRole }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isBackendConnected: boolean;
  setIsBackendConnected: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('safeclick_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return mockCurrentUserEmployee;
      }
    }
    // Default to Employee demo user on first load
    return mockCurrentUserEmployee;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('safeclick_token') || 'demo-mock-jwt-token';
  });

  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('safeclick_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('safeclick_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('safeclick_token', token);
    } else {
      localStorage.removeItem('safeclick_token');
    }
  }, [token]);

  const login = async (email: string, _pass: string, preferredRole?: UserRole) => {
    // If backend is active, this can call the real API; for mock/demo, intelligently match email or role
    if (email.toLowerCase().includes('admin') || preferredRole === 'ADMIN') {
      setUser(mockCurrentUserAdmin);
      setToken('demo-jwt-admin-token');
      return { success: true };
    }
    setUser(mockCurrentUserEmployee);
    setToken('demo-jwt-employee-token');
    return { success: true };
  };

  const register = async (data: { email: string; full_name: string; department: string; job_title: string; password: string; role?: UserRole }) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: data.email,
      full_name: data.full_name,
      department: data.department || 'Operations',
      job_title: data.job_title || 'Associate',
      role: data.role || 'EMPLOYEE',
      created_at: new Date().toISOString(),
      security_score: 75,
      risk_level: 'MEDIUM',
    };
    setUser(newUser);
    setToken(`demo-token-${newUser.id}`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('safeclick_user');
    localStorage.removeItem('safeclick_token');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'ADMIN') {
      setUser(mockCurrentUserAdmin);
      setToken('demo-jwt-admin-token');
    } else {
      setUser(mockCurrentUserEmployee);
      setToken('demo-jwt-employee-token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        token,
        login,
        register,
        logout,
        switchRole,
        isBackendConnected,
        setIsBackendConnected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
