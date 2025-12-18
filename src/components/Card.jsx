import React from 'react';
import { cn } from '../utils/cn';

export default function Card({ children, className }) {
  return (
    <div className={cn("bg-surface rounded-lg shadow-lg border border-slate-700 p-6", className)}>
      {children}
    </div>
  );
}
