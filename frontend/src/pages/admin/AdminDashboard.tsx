import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  MailWarning,
  BookOpen,
  TrendingDown,
  TrendingUp,
  Plus,
  ArrowRight,
  ExternalLink,
  Activity,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { mockAdminDashboardData } from '../../data/mockData';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';

export const AdminDashboard: React.FC = () => {
  const data = mockAdminDashboardData;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="cyber-card p-6 bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="sm" dot>EXECUTIVE CISO CONSOLE</Badge>
            <span className="text-xs text-slate-400 font-mono">Acme Corporation &bull; Q3 Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Organizational Cyber Defense Posture
          </h1>
          <p className="text-xs text-slate-400">
            Real-time telemetry across employee vulnerability, simulation resilience, and mandatory training compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/campaigns"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Simulation Campaign</span>
          </Link>
          <Link
            to="/admin/osint"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-purple-500/50 text-purple-300 text-xs font-semibold transition-colors"
          >
            Run OSINT Audit
          </Link>
        </div>
      </div>

      {/* High-Level Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Company Security Score"
          value={`${data.average_security_score}/100`}
          subtitle="Target: 85+ by end of Q3"
          icon={ShieldAlert}
          colorScheme="cyan"
          trend={{ value: '+4.2%', isPositive: true, label: '30-day gain' }}
        />
        <StatCard
          title="Phishing Click Susceptibility"
          value={`${data.phishing_click_rate}%`}
          subtitle="Industry avg: 18.5%"
          icon={MailWarning}
          colorScheme="rose"
          trend={{ value: '-6.8%', isPositive: true, label: 'improved resilience' }}
        />
        <StatCard
          title="Training Completion"
          value={`${data.training_completion_rate}%`}
          subtitle="50 of 64 active staff"
          icon={BookOpen}
          colorScheme="emerald"
          trend={{ value: '+12%', isPositive: true, label: 'this cycle' }}
        />
        <StatCard
          title="High-Risk Employees"
          value={data.high_risk_employee_count}
          subtitle="Require targeted coaching"
          icon={Users}
          colorScheme="amber"
          trend={{ value: 'Down from 9', isPositive: true, label: 'last month' }}
        />
      </div>

      {/* Grid: Department Risk Matrix & Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Breakdown Table (2 cols) */}
        <div className="lg:col-span-2 cyber-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Departmental Risk & Resilience Matrix</h2>
              <p className="text-xs text-slate-400">Departmental breakdown of average hygiene score and phishing vulnerability</p>
            </div>
            <Link to="/admin/employees" className="text-xs text-cyan-400 hover:underline font-semibold">
              View Employees &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Headcount</th>
                  <th className="py-2.5 px-3">Average Score</th>
                  <th className="py-2.5 px-3">Phishing Click Rate</th>
                  <th className="py-2.5 px-3">Risk Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {data.department_stats.map((dept, idx) => {
                  const isHighRisk = dept.click_rate > 15;
                  const isLowRisk = dept.avg_score >= 80;

                  return (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">
                        {dept.department}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400">
                        {dept.employee_count} staff
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white">{dept.avg_score}</span>
                          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isLowRisk ? 'bg-emerald-400' : isHighRisk ? 'bg-rose-400' : 'bg-cyan-400'
                              }`}
                              style={{ width: `${dept.avg_score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono">
                        <span className={isHighRisk ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                          {dept.click_rate}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {isLowRisk ? (
                          <Badge variant="emerald" size="sm">RESILIENT</Badge>
                        ) : isHighRisk ? (
                          <Badge variant="rose" size="sm" dot>VULNERABLE</Badge>
                        ) : (
                          <Badge variant="amber" size="sm">MODERATE</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Simulation Campaigns Box */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MailWarning className="w-4 h-4 text-purple-400" />
              <span>Simulation Campaigns</span>
            </h2>
            <Badge variant="purple" size="sm">2 ACTIVE</Badge>
          </div>

          <div className="space-y-3">
            {data.recent_campaigns.map((camp) => (
              <div key={camp.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-white">{camp.title}</h3>
                    <p className="text-[10px] text-slate-400">{camp.scenario_type}</p>
                  </div>
                  <Badge variant={camp.status === 'ACTIVE' ? 'purple' : 'slate'} size="sm">
                    {camp.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[10px]">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Targets</span>
                    <span className="font-bold text-white">{camp.target_count}</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Clicked</span>
                    <span className="font-bold text-rose-400">{camp.click_rate}%</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block">Reported</span>
                    <span className="font-bold text-emerald-400">{camp.report_rate}%</span>
                  </div>
                </div>

                <Link
                  to={`/admin/campaigns/${camp.id}`}
                  className="w-full mt-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Detailed Analytics</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Real-time Security Event Stream */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Security Activity Stream</span>
            </h2>
            <p className="text-xs text-slate-400">Live employee simulation engagements and course completions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.recent_activity.map((act) => (
            <div key={act.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">{act.timestamp}</span>
                {act.type === 'report' && <Badge variant="emerald" size="sm">REPORTED</Badge>}
                {act.type === 'click' && <Badge variant="rose" size="sm">CLICKED</Badge>}
                {act.type === 'complete' && <Badge variant="cyan" size="sm">PASSED</Badge>}
                {act.type === 'campaign' && <Badge variant="purple" size="sm">DRILL DISPATCH</Badge>}
              </div>
              <p className="text-xs font-semibold text-white leading-tight">{act.description}</p>
              <p className="text-[11px] text-slate-400">{act.user}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
