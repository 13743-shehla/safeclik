import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Mail,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  MoreVertical,
  Send,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { mockEmployees } from '../../data/mockData';
import { User, RiskLevel } from '../../types';
import { Badge } from '../../components/Badge';
import { Modal } from '../../components/Modal';

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<User[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');

  // Add User Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    full_name: '',
    email: '',
    department: 'Finance & Accounting',
    job_title: '',
    role: 'EMPLOYEE' as 'EMPLOYEE' | 'ADMIN',
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-emp-${Date.now()}`,
      full_name: newUserData.full_name,
      email: newUserData.email,
      department: newUserData.department,
      job_title: newUserData.job_title,
      role: newUserData.role,
      created_at: new Date().toISOString(),
      security_score: 70,
      risk_level: 'MEDIUM',
    };
    setEmployees([newUser, ...employees]);
    setIsAddModalOpen(false);
    setNewUserData({
      full_name: '',
      email: '',
      department: 'Finance & Accounting',
      job_title: '',
      role: 'EMPLOYEE',
    });
    showNotification(`User ${newUser.full_name} enrolled successfully.`);
  };

  const handleSendDrill = (emp: User) => {
    showNotification(`Phishing test drill dispatched to ${emp.email}.`);
  };

  const handleDeleteUser = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
    showNotification('Employee removed from awareness program.');
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
    const matchesRisk = riskFilter === 'All' || emp.risk_level === riskFilter;
    return matchesSearch && matchesDept && matchesRisk;
  });

  const getRiskBadge = (level?: RiskLevel) => {
    switch (level) {
      case 'LOW':
        return <Badge variant="emerald" size="sm">LOW RISK</Badge>;
      case 'MEDIUM':
        return <Badge variant="cyan" size="sm">MEDIUM</Badge>;
      case 'HIGH':
        return <Badge variant="amber" size="sm">HIGH RISK</Badge>;
      case 'CRITICAL':
        return <Badge variant="rose" size="sm" dot>CRITICAL</Badge>;
      default:
        return <Badge variant="slate" size="sm">UNRATED</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Employees & Security Risk</h1>
            <Badge variant="purple" size="sm">{employees.length} ENROLLED</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitor employee cyber hygiene scores, risk classifications, and dispatch targeted training.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Enroll New Employee</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-1.5 pl-9 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Department:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All">All Departments</option>
              <option value="Finance & Accounting">Finance & Accounting</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
              <option value="Legal & Compliance">Legal & Compliance</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Risk Level:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="All">All Levels</option>
              <option value="LOW">Low Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Risk</option>
              <option value="CRITICAL">Critical Risk</option>
            </select>
          </div>
        </div>

      </div>

      {/* Employees Table */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-2.5 px-3">Employee</th>
                <th className="py-2.5 px-3">Department & Role</th>
                <th className="py-2.5 px-3">Security Score</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Permissions</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                        {emp.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{emp.full_name}</p>
                        <p className="text-[11px] text-slate-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <p className="text-white font-medium">{emp.department}</p>
                    <p className="text-[11px] text-slate-400">{emp.job_title}</p>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">
                        {emp.security_score ?? 75}
                      </span>
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            (emp.security_score ?? 75) >= 80 ? 'bg-emerald-400' :
                            (emp.security_score ?? 75) >= 60 ? 'bg-cyan-400' :
                            (emp.security_score ?? 75) >= 40 ? 'bg-amber-400' : 'bg-rose-500'
                          }`}
                          style={{ width: `${emp.security_score ?? 75}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {getRiskBadge(emp.risk_level)}
                  </td>

                  <td className="py-3 px-3">
                    <Badge variant={emp.role === 'ADMIN' ? 'purple' : 'slate'} size="sm">
                      {emp.role}
                    </Badge>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSendDrill(emp)}
                        title="Dispatch Phishing Simulation Drill"
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>Drill</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(emp.id)}
                        title="Remove Employee"
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Employee"
        subtitle="Add team member to organization security awareness tracking"
      >
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rachel Adams"
              value={newUserData.full_name}
              onChange={(e) => setNewUserData({ ...newUserData, full_name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="rachel.adams@company.com"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
              <select
                value={newUserData.department}
                onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Finance & Accounting">Finance</option>
                <option value="Engineering">Engineering</option>
                <option value="Human Resources">HR</option>
                <option value="Sales & Marketing">Sales</option>
                <option value="Legal & Compliance">Legal</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Role</label>
              <select
                value={newUserData.role}
                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as 'EMPLOYEE' | 'ADMIN' })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="ADMIN">Admin / CISO</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Financial Analyst"
              value={newUserData.job_title}
              onChange={(e) => setNewUserData({ ...newUserData, job_title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20"
            >
              Enroll Employee
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
