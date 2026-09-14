import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Scraper({ socket }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(20);
  const [options, setOptions] = useState({
    includeReviews: true,
    includeRatings: true,
    includePhotos: true,
    includeHours: true
  });
  const [loading, setLoading] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleStartScraping = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/scrape/start`, {
        searchQuery,
        limit: parseInt(limit),
        options
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentJob(response.data.jobId);
      
      if (socket) {
        socket.on(`job:${response.data.jobId}:progress`, (data) => {
          setProgress(data.progress);
        });
      }
    } catch (error) {
      alert('Error starting scraper: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">🔍 Start Scraping</h2>

      <form onSubmit={handleStartScraping} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search Query</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g., restaurants in New York"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Results Limit</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            min="1"
            max="500"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Options</label>
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
              />
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || !searchQuery}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Starting...' : '▶ Start Scraping'}
        </button>
      </form>

      {currentJob && (
        <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
          <h3 className="font-semibold mb-3">Job Progress</h3>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{progress}% Complete</p>
          <p className="text-xs text-gray-500 mt-1">Job ID: {currentJob}</p>
        </div>
      )}
    </div>
  );
}

export default Scraper;
