import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MailWarning,
  ShieldCheck,
  AlertTriangle,
  Send,
  CheckCircle2,
  Eye,
  ExternalLink,
  ShieldAlert,
  Info,
  Sparkles
} from 'lucide-react';
import { mockEmployeeSimulations, mockPhishingCampaigns } from '../../data/mockData';
import { Badge } from '../../components/Badge';

export const PhishingSimulationsPage: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState(mockPhishingCampaigns[0]);
  const [drillStatus, setDrillStatus] = useState<'IDLE' | 'REPORTED' | 'CLICKED'>('IDLE');
  const [hoverLink, setHoverLink] = useState(false);

  const handleReport = () => {
    setDrillStatus('REPORTED');
  };

  const handleSimulatedClick = () => {
    setDrillStatus('CLICKED');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Phishing Simulation Drills</h1>
            <Badge variant="emerald" size="sm" dot>ZERO-EXPOSURE LAB</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Safe interactive drills deployed by IT to test and strengthen your instinct against deceptive emails.
          </p>
        </div>

        <Link
          to="/phish-test/demo-token-q3"
          className="px-3.5 py-2 rounded-xl bg-rose-950/60 border border-rose-800/60 hover:border-rose-600 text-rose-300 text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>Preview Simulation Catch Landing</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </Link>
      </div>

      {/* Interactive Drill Sandbox */}
      <div className="cyber-card p-6 border-slate-800 bg-slate-900/95 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30">
              <MailWarning className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Interactive Phishing Inbox Trainer</h2>
              <p className="text-[11px] text-slate-400">Can you spot the red flags in this email?</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReport}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Report Phish</span>
            </button>
          </div>
        </div>

        {/* Status Alert if user acted */}
        {drillStatus === 'REPORTED' && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-emerald-300 text-sm">Target Neutralized! Excellent Catch!</p>
              <p className="text-slate-300">
                You correctly identified the lookalike domain (<code>@acme-corp-portal.com</code>) and false urgency. You have been awarded <strong>+4 Security Score points</strong>.
              </p>
            </div>
          </div>
        )}

        {drillStatus === 'CLICKED' && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-rose-300 text-sm">Simulated Link Clicked!</p>
              <p className="text-slate-300">
                In a real scenario, this would have taken you to a malicious credential harvester. In SafeClick, you are redirected to the safe learning debrief.
              </p>
              <Link to="/phish-test/tok-q3-payroll-alex" className="text-cyan-400 underline font-semibold mt-1 inline-block">
                View Educational Catch Screen &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Email Viewer Sandbox */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-sans text-xs">
          
          {/* Email Headers */}
          <div className="space-y-1.5 border-b border-slate-800/80 pb-3 font-mono text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span><strong>From:</strong> {selectedDrill.sender_name} &lt;{selectedDrill.sender_email}&gt;</span>
              <span className="text-rose-400">🚩 External Sender</span>
            </div>
            <div className="text-slate-400">
              <span><strong>To:</strong> Alex Rivera &lt;alex.rivera@acmecorp.com&gt;</span>
            </div>
            <div className="text-slate-300 font-bold font-sans text-sm pt-1">
              Subject: {selectedDrill.email_subject}
            </div>
          </div>

          {/* Email Content Body */}
          <div className="text-slate-300 space-y-3 whitespace-pre-line leading-relaxed">
            <p>Hello Alex,</p>
            <p>
              Due to our annual audit, all personnel must re-verify their direct deposit routing details before Friday 5:00 PM to ensure salary payments are not paused.
            </p>
            <p>
              Please access the employee compensation gateway immediately to confirm your profile:
            </p>

            <div className="py-2">
              <button
                onClick={handleSimulatedClick}
                onMouseEnter={() => setHoverLink(true)}
                onMouseLeave={() => setHoverLink(false)}
                className="inline-block px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Confirm Direct Deposit Now
              </button>
            </div>

            <p className="text-slate-400 text-[11px]">
              Corporate Payroll Compliance Desk<br />
              Acme Global Operations
            </p>
          </div>

          {/* Link destination inspector box */}
          <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">URL Destination Inspector:</span>
            <span className="text-rose-400">
              {hoverLink ? 'http://acme-corp-portal.com/auth/login-steal' : 'Hover over the button above to inspect target destination'}
            </span>
          </div>

        </div>

      </div>

      {/* Drill History Table */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Historical Simulation Log</h2>
          <p className="text-xs text-slate-400">Record of all training drills dispatched to your address</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Campaign Scenario</th>
                <th className="py-2.5 px-3">Date Dispatched</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Resolution Time</th>
                <th className="py-2.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockEmployeeSimulations.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <p className="font-semibold text-white">{item.campaign_title}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.tracking_token}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">
                    {new Date(item.sent_at).toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="emerald" size="sm" dot>
                      REPORTED AS PHISH
                    </Badge>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-300">
                    17 minutes
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      to={`/phish-test/${item.tracking_token}`}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Catch Page</span>
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
