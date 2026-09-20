import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Eye, ShieldAlert, Award } from 'lucide-react';

export const SimulationCatchPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background cyber ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full cyber-card border-rose-500/30 bg-slate-900/90 shadow-2xl relative z-10 overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-950/80 via-rose-900/50 to-slate-900 p-6 border-b border-rose-800/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-7 h-7 text-rose-400 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-700/50">
                Simulation Drill
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {token || 'drill-sample'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              You clicked a simulated phishing link!
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-bold text-emerald-400 text-sm">Relax — Your computer and data are safe.</p>
              <p>
                This was an authorized security training simulation conducted by your organization's IT Cyber Defense team using <strong>SafeClick</strong>.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-cyan-400" />
              Red flags you might have missed in that email:
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Artificial Urgency</span>
                </div>
                <p className="text-xs text-slate-400">
                  Phishers frequently threaten account suspension within "24 hours" or demand immediate wire authorization.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Lookalike Domain Name</span>
                </div>
                <p className="text-xs text-slate-400">
                  The sender domain was slightly tweaked (e.g. <code>acme-corp-portal.com</code> instead of your authentic corporate address).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Best Practice Next Time</span>
                </div>
                <p className="text-xs text-slate-400">
                  Hover over links before clicking to inspect the real URL destination in your browser's bottom status bar.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Report, Don't Click</span>
                </div>
                <p className="text-xs text-slate-400">
                  Reporting phishing emails in SafeClick immediately protects the entire company and increases your personal Security Score.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/training"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Take Quick 3-Min Phishing Refresher</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors text-center"
            >
              Go to Employee Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
