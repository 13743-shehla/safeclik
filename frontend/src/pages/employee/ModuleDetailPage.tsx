import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { mockTrainingModules } from '../../data/mockData';
import { Badge } from '../../components/Badge';

export const ModuleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const module = mockTrainingModules.find((m) => m.id === id) || mockTrainingModules[0];
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const currentLesson = module.lessons[activeLessonIndex] || module.lessons[0];
  const isLastLesson = activeLessonIndex === module.lessons.length - 1;

  return (
    <div className="space-y-6">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/training"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum Catalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm">
            {module.category}
          </Badge>
          <Badge variant="slate" size="sm">
            Lesson {activeLessonIndex + 1} of {module.lessons.length}
          </Badge>
        </div>
      </div>

      {/* Module Title Banner */}
      <div className="cyber-card p-6 bg-slate-900 border-slate-800 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Security Micro-Course</span>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{module.title}</h1>
            <p className="text-xs text-slate-400 mt-1">{module.description}</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Upon Completion</p>
              <p className="text-xs font-bold text-white">{module.badge_name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Lesson Body & Index Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Lesson Index Sidebar */}
        <div className="cyber-card p-4 border-slate-800 bg-slate-900/60 h-fit space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2">Course Syllabus</h2>
          <div className="space-y-1">
            {module.lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={`w-full text-left p-3 rounded-lg text-xs font-medium transition-all flex items-start gap-2.5 ${
                  activeLessonIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70 mt-0.5">{idx + 1}.</span>
                <span className="leading-snug flex-1">{lesson.title}</span>
              </button>
            ))}
          </div>

          {/* Quiz item in syllabus */}
          {module.quiz && (
            <Link
              to={`/quiz/${module.id}`}
              className="w-full text-left p-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>Certification Quiz</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </Link>
          )}
        </div>

        {/* Lesson Reader Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="cyber-card p-6 sm:p-8 border-slate-800 bg-slate-900/90 space-y-6">
            
            {/* Lesson Title */}
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] font-mono text-cyan-400 uppercase">Lesson {activeLessonIndex + 1}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{currentLesson.title}</h2>
            </div>

            {/* Markdown simulated lesson formatted text */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {currentLesson.content}
            </div>

            {/* Key Takeaways Box */}
            {currentLesson.key_takeaways && currentLesson.key_takeaways.length > 0 && (
              <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Key Security Takeaways</span>
                </h3>
                <ul className="space-y-2">
                  {currentLesson.key_takeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                disabled={activeLessonIndex === 0}
                onClick={() => setActiveLessonIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                &larr; Previous Lesson
              </button>

              {isLastLesson ? (
                <Link
                  to={`/quiz/${module.id}`}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Take Module Certification Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={() => setActiveLessonIndex((prev) => prev + 1)}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
