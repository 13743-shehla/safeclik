import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  BookOpen,
  MailWarning,
  Users,
  BarChart3,
  Search,
  User,
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Badge } from './Badge';

export const Sidebar: React.FC = () => {
  const { user, role } = useAuth();
  const isAdmin = role === 'ADMIN';

  const employeeLinks = [
    { to: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { to: '/security-score', label: 'Security Score', icon: ShieldCheck, badge: user?.security_score ? `${user.security_score}` : '84' },
    { to: '/training', label: 'Training Modules', icon: BookOpen, badge: '4' },
    { to: '/simulations', label: 'Phishing Drills', icon: MailWarning },
    { to: '/profile', label: 'My Profile & Badges', icon: User },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Executive Overview', icon: LayoutDashboard },
    { to: '/admin/employees', label: 'Employees & Risk', icon: Users, badge: '64' },
    { to: '/admin/campaigns', label: 'Phishing Campaigns', icon: MailWarning, badge: 'Live' },
    { to: '/admin/trainings', label: 'Curriculum Mgmt', icon: BookOpen },
    { to: '/admin/reports', label: 'Security Analytics', icon: BarChart3 },
    { to: '/admin/osint', label: 'OSINT Exposure Audit', icon: Search },
  ];

  const links = isAdmin ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 bg-slate-900/90 border-r border-slate-800 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 shrink-0 select-none">
      
      {/* Top: Portal mode identifier & nav items */}
      <div className="p-4 space-y-6">
        
        {/* Portal status header */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isAdmin ? 'bg-purple-400' : 'bg-cyan-400'}`} />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Portal Mode</p>
              <p className="text-xs font-bold text-white tracking-wide">
                {isAdmin ? 'CISO Administration' : 'Employee Cyber Defense'}
              </p>
            </div>
          </div>
          <Badge variant={isAdmin ? 'purple' : 'cyan'} size="sm">
            {isAdmin ? 'ADMIN' : 'STAFF'}
          </Badge>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard' || item.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? isAdmin
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Demo educational phishing catch preview & user pill */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        {/* Quick test simulation landing page button */}
        <NavLink
          to="/phish-test/demo-token-123"
          className="flex items-center gap-2.5 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 hover:border-rose-600/60 text-rose-300 hover:text-rose-200 text-xs transition-all"
        >
          <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
          <div className="flex-1 truncate">
            <p className="font-semibold leading-tight">Phish Catch Landing</p>
            <p className="text-[10px] text-rose-400/80">Simulated Link Trap Page</p>
          </div>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </NavLink>

        {/* User profile footer */}
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
            {user?.full_name ? user.full_name.charAt(0) : 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user?.full_name || 'Demo User'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.department || 'Acme Corp'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
