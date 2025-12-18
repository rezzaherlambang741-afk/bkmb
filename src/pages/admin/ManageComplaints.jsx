import React, { useState, useEffect } from 'react';
import { subscribeToComplaints } from '../../services/db';

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToComplaints((data) => {
      setComplaints(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Manage Complaints</h1>

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div key={c.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-white">{c.name}</h3>
                <p className="text-xs text-slate-400">ID: {c.userID} | WA: {c.waNumber}</p>
              </div>
              <span className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-slate-300 bg-slate-900 p-3 rounded mt-2">
              "{c.complaintText}"
            </p>
            <div className="mt-4 flex justify-end">
              <a
                href={`https://wa.me/${c.waNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Reply via WA
              </a>
            </div>
          </div>
        ))}
        {complaints.length === 0 && (
          <div className="text-center text-slate-500 py-12 bg-slate-800/50 rounded-lg">
            No complaints found.
          </div>
        )}
      </div>
    </div>
  );
}
