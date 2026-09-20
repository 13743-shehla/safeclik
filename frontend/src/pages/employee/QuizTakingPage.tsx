import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { mockTrainingModules } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/Badge';

export const QuizTakingPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const module = mockTrainingModules.find((m) => m.id === moduleId) || mockTrainingModules[0];
  const quiz = module.quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!quiz) {
    return (
      <div className="cyber-card p-8 text-center space-y-4">
        <p className="text-white">No quiz found for this module.</p>
        <Link to="/training" className="text-cyan-400 underline text-xs">Return to Training</Link>
      </div>
    );
  }

  const questions = quiz.questions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optIdx,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_answer_index) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const score = calculateScore();
  const passed = score >= quiz.passing_score;

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="amber" size="sm">CERTIFICATION EVALUATION</Badge>
            <span className="text-xs text-slate-400 font-mono">Passing: {quiz.passing_score}%</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">{module.title}</h1>
        </div>

        <Link
          to={`/training/${module.id}`}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Cancel Quiz
        </Link>
      </div>

      {!isSubmitted ? (
        /* Question Answering View */
        <div className="cyber-card p-6 sm:p-8 border-slate-800 bg-slate-900/95 space-y-6">
          
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <h2 className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {currentQ.question_text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/60 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/40 text-slate-300 border border-slate-800/80 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 ${
                    isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug mt-0.5">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                onClick={() => setIsSubmitted(true)}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
              >
                Submit Assessment
              </button>
            ) : (
              <button
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
              >
                Next Question &rarr;
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="cyber-card p-6 sm:p-8 border-slate-800 bg-slate-900/95 space-y-6">
          
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
              passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {passed ? <Award className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
            </div>

            <h2 className="text-2xl font-black text-white">
              {passed ? 'Congratulations! Quiz Passed!' : 'Review & Try Again'}
            </h2>

            <p className="text-xs text-slate-400">
              {passed
                ? `You achieved ${score}%, meeting the passing standard of ${quiz.passing_score}%.`
                : `You achieved ${score}%. The required passing standard is ${quiz.passing_score}%.`}
            </p>

            {passed && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-xs font-bold text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Unlocked Badge: {module.badge_name} &bull; +8 Security Score</span>
              </div>
            )}
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400">Detailed Explanations</h3>

            {questions.map((q, idx) => {
              const userPick = selectedAnswers[idx];
              const isCorrect = userPick === q.correct_answer_index;

              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-white">
                      {idx + 1}. {q.question_text}
                    </p>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-400 font-bold shrink-0">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-slate-400">
                    <strong className="text-slate-300">Correct Answer:</strong> {q.options[q.correct_answer_index]}
                  </p>
                  <p className="text-[11px] text-cyan-300/80 bg-cyan-950/30 p-2.5 rounded border border-cyan-900/40">
                    <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Final Navigation Actions */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            {!passed && (
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            )}

            <Link
              to="/training"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Back to Training Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
};
