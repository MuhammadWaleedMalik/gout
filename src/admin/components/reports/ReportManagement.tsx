import { useState } from 'react';
import ReportList from './ReportList';
import AddReportForm from './AddReportForm';

export default function ReportManagement() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleReportAdded = () => {
        setRefreshKey((prev) => prev + 1);
    };

    const handleReportDeleted = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-800">Tax & Royalty Reports</h2>
                <p className="text-slate-600 mt-1">Manage global tax data and royalty reports</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ReportList key={refreshKey} onReportDeleted={handleReportDeleted} />
                </div>
                <div>
                    <AddReportForm onReportAdded={handleReportAdded} />
                </div>
            </div>
        </div>
    );
}
