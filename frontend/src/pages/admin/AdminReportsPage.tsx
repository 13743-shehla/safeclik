import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Award,
  Calendar
} from 'lucide-react';
import { Badge } from '../../components/Badge';

export const AdminReportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Security Analytics & Compliance</h1>
            <Badge variant="purple" size="sm">Q3 EXECUTIVE AUDIT</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise cyber awareness metrics, compliance audit proofs, and risk reduction reporting.
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={downloading}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Compiling Executive PDF...' : 'Export Audit Report (PDF)'}</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Report downloaded: SafeClick_Executive_Cyber_Hygiene_Q3.pdf</span>
        </div>
      )}

      {/* Compliance Framework Standards Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cyber-card p-5 border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">NIST SP 800-50</span>
            <Badge variant="emerald" size="sm">94% SATISFIED</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Building an Information Technology Security Awareness and Training Program.
          </p>
        </div>

        <div className="cyber-card p-5 border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">ISO 27001 (A.7.2.2)</span>
            <Badge variant="emerald" size="sm">AUDIT READY</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Information security awareness, education, and training verified with automated logs.
          </p>
        </div>

        <div className="cyber-card p-5 border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">SOC 2 Type II (CC2.2)</span>
            <Badge variant="emerald" size="sm">COMPLIANT</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Security training evidence collected for 100% of newly onboarded and existing staff.
          </p>
        </div>
      </div>

      {/* Deep Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Phishing Susceptibility Curve */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Workforce Phishing Susceptibility Trend</h2>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>-22.8% Decline in Clicks</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-400 text-[11px]">
              <span>Cycle</span>
              <span>Click Vulnerability Rate</span>
              <span>Report Rate</span>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded bg-slate-900 flex justify-between items-center">
                <span className="text-slate-300">Baseline (Month 1)</span>
                <span className="text-rose-400 font-bold">34.0%</span>
                <span className="text-slate-400">18.5%</span>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between items-center">
                <span className="text-slate-300">After 2 Drills (Month 2)</span>
                <span className="text-amber-400 font-bold">21.5%</span>
                <span className="text-slate-400">41.0%</span>
              </div>
              <div className="p-2 rounded bg-slate-900 flex justify-between items-center">
                <span className="text-slate-300">Current (Month 3)</span>
                <span className="text-emerald-400 font-bold">11.2%</span>
                <span className="text-emerald-400 font-bold">66.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Training Completion by Department */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white">Departmental Curriculum Completion</h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300">Engineering</span>
                <span className="text-emerald-400 font-bold">95.4%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '95.4%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300">Legal & Compliance</span>
                <span className="text-emerald-400 font-bold">87.5%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '87.5%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300">Finance & Accounting</span>
                <span className="text-cyan-400 font-bold">75.0%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '75.0%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300">Sales & Marketing</span>
                <span className="text-cyan-400 font-bold">73.6%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '73.6%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300">Human Resources</span>
                <span className="text-amber-400 font-bold">57.1%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '57.1%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
