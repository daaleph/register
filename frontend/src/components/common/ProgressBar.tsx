import React from 'react';

interface ProgressBarProps {
  currentProgress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentProgress }) => {
  return (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${currentProgress}%` }}
      />
    </div>
  );
}; // [source](search_result_8)