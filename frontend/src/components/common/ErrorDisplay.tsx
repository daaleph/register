// src/components/common/ErrorDisplay.tsx
import React from 'react';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="error-display">
      <p className="error-message">{error}</p>
      {onRetry && (
        <button 
          className="retry-button"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};