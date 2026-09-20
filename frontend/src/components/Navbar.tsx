import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, LogOut, LayoutDashboard, Terminal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from './Badge';

export const Navbar: React.FC = () => {
  const { user, role, switchRole, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              Safe<span className="text-cyan-400">Click</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 ml-1">v2.4</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono">ENTERPRISE DEFENSE</span>
          </div>
        </Link>

        {/* Navigation links (desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Overview</Link>
          <a href="/#features" className="hover:text-cyan-400 transition-colors">Capabilities</a>
          <a href="/#simulation-preview" className="hover:text-cyan-400 transition-colors">Simulation Lab</a>
          <Link to="/admin/osint" className="hover:text-cyan-400 transition-colors">OSINT Audit</Link>
        </nav>

        {/* Right action area */}
        <div className="flex items-center gap-3">
          {/* Quick Role Switcher for Demo / Presentation */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono">Role:</span>
              <button
                onClick={() => {
                  switchRole('EMPLOYEE');
                  navigate('/dashboard');
                }}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  role === 'EMPLOYEE'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Employee
              </button>
              <button
                onClick={() => {
                  switchRole('ADMIN');
                  navigate('/admin');
                }}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  role === 'ADMIN'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin CISO
              </button>
            </div>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={role === 'ADMIN' ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">{user?.full_name}</span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg border border-transparent hover:border-slate-800 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-md shadow-cyan-500/20 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
