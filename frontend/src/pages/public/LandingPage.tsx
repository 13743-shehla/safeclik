import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  MailWarning,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
  Search,
  Users,
  Lock,
  ChevronRight,
  BarChart2,
  Terminal,
  ExternalLink,
  Flame
} from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Badge } from '../../components/Badge';

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'training' | 'osint'>('simulation');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Cyber glow background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Next-Gen Enterprise Cyber Hygiene & Phishing Defense</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none text-white">
              Transform Employees Into Your{' '}
              <span className="cyber-gradient-text">Human Firewall</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              SafeClick trains teams through safe real-world phishing simulations, micro-learning courses, and AI-driven OSINT awareness — reducing breach risk by up to <strong>92%</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Launch Free Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <span>Sign In to Portal</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Quick Demo Credential Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-slate-400">Instant Demo:</span>
              <Link to="/dashboard" className="hover:text-cyan-300 underline decoration-cyan-500/40">Employee Mode (Alex Rivera)</Link>
              <span>&bull;</span>
              <Link to="/admin" className="hover:text-purple-300 underline decoration-purple-500/40">Admin CISO Mode (Sarah Connor)</Link>
            </div>
          </div>

          {/* Interactive Hero Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto cyber-card p-2 sm:p-4 bg-slate-900/90 border-slate-800 shadow-2xl relative">
            <div className="bg-slate-950 rounded-lg p-4 sm:p-6 border border-slate-800/80 space-y-6">
              
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">safeclick-sensor-node-01 &bull; Active Simulation Guard</span>
                </div>
                <Badge variant="emerald" size="sm" dot>LIVE MONITORING</Badge>
              </div>

              {/* Grid with 3 live stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs text-slate-400 font-mono">ORGANIZATION HYGIENE</p>
                  <p className="text-3xl font-extrabold text-white mt-1">84<span className="text-sm font-normal text-slate-400">/100</span></p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Low Risk Rating</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs text-slate-400 font-mono">PHISHING CLICK REDUCTION</p>
                  <p className="text-3xl font-extrabold text-cyan-400 mt-1">-78.4%</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                    <span>Down from 34% baseline</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-xs text-slate-400 font-mono">EMPLOYEES CERTIFIED</p>
                  <p className="text-3xl font-extrabold text-white mt-1">94.2%</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-cyan-400">
                    <Award className="w-4 h-4" />
                    <span>5 Modules Completed</span>
                  </div>
                </div>
              </div>

              {/* Phishing preview drill prompt */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                    <MailWarning className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Active Drill: Urgent Wire Transfer from CEO</p>
                    <p className="text-[11px] text-slate-400">12 targeted &bull; 9 reported safe &bull; 1 click trapped</p>
                  </div>
                </div>
                <Link
                  to="/admin/campaigns"
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold self-start sm:self-auto transition-colors"
                >
                  View Drill Analytics &rarr;
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Tabs */}
      <section id="features" className="py-20 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Pillars of SafeClick</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">
              Complete Cybersecurity Awareness Platform
            </h3>
            <p className="text-slate-400 text-sm mt-3">
              Built according to NIST 800-50 guidelines for organizational information security education and training.
            </p>
          </div>

          {/* Tab selector */}
          <div className="flex justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'simulation'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <MailWarning className="w-4 h-4" />
              <span>Phishing Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'training'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Interactive Training</span>
            </button>
            <button
              onClick={() => setActiveTab('osint')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'osint'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Safe OSINT Exposure</span>
            </button>
          </div>

          {/* Tab contents */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {activeTab === 'simulation' && (
              <>
                <div className="space-y-5">
                  <Badge variant="rose">REALISTIC SCENARIOS</Badge>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white">
                    Simulate Modern Social Engineering Without the Fear
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Test your workforce against authentic cyber threats: Executive Impersonation (BEC), fake Microsoft 365 logins, Quishing (QR Phishing), and Urgent Wire transfer notices.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Zero-risk educational landing page immediately coaches employees if they click.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>One-click 'Report Phishing' button rewards staff and boosts security score.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Granular department analytics to identify teams that need refresher training.</span>
                    </li>
                  </ul>
                  <Link
                    to="/admin/campaigns"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
                  >
                    <span>Explore Campaign Manager</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="cyber-card p-6 border-slate-800 bg-slate-950/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-slate-400">EMAIL GATEWAY SIMULATOR</span>
                    <Badge variant="rose" size="sm">TRAP SIMULATION</Badge>
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>From: Corporate Payroll &lt;payroll-update@acme-corp-portal.com&gt;</span>
                      <span className="text-rose-400 font-mono">SPF: FAILED</span>
                    </div>
                    <p className="font-bold text-white">ACTION REQUIRED: Update Direct Deposit for Q3</p>
                    <p className="text-slate-400">
                      Due to our annual audit, verify your routing details before 5 PM to avoid payment disruption:
                    </p>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-[10px] break-all">
                      https://safeclick.local/phish-test/tok-q3-payroll-alex
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'training' && (
              <>
                <div className="space-y-5">
                  <Badge variant="cyan">GAMIFIED MODULES</Badge>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white">
                    Bite-Sized Lessons Employees Actually Complete
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Say goodbye to boring 45-minute slide decks. SafeClick delivers 3 to 5 minute interactive lessons covering Passwords & MFA, Ransomware containment, Remote Wi-Fi safety, and Social Engineering.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Interactive quizzes with immediate explanations for every correct or wrong option.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Unlock cybersecurity badges and climb the company cyber hygiene leaderboard.</span>
                    </li>
                  </ul>
                  <Link
                    to="/training"
                    className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2"
                  >
                    <span>View Curriculum Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="cyber-card p-6 border-slate-800 bg-slate-950/80 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-slate-400">INTERACTIVE QUIZ ENGINE</span>
                    <Badge variant="emerald" size="sm">PASSING 80%</Badge>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <p className="text-xs font-bold text-white">
                      "If you suspect your laptop is infected with ransomware, what should you do first?"
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-medium">
                        ✓ Unplug Ethernet cable and disconnect Wi-Fi immediately, leaving machine on.
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                        ✗ Turn off the power immediately.
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'osint' && (
              <>
                <div className="space-y-5">
                  <Badge variant="purple">AWARENESS OSINT</Badge>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white">
                    Understand What Attackers Can See About Your Company
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Attackers don't guess passwords — they search public breaches, look up DNS records, and harvest employee names. Our safe OSINT scanner demonstrates email exposure, SPF/DMARC posture, and domain resilience without invasive scanning.
                  </p>
                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Checks mail authentication (SPF, DKIM, DMARC) against spoofing attacks.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Safe educational database matching for historical breach awareness.</span>
                    </li>
                  </ul>
                  <Link
                    to="/admin/osint"
                    className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 pt-2"
                  >
                    <span>Run an OSINT Exposure Check</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="cyber-card p-6 border-slate-800 bg-slate-950/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-purple-400">OSINT SCANNER &bull; acmecorp.com</span>
                    <Badge variant="cyan" size="sm">SCORE: 34 (LOW EXPOSURE)</Badge>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">DMARC Policy:</span>
                      <span className="text-emerald-400 font-bold">p=reject (Enforced)</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">SPF Record:</span>
                      <span className="text-emerald-400 font-bold">Configured (Valid)</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                      <span className="text-slate-400">Breached Credential Hits:</span>
                      <span className="text-amber-400 font-bold">3 historical mentions</span>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to secure your organization?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Experience SafeClick right now with preloaded employees, interactive quizzes, and drill campaigns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all"
            >
              Go to Employee Dashboard
            </Link>
            <Link
              to="/admin"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/25 transition-all"
            >
              Go to Admin CISO Console
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-bold">SafeClick</span>
            <span>&mdash; Holberton Final Year Cybersecurity Portfolio Project</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Clean Architecture</span>
            <span>&bull;</span>
            <span>FastAPI + React</span>
            <span>&bull;</span>
            <span>NIST 800-50 Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
