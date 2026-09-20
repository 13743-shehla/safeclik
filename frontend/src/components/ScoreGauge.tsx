import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { RiskLevel } from '../types';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 'md',
  showDetails = true,
}) => {
  const normalizedScore = Math.max(0, Math.min(100, score));

  const getRiskInfo = (val: number): { level: RiskLevel; color: string; border: string; glow: string; text: string; icon: React.ReactNode } => {
    if (val >= 80) {
      return {
        level: 'LOW',
        color: 'text-emerald-400',
        border: 'border-emerald-500',
        glow: 'shadow-emerald-500/20',
        text: 'Strong Cyber Hygiene',
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
      };
    } else if (val >= 60) {
      return {
        level: 'MEDIUM',
        color: 'text-cyan-400',
        border: 'border-cyan-500',
        glow: 'shadow-cyan-500/20',
        text: 'Moderate Vigilance',
        icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />
      };
    } else if (val >= 40) {
      return {
        level: 'HIGH',
        color: 'text-amber-400',
        border: 'border-amber-500',
        glow: 'shadow-amber-500/20',
        text: 'Elevated Risk Profile',
        icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
      };
    } else {
      return {
        level: 'CRITICAL',
        color: 'text-rose-400',
        border: 'border-rose-500',
        glow: 'shadow-rose-500/20',
        text: 'Critical Vulnerability',
        icon: <ShieldAlert className="w-5 h-5 text-rose-400" />
      };
    }
  };

  const risk = getRiskInfo(normalizedScore);

  // SVG circular gauge calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * normalizedScore) / 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="text-slate-800"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            className={`transition-all duration-1000 ease-out ${
              normalizedScore >= 80 ? 'text-emerald-400' :
              normalizedScore >= 60 ? 'text-cyan-400' :
              normalizedScore >= 40 ? 'text-amber-400' : 'text-rose-500'
            }`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-white tracking-tight">{normalizedScore}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">/ 100</span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
          {risk.icon}
          <span className={`text-xs font-semibold ${risk.color}`}>
            {risk.level} RISK &bull; {risk.text}
          </span>
        </div>
      )}
    </div>
  );
};
