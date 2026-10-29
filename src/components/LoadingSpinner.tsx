import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-sm font-medium text-brand-muted">{message}</p>
    </div>
  );
};
