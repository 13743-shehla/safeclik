import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MailWarning,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockEmployeeDashboardData } from '../../data/mockData';
import { StatCard } from '../../components/StatCard';
import { ScoreGauge } from '../../components/ScoreGauge';
import { Badge } from '../../components/Badge';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const data = mockEmployeeDashboardData;
  const currentScore = user?.security_score ?? data.security_score.overall;

  return (
    <div className="space-y-6">
      
      {/* Welcome & Posture Banner */}
      <div className="cyber-card p-6 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="cyan" size="sm" dot>EMPLOYEE DEFENSE PORTAL</Badge>
              <span className="text-xs text-slate-400 font-mono">Department: {user?.department || 'Finance & Accounting'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.full_name || 'Alex'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Your security score is in the <strong className="text-emerald-400">Top 15%</strong> across the organization. Keep your streak going by completing the newly assigned Ransomware module.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <ScoreGauge score={currentScore} size="sm" showDetails={false} />
            <div>
              <p className="text-[11px] font-mono uppercase text-slate-400">Personal Hygiene Score</p>
              <p className="text-xl font-bold text-emerald-400">LOW RISK</p>
              <Link
                to="/security-score"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 mt-1"
              >
                <span>View Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Security Posture"
          value={`${currentScore}/100`}
          subtitle="Updated 2 days ago"
          icon={ShieldCheck}
          colorScheme="emerald"
          trend={{ value: '+6 pts', isPositive: true, label: 'vs last month' }}
        />
        <StatCard
          title="Phishing Resilience"
          value="100%"
          subtitle="0 simulated clicks"
          icon={MailWarning}
          colorScheme="cyan"
          trend={{ value: '3 Reported', isPositive: true, label: 'out of 3 drills' }}
        />
        <StatCard
          title="Courses Completed"
          value="2 / 4"
          subtitle="50% Curriculum progress"
          icon={BookOpen}
          colorScheme="blue"
        />
        <StatCard
          title="Defense Badges"
          value="3 Earned"
          subtitle="Level 2 Defender"
          icon={Award}
          colorScheme="amber"
        />
      </div>

      {/* Main Grid: Active Training + Phishing Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Assigned Module Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Recommended Next Training</span>
                </h2>
                <p className="text-xs text-slate-400">Assigned by Security Operations for Q3 compliance</p>
              </div>
              <Badge variant="amber" size="sm">INCOMPLETE</Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400">Module 3 &bull; Ransomware</span>
                <h3 className="text-sm font-bold text-white">
                  Ransomware Defense: From Suspicious Links to Containment
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 20 minutes</span>
                  <span>&bull;</span>
                  <span>2 Lessons + 1 Quiz</span>
                  <span>&bull;</span>
                  <span className="text-cyan-300">Badge: Ransomware Shield</span>
                </div>
              </div>

              <Link
                to="/training/mod-03"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 shrink-0 flex items-center gap-1.5"
              >
                <span>Start Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick overview of all modules */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-slate-300">Training Progress Catalog</span>
                <Link to="/training" className="text-cyan-400 hover:underline">View All &rarr;</Link>
              </div>

              <div className="space-y-2">
                {data.active_modules.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      {m.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600" />
                      )}
                      <div>
                        <p className="font-medium text-white">{m.title}</p>
                        <p className="text-[10px] text-slate-400">{m.category} &bull; {m.difficulty}</p>
                      </div>
                    </div>
                    {m.completed ? (
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">Passed ({m.score}%)</span>
                    ) : (
                      <Link to={`/training/${m.id}`} className="text-cyan-400 hover:underline font-medium text-[11px]">
                        Resume
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Phishing Drills Table */}
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <MailWarning className="w-4 h-4 text-rose-400" />
                  <span>Recent Phishing Simulation Drills</span>
                </h2>
                <p className="text-xs text-slate-400">Simulations automatically sent to test your inbox vigilance</p>
              </div>
              <Link to="/simulations" className="text-xs text-cyan-400 hover:underline font-semibold">
                Practice Lab &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                    <th className="py-2.5 px-3">Simulation Drill</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Your Action</th>
                    <th className="py-2.5 px-3">Score Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {data.recent_simulations.map((sim) => (
                    <tr key={sim.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-white">{sim.campaign_title}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Token: {sim.tracking_token}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {new Date(sim.sent_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant="emerald" size="sm" dot>REPORTED (SAFE)</Badge>
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">
                        +4 Points
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right column: Badges + Cyber Hygiene Tips */}
        <div className="space-y-6">
          
          {/* Earned Badges Showcase */}
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Earned Badges</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">3 / 5</span>
            </div>

            <div className="space-y-3">
              {data.badges.map((badge, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">{badge.name}</p>
                      <span className="text-[10px] font-mono text-slate-400">{badge.earned_date}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cyber Hygiene Checklist */}
          <div className="cyber-card p-6 border-slate-800 space-y-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Cyber Hygiene Tips</span>
            </h2>
            <div className="space-y-2.5 text-xs text-slate-300">
              {data.quick_tips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 leading-relaxed text-[11px]">{tip}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
