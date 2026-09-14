import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function ResultsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/data/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchResults = async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/scrape/results/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(response.data.results);
      setSelectedJob(jobId);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    setExporting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/data/export/${selectedJob}?format=${format}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: format === 'csv' ? 'blob' : 'json'
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `results.${format}`;
      a.click();
    } catch (error) {
      alert('Error exporting: ' + error.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Scraping Jobs</h2>
        <div className="space-y-2">
          {jobs.map(job => (
            <button
              key={job._id}
              onClick={() => fetchResults(job.jobId)}
              className={`w-full p-4 text-left border-2 rounded-lg transition ${
                selectedJob === job.jobId
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{job.searchQuery}</p>
                  <p className="text-sm text-gray-600">{job.placesScraped}/{job.totalPlaces} places</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  job.status === 'completed' ? 'bg-green-200 text-green-800' :
                  job.status === 'in_progress' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {job.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedJob && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Results ({results.length})</h2>
            <div className="space-x-2">
              <button
                onClick={() => handleExport('csv')}
                disabled={exporting}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                📥 CSV
              </button>
              <button
                onClick={() => handleExport('json')}
                disabled={exporting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                📥 JSON
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading results...</p>
          ) : results.length === 0 ? (
            <p className="text-gray-500">No results available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Name</th>
                    <th className="text-left py-2 px-4">Address</th>
                    <th className="text-left py-2 px-4">Rating</th>
                    <th className="text-left py-2 px-4">Reviews</th>
                    <th className="text-left py-2 px-4">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{result.name}</td>
                      <td className="py-2 px-4 text-xs">{result.address}</td>
                      <td className="py-2 px-4">⭐ {result.rating}</td>
                      <td className="py-2 px-4">{result.reviews}</td>
                      <td className="py-2 px-4">{result.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
