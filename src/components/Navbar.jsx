import React from 'react';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  // We use a mix of internal paths and external flags
  const navLinks = [
    { name: 'HOME', path: '/', isExternal: false },
    { name: 'STAFF CS', path: '/staff', isExternal: false },
    { name: 'DATA RESULT', path: '/result', isExternal: false },
    { name: 'BUKTI JACKPOT', path: '/jackpot', isExternal: false },
    { name: 'PROMOSI', path: 'https://google.com', isExternal: true },
    { name: 'KELUHAN', path: '/keluhan', isExternal: false },
    { name: 'PANDUAN', path: '/panduan', isExternal: false },
  ];

  return (
    <nav className="bg-surface border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl tracking-wider">
              LOGO
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
