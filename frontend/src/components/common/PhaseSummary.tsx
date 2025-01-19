// src/components/common/PhaseSummary.tsx
import React from 'react';
import { useUser } from '../../context/UserContext';

interface PhaseSummaryProps {
    onContinue: () => void;
}

export const PhaseSummary: React.FC<PhaseSummaryProps> = ({ onContinue }) => {
    const { currentPhase, responses } = useUser();

    const getPhaseTitle = () => {
        switch (currentPhase) {
        case 'profile':
            return 'Profile Questions Complete';
        case 'bfi':
            return 'BFI Assessment Complete';
        case 'product':
            return 'Product Preferences Complete';
        default:
            return 'Phase Complete';
        }
    };

    return (
        <div className="phase-summary">
        <h2>{getPhaseTitle()}</h2>
        <p>You have completed {responses.size} questions in this phase.</p>
        <button 
            className="continue-button"
            onClick={onContinue}
        >
            Continue to Next Phase
        </button>
        </div>
    );
};