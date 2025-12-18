import React from 'react';
import { cn } from '../utils/cn';

export default function Button({ children, className, variant = 'primary', ...props }) {
  const variants = {
    primary: "bg-primary hover:bg-blue-600 text-white",
    secondary: "bg-secondary hover:bg-sky-500 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border border-slate-500 hover:bg-slate-700 text-slate-300",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
