import { useState } from 'react';
import JobList from './JobList';
import AddJobForm from './AddJobForm';

export default function JobManagement() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleJobAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleJobDeleted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Job Management</h2>
        <p className="text-slate-600 mt-1">Manage your job listings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JobList key={refreshKey} onJobDeleted={handleJobDeleted} />
        </div>
        <div>
          <AddJobForm onJobAdded={handleJobAdded} />
        </div>
      </div>
    </div>
  );
}
