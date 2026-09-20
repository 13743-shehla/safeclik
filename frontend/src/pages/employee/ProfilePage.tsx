import React, { useState } from 'react';
import {
  User as UserIcon,
  Mail,
  Building,
  Briefcase,
  ShieldCheck,
  KeyRound,
  Award,
  CheckCircle2,
  Bell,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockEmployeeDashboardData } from '../../data/mockData';
import { Badge } from '../../components/Badge';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const badges = mockEmployeeDashboardData.badges;

  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Personal Security Profile</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your enterprise credentials, identity safeguards, and defense credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Identity Card */}
        <div className="cyber-card p-6 border-slate-800 space-y-4 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/20">
            {user?.full_name ? user.full_name.charAt(0) : 'A'}
          </div>

          <div>
            <h2 className="text-base font-bold text-white">{user?.full_name || 'Alex Rivera'}</h2>
            <p className="text-xs text-slate-400">{user?.job_title || 'Senior Financial Analyst'}</p>
            <div className="mt-2 flex justify-center">
              <Badge variant="cyan" size="sm">
                {user?.role || 'EMPLOYEE'}
              </Badge>
            </div>
          </div>

          <div className="w-full border-t border-slate-800/80 pt-4 text-left space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-slate-500" />
              <span className="truncate">{user?.email || 'alex.rivera@acmecorp.com'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Building className="w-4 h-4 text-slate-500" />
              <span>{user?.department || 'Finance & Accounting'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Hardware Token MFA Enrolled</span>
            </div>
          </div>
        </div>

        {/* Change Password / Security Controls (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>Update Corporate Password</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Password last changed 82 days ago. Minimum 14 characters recommended.
                </p>
              </div>
            </div>

            {passwordSaved && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Password updated successfully! Score boosted.</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">New Passphrase</label>
                  <input
                    type="password"
                    required
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    placeholder="e.g. coral-mountain-tiger-42"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Confirm New Passphrase</label>
                  <input
                    type="password"
                    required
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                Save New Password
              </button>
            </form>
          </div>

          {/* Defense Badges */}
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Cyber Defense Badges (3 Earned)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center space-y-1.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-white">{b.name}</p>
                  <p className="text-[10px] text-slate-400">{b.description}</p>
                  <span className="inline-block text-[9px] font-mono text-amber-400 uppercase pt-1">
                    Awarded {b.earned_date}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
