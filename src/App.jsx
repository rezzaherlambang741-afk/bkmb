import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SecurityWrapper from './components/SecurityWrapper';

// Public Pages
import Home from './pages/Home';
import Staff from './pages/Staff';
import Result from './pages/Result';
import Jackpot from './pages/Jackpot';
import Complaints from './pages/Complaints';
import Guide from './pages/Guide';

// Admin Pages
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageStaff from './pages/admin/ManageStaff';

function App() {
  return (
    <SecurityWrapper>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/result" element={<Result />} />
          <Route path="/jackpot" element={<Jackpot />} />
          <Route path="/keluhan" element={<Complaints />} />
          <Route path="/panduan" element={<Guide />} />

          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="staff" element={<ManageStaff />} />
            <Route path="results" element={<div className="text-white">Manage Results (Coming Soon)</div>} />
            <Route path="jackpot" element={<div className="text-white">Manage Jackpot (Coming Soon)</div>} />
            <Route path="settings" element={<div className="text-white">Settings (Coming Soon)</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SecurityWrapper>
  );
}

export default App;
