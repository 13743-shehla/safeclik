import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MailWarning,
  Users,
  ShieldCheck,
  ShieldAlert,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye
} from 'lucide-react';
import { mockPhishingCampaigns, mockEmployees } from '../../data/mockData';
import { Badge } from '../../components/Badge';

export const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const campaign = mockPhishingCampaigns.find((c) => c.id === id) || mockPhishingCampaigns[0];

  // Realistic sample targets breakdown for this drill
  const [targets, setTargets] = useState([
    {
      id: 'tgt-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@acmecorp.com',
      department: 'Finance & Accounting',
      status: 'REPORTED' as const,
      response_time: '17 mins',
      token: 'tok-q3-payroll-alex',
    },
    {
      id: 'tgt-2',
      name: 'Tariq Mansoor',
      email: 'tariq.mansoor@acmecorp.com',
      department: 'Finance & Accounting',
      status: 'CLICKED' as const,
      response_time: '4 mins',
      token: 'tok-q3-payroll-tariq',
    },
    {
      id: 'tgt-3',
      name: 'Elena Rostova',
      email: 'elena.rostova@acmecorp.com',
      department: 'Engineering',
      status: 'REPORTED' as const,
      response_time: '9 mins',
      token: 'tok-q3-payroll-elena',
    },
    {
      id: 'tgt-4',
      name: 'Marcus Vance',
      email: 'marcus.vance@acmecorp.com',
      department: 'Human Resources',
      status: 'CLICKED' as const,
      response_time: '12 mins',
      token: 'tok-q3-payroll-marcus',
    },
    {
      id: 'tgt-5',
      name: 'Chloe Dupont',
      email: 'chloe.dupont@acmecorp.com',
      department: 'Legal & Compliance',
      status: 'REPORTED' as const,
      response_time: '22 mins',
      token: 'tok-q3-payroll-chloe',
    },
    {
      id: 'tgt-6',
      name: 'David Kim',
      email: 'david.kim@acmecorp.com',
      department: 'Sales & Marketing',
      status: 'SENT' as const,
      response_time: 'Unopened',
      token: 'tok-q3-payroll-david',
    },
  ]);

  return (
    <div className="space-y-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/campaigns"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campaigns</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant={campaign.status === 'ACTIVE' ? 'purple' : 'slate'} size="sm" dot>
            {campaign.status}
          </Badge>
          <span className="text-xs text-slate-500 font-mono">ID: {campaign.id}</span>
        </div>
      </div>

      {/* Campaign Overview Banner */}
      <div className="cyber-card p-6 border-slate-800 bg-slate-900/90 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400">
              Scenario: {campaign.scenario_type}
            </span>
            <h1 className="text-2xl font-black text-white mt-0.5">{campaign.title}</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              From: {campaign.sender_name} &lt;{campaign.sender_email}&gt;
            </p>
          </div>

          <Link
            to="/phish-test/preview-catch"
            className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-rose-500 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>View Educational Catch Page</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>

        {/* Big Telemetry Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Dispatched</span>
            <span className="text-2xl font-bold text-white mt-1 block">{campaign.target_count}</span>
            <span className="text-[10px] text-slate-500">100% Delivery rate</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Opened Emails</span>
            <span className="text-2xl font-bold text-cyan-400 mt-1 block">{campaign.opened_count}</span>
            <span className="text-[10px] text-slate-500">{Math.round((campaign.opened_count / campaign.target_count) * 100)}% Opened</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Trapped Clicks</span>
            <span className="text-2xl font-bold text-rose-400 mt-1 block">{campaign.clicked_count}</span>
            <span className="text-[10px] text-rose-400/80 font-bold">{campaign.click_rate}% Click rate</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Reported to SOC</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">{campaign.reported_count}</span>
            <span className="text-[10px] text-emerald-400/80 font-bold">{campaign.report_rate}% Resilience</span>
          </div>
        </div>
      </div>

      {/* Target Response Log Table */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Target Telemetry & Employee Interactions</h2>
            <p className="text-xs text-slate-400">Granular log of how individual recipients responded to this simulated attack</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Employee</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Outcome</th>
                <th className="py-2.5 px-3">Reaction Time</th>
                <th className="py-2.5 px-3">Educational Catch Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {targets.map((tgt) => (
                <tr key={tgt.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <p className="font-semibold text-white">{tgt.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{tgt.email}</p>
                  </td>

                  <td className="py-3 px-3 text-slate-300">
                    {tgt.department}
                  </td>

                  <td className="py-3 px-3">
                    {tgt.status === 'REPORTED' && (
                      <Badge variant="emerald" size="sm" dot>REPORTED PHISH (SAFE)</Badge>
                    )}
                    {tgt.status === 'CLICKED' && (
                      <Badge variant="rose" size="sm" dot>CLICKED PHISH (TRAPPED)</Badge>
                    )}
                    {tgt.status === 'SENT' && (
                      <Badge variant="slate" size="sm">UNOPENED / PENDING</Badge>
                    )}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-400">
                    {tgt.response_time}
                  </td>

                  <td className="py-3 px-3 font-mono">
                    <Link
                      to={`/phish-test/${tgt.token}`}
                      className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>Simulation Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
