import React from 'react';

interface StatusBadgeProps {
  status: 'Completed' | 'In Progress' | 'Active Development' | 'Production Ready' | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Production Ready':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Active Development':
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getDotStyle = () => {
    switch (status) {
      case 'Production Ready':
        return 'bg-emerald-400';
      case 'Completed':
        return 'bg-blue-400';
      case 'Active Development':
      case 'In Progress':
        return 'bg-amber-400 animate-pulse';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full border ${getBadgeStyle()} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotStyle()}`} />
      {status}
    </span>
  );
};
