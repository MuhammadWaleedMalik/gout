import { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import UserManagement from './users/UserManagement';
import ReportManagement from './reports/ReportManagement';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportManagement />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}
