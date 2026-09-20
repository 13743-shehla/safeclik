import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Info,
  CheckCircle2,
  Clock,
  KeyRound,
  MailWarning,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockSecurityScore } from '../../data/mockData';
import { ScoreGauge } from '../../components/ScoreGauge';
import { Badge } from '../../components/Badge';

export const SecurityScorePage: React.FC = () => {
  const { user } = useAuth();
  const [simulatedScore, setSimulatedScore] = useState<number | null>(null);

  const scoreData = mockSecurityScore;
  const currentScore = user?.security_score ?? scoreData.overall;
  const displayScore = simulatedScore ?? currentScore;

  const handleSimulateQuiz = () => {
    if (simulatedScore === null) {
      setSimulatedScore(Math.min(100, currentScore + 12));
    } else {
      setSimulatedScore(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Personal Security Score</h1>
            <Badge variant="emerald" size="sm" dot>TOP TIER</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic behavioral cyber risk rating computed across simulations, training, and reporting vigilance.
          </p>
        </div>

        <button
          onClick={handleSimulateQuiz}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{simulatedScore ? 'Reset Simulation' : 'Simulate Completing Next Course (+12 pts)'}</span>
        </button>
      </div>

      {/* Main Score Breakdown Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Gauge Box */}
        <div className="cyber-card p-6 border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
          <ScoreGauge score={displayScore} size="lg" />
          
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+{scoreData.trend} points over the last 30 days</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Last calculated: {new Date(scoreData.last_updated).toLocaleDateString()}</p>
          </div>

          <div className="w-full pt-4 border-t border-slate-800/80 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Department Rank:</span>
              <span className="font-bold text-white">#2 of 28 (Finance)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Company Benchmark:</span>
              <span className="font-bold text-cyan-400">Above Average (76 avg)</span>
            </div>
          </div>
        </div>

        {/* Right 2 cols: Factors */}
        <div className="lg:col-span-2 cyber-card p-6 border-slate-800 space-y-4">
          <div>
            <h2 className="text-base font-bold text-white">Risk Factor Contribution</h2>
            <p className="text-xs text-slate-400">Weighted criteria determining your final employee security score</p>
          </div>

          <div className="space-y-4 pt-2">
            {scoreData.factors.map((factor, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {factor.status === 'good' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="text-xs font-bold text-white">{factor.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      Weight: {factor.weight}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${factor.status === 'good' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {factor.score}/100
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      factor.status === 'good' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Actionable Recommendations */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Steps to Reach a 100/100 Flawless Score</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
              <MailWarning className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-white">Complete Ransomware Course</p>
              <p className="text-[11px] text-slate-400">
                Finish Module 3 and pass the 3-question quiz with at least 80% to earn the Ransomware Shield badge and boost your score by 12 points.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-white">Rotate Corporate Password</p>
              <p className="text-[11px] text-slate-400">
                Your credentials were last updated 82 days ago. Updating your primary password to a 16+ character passphrase will bring Credential Safety to 100%.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
