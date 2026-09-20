import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Award,
  BarChart3,
  Calendar,
  Send
} from 'lucide-react';
import { mockTrainingModules } from '../../data/mockData';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';

export const AdminTrainingsPage: React.FC = () => {
  const [modules, setModules] = useState(mockTrainingModules);
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newModule, setNewModule] = useState({
    title: '',
    category: 'Phishing' as const,
    difficulty: 'Beginner' as const,
    estimated_minutes: 15,
    description: '',
    badge_name: '',
  });

  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `mod-${Date.now()}`,
      title: newModule.title,
      category: newModule.category,
      difficulty: newModule.difficulty,
      estimated_minutes: Number(newModule.estimated_minutes),
      description: newModule.description,
      badge_name: newModule.badge_name || 'Cyber Defender',
      icon: 'Shield',
      lessons: [
        {
          id: `les-${Date.now()}-1`,
          module_id: `mod-${Date.now()}`,
          title: 'Introduction to Threat Vectors',
          content: 'Course content overview and threat model fundamentals.',
          order_index: 1,
          key_takeaways: ['Stay alert to unsolicited requests', 'Verify out-of-band']
        }
      ],
      completed: false,
    };
    setModules([...modules, created]);
    setIsModalOpen(false);
    setNotification(`New training course "${created.title}" published!`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleBroadcast = (modTitle: string) => {
    setNotification(`Mandatory completion notice for "${modTitle}" sent to all 64 employees.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Curriculum & Training Management</h1>
            <Badge variant="purple" size="sm">NIST 800-50 ALIGNED</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage corporate cybersecurity awareness modules, track organization completion, and issue badges.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Module</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Modules Table & Management List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, idx) => (
          <div key={mod.id} className="cyber-card p-6 border-slate-800 bg-slate-900/90 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    {mod.category} &bull; {mod.difficulty}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug mt-0.5">{mod.title}</h3>
                </div>
                <Badge variant="purple" size="sm">
                  {mod.lessons.length} Lessons
                </Badge>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {mod.description}
              </p>

              {/* Workforce Completion Stats */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Company Completion Rate</span>
                  <span className="text-emerald-400 font-bold">{idx === 0 ? '88%' : idx === 1 ? '75%' : idx === 2 ? '42%' : '18%'}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: idx === 0 ? '88%' : idx === 1 ? '75%' : idx === 2 ? '42%' : '18%' }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>Badge: {mod.badge_name}</span>
              </span>

              <button
                onClick={() => handleBroadcast(mod.title)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3 h-3 text-cyan-400" />
                <span>Assign Deadline</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Module Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Training Module"
        subtitle="Author a new interactive micro-learning cybersecurity course"
      >
        <form onSubmit={handleCreateModule} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Module Title</label>
            <input
              type="text"
              required
              placeholder="e.g. AI-Generated Deepfakes & Voice Cloning"
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <select
                value={newModule.category}
                onChange={(e) => setNewModule({ ...newModule, category: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Phishing">Phishing</option>
                <option value="Passwords">Passwords & MFA</option>
                <option value="Ransomware">Ransomware</option>
                <option value="Remote Work">Remote Work</option>
                <option value="Social Engineering">Social Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Difficulty</label>
              <select
                value={newModule.difficulty}
                onChange={(e) => setNewModule({ ...newModule, difficulty: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Badge Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Deepfake Spotter"
              value={newModule.badge_name}
              onChange={(e) => setNewModule({ ...newModule, badge_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Course Description</label>
            <textarea
              rows={3}
              required
              placeholder="Explain the objectives and importance of this course..."
              value={newModule.description}
              onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20"
            >
              Publish Course
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
