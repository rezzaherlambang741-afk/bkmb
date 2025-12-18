import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-slate-700 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Customer Service Center. All rights reserved.</p>
        <p className="mt-2">Professional & Trusted Service 24/7</p>
      </div>
    </footer>
  );
}
