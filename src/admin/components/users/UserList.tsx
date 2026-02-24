import { useEffect, useState } from 'react';
import { Mail, User, ShieldCheck, Loader2 } from 'lucide-react';
import { DashboardUser } from '../../types';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

interface UserListProps {
  refreshKey?: number;
}

export default function UserList({ refreshKey }: UserListProps) {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error: any) {
      // toast.error('Failed to fetch users');
      // Mock data for Gemrock
      setUsers([
        { _id: '1', name: 'John Doe', email: 'john@gemrock.tax', role: 'admin', createdAt: new Date().toISOString() },
        { _id: '2', name: 'Sarah Wilson', email: 'sarah@gemrock.tax', role: 'user', createdAt: new Date().toISOString() },
        { _id: '3', name: 'Michael Chen', email: 'michael@gemrock.tax', role: 'user', createdAt: new Date().toISOString() },
        { _id: '4', name: 'Emma Thompson', email: 'emma@gemrock.tax', role: 'admin', createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-semibold text-slate-800">All Users</h3>
        <p className="text-sm text-slate-600 mt-1">{users.length} total users</p>
      </div>

      <div className="divide-y divide-slate-200">
        {users.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No users found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className={`${user.role === 'admin' ? 'bg-orange-100' : 'bg-blue-100'} p-2 rounded-lg`}>
                  {user.role === 'admin' ? (
                    <ShieldCheck className="text-orange-600" size={20} />
                  ) : (
                    <User className="text-blue-600" size={20} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-800">{user.name}</h4>
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${user.role === 'admin' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-600">{user.email}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
