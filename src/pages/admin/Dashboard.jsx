import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-medium text-slate-400">Total Staff</h3>
          <p className="text-3xl font-bold text-white mt-2">4</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-medium text-slate-400">Total Results</h3>
          <p className="text-3xl font-bold text-white mt-2">150</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-medium text-slate-400">Pending Complaints</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      </div>
      <p className="mt-8 text-slate-500">Select a menu from the sidebar to manage content.</p>
    </div>
  );
}
