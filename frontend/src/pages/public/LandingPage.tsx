import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  MailWarning,
  Award,
  CheckCircle2,
  ArrowRight,
  Search,
  ChevronRight,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { Badge } from '../../components/Badge';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'training' | 'osint'>('simulation');

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      
      {/* Header / Navbar */}
      <header className="border-b border-slate-800/80 bg-[#050b14]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg text-white tracking-tight">SafeClick</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-semibold">
                    V2.4
                  </span>
                </div>
                <p className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">ENTERPRISE DEFENSE</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300 ml-4">
              <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
              <a href="#capabilities" className="hover:text-cyan-400 transition-colors">Capabilities</a>
              <a href="#simulation" className="hover:text-cyan-400 transition-colors">Simulation Lab</a>
              <a href="#osint" className="hover:text-cyan-400 transition-colors">OSINT Audit</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 border-l border-slate-800 pl-4">
              <span className="text-slate-400">Sarah Connor</span>
              <button aria-label="Sistemdən çıxış et" className="p-1 hover:text-rose-400 transition-colors">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Next-Gen Enterprise Cyber Hygiene &amp; Phishing Defense</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              Transform Employees Into Your{' '}
              <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                Human Firewall
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              SafeClick trains teams through safe real-world phishing simulations, micro-learning courses, and AI-driven OSINT awareness — reducing breach risk by up to <strong className="text-slate-200">92%</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Launch Free Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Sign In to Portal</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Demo Credential Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-mono">
              <span>Instant Demo:</span>
              <Link to="/dashboard" className="text-slate-300 hover:text-cyan-300 underline decoration-slate-600">Employee Mode (Alex Rivera)</Link>
              <span>•</span>
              <Link to="/admin" className="text-slate-300 hover:text-cyan-300 underline decoration-slate-600">Admin CISO Mode (Sarah Connor)</Link>
            </div>
          </div>

          {/* Interactive Hero Preview Card */}
          <div className="mt-12 max-w-5xl mx-auto rounded-2xl bg-slate-900/60 p-2 sm:p-4 border border-slate-800/80 shadow-2xl backdrop-blur-xl">
            <div className="bg-[#030712] rounded-xl p-4 sm:p-6 border border-slate-800/80 space-y-6">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">safeclick-sensor-node-01 • Active Simulation Guard</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[10px] font-mono text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE MONITORING
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">ORGANIZATION HYGIENE</p>
                  <p className="text-3xl font-black text-white mt-1">84<span className="text-sm font-normal text-slate-400">/100</span></p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Low Risk Rating</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">PHISHING CLICK REDUCTION</p>
                  <p className="text-3xl font-black text-cyan-400 mt-1">-78.4%</p>
                  <p className="text-xs text-slate-400 mt-2">Down from 34% baseline</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">EMPLOYEES CERTIFIED</p>
                  <p className="text-3xl font-black text-white mt-1">94.2%</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-cyan-400 font-medium">
                    <Award className="w-4 h-4" />
                    <span>5 Modules Completed</span>
                  </div>
                </div>
              </div>

              {/* Active Drill Banner */}
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                    <MailWarning className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Active Drill: Urgent Wire Transfer from CEO</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">12 targeted • 9 reported safe • 1 click trapped</p>
                  </div>
                </div>
                <Link
                  to="/admin/campaigns"
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold self-start sm:self-auto transition-colors"
                >
                  View Drill Analytics &rarr;
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section id="capabilities" className="py-20 bg-slate-900/30 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Pillars of SafeClick</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              Complete Cybersecurity Awareness Platform
            </h3>
          </div>

          <div className="flex justify-center gap-2 mb-10" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'simulation'}
              onClick={() => setActiveTab('simulation')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'simulation'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <MailWarning className="w-4 h-4" />
              <span>Phishing Simulator</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'training'}
              onClick={() => setActiveTab('training')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'training'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Interactive Training</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'osint'}
              onClick={() => setActiveTab('osint')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'osint'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Safe OSINT Exposure</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {activeTab === 'simulation' && (
              <>
                <div className="space-y-4">
                  <Badge variant="rose">REALISTIC SCENARIOS</Badge>
                  <h4 className="text-2xl font-bold text-white">Simulate Modern Social Engineering</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Test your workforce against authentic cyber threats: Executive Impersonation, fake Microsoft 365 logins, Quishing, and Urgent Wire transfer notices.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Zero-risk educational landing page immediately coaches employees.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>One-click 'Report Phishing' button rewards staff.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="text-rose-400">SIMULATION DRILL ACTIVE</div>
                  <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    From: CEO &lt;executive-notice@acme-corp.org&gt;<br />
                    Subject: Urgent Wire Transfer Request
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};