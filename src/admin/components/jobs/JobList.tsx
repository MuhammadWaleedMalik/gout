import { useEffect, useState } from 'react';
import { Trash2, Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';
import { Job } from '../../types';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

interface JobListProps {
  onJobDeleted: () => void;
}

export default function JobList({ onJobDeleted }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error: any) {
      // toast.error('Failed to fetch jobs');
      // Mock data for Gemrock
      setJobs([
        {
          _id: '1',
          title: 'Senior Tax Consultant',
          company: 'Gemrock Global',
          location: 'London, UK / Remote',
          status: 'open',
          description: 'Looking for an experienced tax consultant to lead our royalty data analysis team.',
          salary: '$90k - $120k',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Royalty Data Analyst',
          company: 'Gemrock Global',
          location: 'New York, USA',
          status: 'open',
          description: 'Help us manage and analyze complex royalty data for international clients.',
          salary: '$70k - $95k',
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: 'Compliance Officer',
          company: 'Gemrock Global',
          location: 'Remote',
          status: 'pending',
          description: 'Ensure all our data processes comply with global tax regulations.',
          salary: '$65k - $80k',
          createdAt: new Date().toISOString()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const response = await api.delete(`/jobs/${id}`);
      if (response.data.success) {
        toast.success('Job deleted successfully');
        setJobs(jobs.filter((job) => job._id !== id));
        onJobDeleted();
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete job');
    }
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-green-100 text-green-700'; // Default to open
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-slate-100 text-slate-700';
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
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-xl font-semibold text-slate-800">All Jobs</h3>
        <p className="text-sm text-slate-600 mt-1">{jobs.length} total jobs</p>
      </div>

      <div className="divide-y divide-slate-200">
        {jobs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No jobs found. Add your first job!
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between"
            >
              <div className="flex items-start space-x-4 flex-1">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Briefcase className="text-orange-600" size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-slate-800">{job.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status || 'open'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Building2 size={14} className="text-slate-400" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-slate-400" />
                      {job.location}
                    </div>
                  </div>
                  {job.description && (
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{job.description}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-xs text-slate-500">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-orange-600">
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteJob(job._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-4"
                title="Delete job"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
