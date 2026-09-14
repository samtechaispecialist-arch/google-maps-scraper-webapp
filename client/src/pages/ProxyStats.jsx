import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function ProxyStats() {
  const [stats, setStats] = useState(null);
  const [proxies, setProxies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/proxies/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching proxy stats:', error);
    }
  };

  const fetchProxies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/proxies/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProxies(response.data.proxies);
    } catch (error) {
      console.error('Error fetching proxies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/proxies/refresh`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchStats();
    } catch (error) {
      alert('Error refreshing proxies: ' + error.message);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Total Proxies</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalProxies}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Working</h3>
            <p className="text-3xl font-bold text-green-600">{stats.workingProxies}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Failed</h3>
            <p className="text-3xl font-bold text-red-600">{stats.failedProxies}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Success Rate</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalProxies > 0 ? ((stats.workingProxies / stats.totalProxies) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Proxy List</h2>
          <div className="space-x-2">
            <button
              onClick={fetchProxies}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : '📋 View'}
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : '🔄 Refresh'}
            </button>
          </div>
        </div>

        {proxies.length === 0 ? (
          <p className="text-gray-500">Click "View" to load proxy list</p>
        ) : (
          <div className="space-y-2">
            {proxies.map((proxy, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded flex justify-between items-center">
                <span className="font-mono">{proxy}</span>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProxyStats;
