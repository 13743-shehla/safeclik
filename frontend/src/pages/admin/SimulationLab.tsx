import React, { useState } from 'react';

export const SimulationLab: React.FC = () => {
  const [formData, setFormData] = useState({
    domain: '',
    department: 'IT',
    firstName: '',
    lastName: '',
    email: '',
    template: 'password_reset'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend-ə e-poçt göndərilməsi üçün sorğu atılır (API çağırışı)
    alert(`Fişinq simulyasiyası ${formData.email} ünvanına göndərildi!`);
  };

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Phishing Simulation Lab</h1>
      <p className="text-gray-400 text-sm mb-6">Əməkdaşlara real kiber hücum simulyasiyaları göndərin və maarifləndirmə səviyyəsini ölçün.</p>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Ad</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
              value={formData.firstName}
              onChange={e => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Soyad</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
              value={formData.lastName}
              onChange={e => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Domen</label>
            <input 
              type="text" 
              placeholder="company.az"
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
              value={formData.domain}
              onChange={e => setFormData({...formData, domain: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Departament</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
              value={formData.department}
              onChange={e => setFormData({...formData, department: e.target.value})}
            >
              <option value="IT">İT və Proqramlaşdırma</option>
              <option value="HR">İnsan Resursları</option>
              <option value="Finance">Maliyyə</option>
              <option value="Marketing">Marketinq</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">Əməkdaşın Gmail Ünvanı</label>
          <input 
            type="email" 
            required
            placeholder="istifadeci@gmail.com"
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-white"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-500 py-2.5 rounded font-semibold text-sm transition"
        >
          Fişinq Məktubunu Göndər
        </button>
      </form>
    </div>
  );
};