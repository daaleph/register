// src/components/common/LoadingState.tsx
import React from 'react';
import styles from '../../styles/components.module.css';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div style={{gap: '1rem', textAlign: 'center'}}>
      <div className={styles.loading}/>
      {message}
    </div>
  );
};