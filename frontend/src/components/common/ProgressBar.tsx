// src/components/common/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  currentProgress: number;
  phase: 'profile' | 'bfi' | 'product';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentProgress, phase }) => {
  const getPhaseColor = (phase: string): string => {
    switch (phase) {
      case 'profile':
        return '#4CAF50';
      case 'bfi':
        return '#2196F3';
      case 'product':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  const displayProgress = Math.min(100, Math.round(currentProgress * 100) / 100);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${currentProgress}%`,
            backgroundColor: getPhaseColor(phase)
          }}
        />
      </div>
      <div className="progress-label">
        {phase.toUpperCase()}: {displayProgress.toFixed(1)}%
      </div>
    </div>
  );
};