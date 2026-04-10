import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps & { indicatorClassName?: string }> = ({ value, className, indicatorClassName }) => {
  return (
    <div className={`w-full bg-slate-100 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className={`bg-utas-blue h-full transition-all duration-500 ease-out ${indicatorClassName}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};
