import { useEffect, useState } from 'react';
import { Trash2, FileText, Calendar, MapPin, Building2, Download } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

interface Report {
    _id: string;
    title: string;
    category: string;
    country: string;
    status: string;
    description: string;
    author: string;
    createdAt: string;
}

interface ReportListProps {
    onReportDeleted: () => void;
}

export default function ReportList({ onReportDeleted }: ReportListProps) {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        try {
            // API call placeholder - Using mock data as fallback
            const response = await api.get('/reports');
            if (response.data.success) {
                setReports(response.data.data);
            }
        } catch (error: any) {
            // Mock data for Gemrock Tax & Royalty Reports
            setReports([
                {
                    _id: '1',
                    title: '2025 Global Royalty Rate Analysis',
                    category: 'Royalty Data',
                    country: 'Global',
                    status: 'published',
                    description: 'Comprehensive analysis of royalty rates across multiple industries for 2025.',
                    author: 'Senior Tax Expert',
                    createdAt: new Date().toISOString()
                },
                {
                    _id: '2',
                    title: 'EU Corporate Tax Compliance Guide',
                    category: 'Tax Law',
                    country: 'European Union',
                    status: 'published',
                    description: 'A deep dive into the latest EU corporate tax regulations and compliance strategies.',
                    author: 'Compliance Lead',
                    createdAt: new Date().toISOString()
                },
                {
                    _id: '3',
                    title: 'Mining Sector Royalty Framework - Africa',
                    category: 'Mining',
                    country: 'South Africa',
                    status: 'draft',
                    description: 'Drafting the new framework for mining royalties in Southern Africa.',
                    author: 'Industry Analyst',
                    createdAt: new Date().toISOString()
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const deleteReport = async (id: string) => {
        if (!confirm('Are you sure you want to delete this report?')) return;
        setReports(reports.filter((r) => r._id !== id));
        toast.success('Report deleted successfully');
        onReportDeleted();
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'published': return 'bg-green-100 text-green-700';
            case 'draft': return 'bg-yellow-100 text-yellow-700';
            case 'archived': return 'bg-slate-100 text-slate-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold text-slate-800">All Reports</h3>
                    <p className="text-sm text-slate-600 mt-1">{reports.length} total reports</p>
                </div>
            </div>

            <div className="divide-y divide-slate-200">
                {reports.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                        No reports found. Create your first report!
                    </div>
                ) : (
                    reports.map((report) => (
                        <div key={report._id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <FileText className="text-orange-600" size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-semibold text-slate-800">{report.title}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <Building2 size={14} className="text-slate-400" />
                                            {report.category}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} className="text-slate-400" />
                                            {report.country}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{report.description}</p>
                                    <div className="flex items-center space-x-4 mt-3">
                                        <div className="flex items-center space-x-1">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span className="text-xs text-slate-500">
                                                Revised {new Date(report.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="text-xs font-semibold text-orange-600">
                                            By {report.author}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download Report">
                                    <Download size={18} />
                                </button>
                                <button
                                    onClick={() => deleteReport(report._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete report"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
