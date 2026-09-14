import React from 'react';

function Navbar({ onLogout, user, onPageChange }) {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🗺️ Maps Scraper</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => onPageChange('dashboard')}
            className="hover:bg-indigo-700 px-3 py-2 rounded transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => onPageChange('scraper')}
            className="hover:bg-indigo-700 px-3 py-2 rounded transition"
          >
            Scraper
          </button>
          <button
            onClick={() => onPageChange('results')}
            className="hover:bg-indigo-700 px-3 py-2 rounded transition"
          >
            Results
          </button>
          <button
            onClick={() => onPageChange('proxies')}
            className="hover:bg-indigo-700 px-3 py-2 rounded transition"
          >
            Proxies
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
