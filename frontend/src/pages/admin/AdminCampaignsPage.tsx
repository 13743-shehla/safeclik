import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MailWarning,
  Plus,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Send,
  Users,
  Eye,
  FileText
} from 'lucide-react';
import { mockPhishingCampaigns } from '../../data/mockData';
import { PhishingCampaign } from '../../types';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';

export const AdminCampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<PhishingCampaign[]>(mockPhishingCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // New Campaign Form State
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    scenario_type: 'Urgent CEO Wire' as PhishingCampaign['scenario_type'],
    target_group: 'Finance & Accounting',
    sender_name: 'David Sterling (CEO)',
    sender_email: 'd.sterling.acme@exec-corp-secure.net',
    email_subject: 'URGENT: Confidential Escrow Wire Required Today',
  });

  const scenarioTemplates: Record<string, { sender_name: string; sender_email: string; subject: string }> = {
    'Urgent CEO Wire': {
      sender_name: 'David Sterling (CEO)',
      sender_email: 'd.sterling.acme@exec-corp-secure.net',
      subject: 'URGENT: Confidential Escrow Wire Required Today',
    },
    'IT Password Reset': {
      sender_name: 'IT Support Service Desk',
      sender_email: 'helpdesk@m365-security-portal.com',
      subject: 'Urgent: Password Expiration within 24 Hours',
    },
    'Microsoft 365 Shared Document': {
      sender_name: 'Microsoft SharePoint Notifications',
      sender_email: 'no-reply@sharepoint-cloud-docs.net',
      subject: 'Elena Rostova shared "Q3_Financial_Projections.xlsx" with you',
    },
    'HR Payroll Notice': {
      sender_name: 'Corporate Payroll Services',
      sender_email: 'payroll-update@acme-corp-portal.com',
      subject: 'ACTION REQUIRED: Verify Banking Details for Direct Deposit',
    },
    'Fake Shipping Invoice': {
      sender_name: 'Global Express Logistics',
      sender_email: 'billing-notice@fedex-tracking-parcel.com',
      subject: 'Overdue Delivery Invoice #FX-98241',
    },
  };

  const handleScenarioChange = (type: PhishingCampaign['scenario_type']) => {
    const template = scenarioTemplates[type];
    setNewCampaign({
      ...newCampaign,
      scenario_type: type,
      sender_name: template.sender_name,
      sender_email: template.sender_email,
      email_subject: template.subject,
    });
  };

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PhishingCampaign = {
      id: `camp-${Date.now()}`,
      title: newCampaign.title || `${newCampaign.scenario_type} Drill`,
      scenario_type: newCampaign.scenario_type,
      sender_name: newCampaign.sender_name,
      sender_email: newCampaign.sender_email,
      email_subject: newCampaign.email_subject,
      email_body_template: 'Automated phishing simulation template payload',
      status: 'ACTIVE',
      created_at: new Date().toISOString(),
      target_count: 18,
      opened_count: 5,
      clicked_count: 0,
      reported_count: 4,
      click_rate: 0.0,
      report_rate: 22.2,
    };

    setCampaigns([created, ...campaigns]);
    setIsModalOpen(false);
    setNotification(`Simulation drill "${created.title}" launched to ${newCampaign.target_group} department!`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Phishing Simulation Campaigns</h1>
            <Badge variant="purple" size="sm" dot>CONTROLLED SIMULATOR</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Safely test workforce resilience against real-world social engineering and credential harvesting attacks.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Drill Campaign</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="cyber-card cyber-card-hover p-6 border-slate-800 bg-slate-900/90 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase">
                    {camp.scenario_type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5 leading-snug">{camp.title}</h3>
                </div>
                <Badge variant={camp.status === 'ACTIVE' ? 'purple' : 'slate'} size="sm" dot={camp.status === 'ACTIVE'}>
                  {camp.status}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <p className="text-slate-400 text-[11px] truncate">
                  <strong className="text-slate-300">From:</strong> {camp.sender_name}
                </p>
                <p className="text-slate-400 text-[11px] truncate">
                  <strong className="text-slate-300">Subject:</strong> {camp.email_subject}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">TARGETS</span>
                  <span className="font-bold text-white text-sm">{camp.target_count}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">CLICKED</span>
                  <span className="font-bold text-rose-400 text-sm">{camp.click_rate}%</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">REPORTED</span>
                  <span className="font-bold text-emerald-400 text-sm">{camp.report_rate}%</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {new Date(camp.created_at).toLocaleDateString()}
              </span>

              <Link
                to={`/admin/campaigns/${camp.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>Analytics & Drill Targets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Campaign Creator Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Launch Simulated Phishing Drill"
        subtitle="Configure realistic phishing payload safely delivered through the SafeClick engine"
        maxWidth="xl"
      >
        <form onSubmit={handleLaunchCampaign} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Campaign Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Q3 Executive Wire Transfer Stress-Test"
              value={newCampaign.title}
              onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Scenario Template</label>
              <select
                value={newCampaign.scenario_type}
                onChange={(e) => handleScenarioChange(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Urgent CEO Wire">Urgent CEO Wire (BEC)</option>
                <option value="IT Password Reset">IT Password Reset Notice</option>
                <option value="Microsoft 365 Shared Document">Microsoft 365 SharePoint</option>
                <option value="HR Payroll Notice">HR Payroll & Direct Deposit</option>
                <option value="Fake Shipping Invoice">Fake Shipping Invoice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Target Audience</label>
              <select
                value={newCampaign.target_group}
                onChange={(e) => setNewCampaign({ ...newCampaign, target_group: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="All Employees">All Employees (Company-Wide)</option>
                <option value="Finance & Accounting">Finance & Accounting Only</option>
                <option value="Human Resources">Human Resources Only</option>
                <option value="Engineering">Engineering Only</option>
                <option value="Sales & Marketing">Sales & Marketing Only</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-purple-400">Simulation Email Preview</h4>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Sender Display Name & Email</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newCampaign.sender_name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, sender_name: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={newCampaign.sender_email}
                  onChange={(e) => setNewCampaign({ ...newCampaign, sender_email: e.target.value })}
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-rose-400 font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Subject Line</label>
              <input
                type="text"
                value={newCampaign.email_subject}
                onChange={(e) => setNewCampaign({ ...newCampaign, email_subject: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Campaign</span>
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
