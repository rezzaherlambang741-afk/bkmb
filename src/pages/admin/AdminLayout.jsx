import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { subscribeToAuth, logout } from '../../services/auth';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">ADMIN PANEL</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white">Dashboard</Link>
          <Link to="/admin/staff" className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white">Manage Staff</Link>
          <Link to="/admin/results" className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white">Manage Results</Link>
          <Link to="/admin/complaints" className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white">Manage Complaints</Link>
          <Link to="/admin/jackpot" className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white">Manage Jackpot</Link>
          <Link to="/admin/settings" className="block px-4 py-2 rounded text-slate-300 hover:bg-slate-800 hover:text-white">Settings</Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button variant="danger" className="w-full" onClick={handleLogout}>Logout</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
