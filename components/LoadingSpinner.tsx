
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-24 h-24 border-8',
  };

  return (
    <div className={`
      ${sizeClasses[size]}
      border-amber-400
      border-t-transparent
      rounded-full
      animate-spin
    `}></div>
  );
};

export default LoadingSpinner;
