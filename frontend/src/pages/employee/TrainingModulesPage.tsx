import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Shield,
  Key,
  ShieldAlert,
  Wifi,
  Sparkles
} from 'lucide-react';
import { mockTrainingModules } from '../../data/mockData';
import { Badge } from '../../components/Badge';

export const TrainingModulesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Phishing', 'Passwords', 'Ransomware', 'Remote Work'];

  const filteredModules = mockTrainingModules.filter((m) => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Phishing': return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'Passwords': return <Key className="w-5 h-5 text-amber-400" />;
      case 'Ransomware': return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default: return <Wifi className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Security Training Curriculum</h1>
          <p className="text-xs text-slate-400 mt-1">
            Short, actionable cybersecurity micro-courses designed to defend against modern corporate threats.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>2 / 4 Completed &bull; 50%</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-1.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2" />
        </div>

      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="cyber-card cyber-card-hover p-6 border-slate-800 bg-slate-900/90 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {getCategoryIcon(module.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {module.category} &bull; {module.difficulty}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">{module.title}</h3>
                  </div>
                </div>

                {module.completed ? (
                  <Badge variant="emerald" size="sm" dot>PASSED</Badge>
                ) : (
                  <Badge variant="amber" size="sm">PENDING</Badge>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {module.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{module.estimated_minutes} mins</span>
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{module.lessons.length} Lessons</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>{module.badge_name}</span>
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              {module.completed ? (
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed with {module.score}% Score</span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-mono">Not yet completed</span>
              )}

              <div className="flex items-center gap-2">
                <Link
                  to={`/training/${module.id}`}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <span>{module.completed ? 'Review Material' : 'Launch Course'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
