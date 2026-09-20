import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean; // green vs red depending on context
    label: string;
  };
  colorScheme?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'blue';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'cyan'
}) => {
  const iconGradients = {
    cyan: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
    rose: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
    blue: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <div className="cyber-card cyber-card-hover p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">{title}</p>
          <div className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{value}</div>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br border ${iconGradients[colorScheme]} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs">
          <span className={`font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend.value}
          </span>
          <span className="text-slate-400">{trend.label}</span>
        </div>
      )}
    </div>
  );
};
