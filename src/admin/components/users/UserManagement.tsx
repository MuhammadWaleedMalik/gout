import { useState } from 'react';
import UserList from './UserList';
import AddUserForm from './AddUserForm';


export default function UserManagement() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">User Management</h2>
        <p className="text-slate-600 mt-1">Manage your dashboard users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserList refreshKey={refreshKey} />
        </div>
        <div>
          <AddUserForm onUserAdded={handleUserAdded} />
        </div>
      </div>
    </div>
  );
}
