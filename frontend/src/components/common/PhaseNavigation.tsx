// src/components/common/PhaseNavigation.tsx
import React from 'react';

interface PhaseNavigationProps {
    onPrevious: () => void;
    onNext: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
}

export const PhaseNavigation: React.FC<PhaseNavigationProps> = ({
    onPrevious,
    onNext,
    canGoBack,
    canGoForward
}) => {
    return (
        <div className="phase-navigation">
        <button 
            className="nav-button previous"
            onClick={onPrevious}
            disabled={!canGoBack}
        >
            Previous
        </button>
        <button 
            className="nav-button next"
            onClick={onNext}
            disabled={!canGoForward}
        >
            Next
        </button>
        </div>
    );
};