import { Users, FileText, TrendingUp, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function Overview() {
  // Mock data for overview
  // In a real app without backend, you might pass these as props or use a context
  const [userCount] = useState(45);
  const [expertCount] = useState(12);
  const [dataReportCount] = useState(156);

  const stats = [
    { label: 'Total Users', value: userCount, icon: Users, color: 'bg-blue-500' },
    { label: 'Tax Experts', value: expertCount, icon: ShieldCheck, color: 'bg-orange-500' },
    { label: 'Total Data Reports', value: dataReportCount, icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Dashboard Overview</h2>
        <p className="text-slate-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
            <Users className="text-blue-500 mb-2" size={24} />
            <h4 className="font-semibold text-slate-800">Manage Users</h4>
            <p className="text-sm text-slate-600 mt-1">Add, edit, or remove users</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg hover:border-green-500 transition-colors cursor-pointer">
            <FileText className="text-green-500 mb-2" size={24} />
            <h4 className="font-semibold text-slate-800">Manage Reports</h4>
            <p className="text-sm text-slate-600 mt-1">Create and manage tax data reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}
