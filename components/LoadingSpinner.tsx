
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : '';

  return (
    <div 
      className={`spinner-border text-warning ${sizeClass}`} 
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;