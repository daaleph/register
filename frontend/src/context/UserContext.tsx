// frontend/src/context/UserContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { UserProfile } from '../models/interfaces';
import { ProgressIncrements } from '@/components/navigation/phases';


interface UserContextType {
  // Core user data
  userProfile: UserProfile | null;
  responses: Map<string, number[] | number>;
  currentPhase: 'PROFILE' | 'BFI' | 'PRODUCT';
  progress: Map<'PROFILE' | 'BFI' | 'PRODUCT', number>;
  // authToken: string | null;
  error: string | null;
  isLoading: boolean;

  // State setters
  setUserProfile: (PROFILE: UserProfile) => void;
  setResponses: (variable: string, answer: number[] | number) => void;
  setCurrentPhase: (phase: 'PROFILE' | 'BFI' | 'PRODUCT') => void;
  setProgress: () => void;
  // setAuthToken: (token: string) => void;
  setError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;

  // Phase management
  canTransitionToNextPhase: () => boolean;
  moveToNextPhase: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core states
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [responses, setResponsesState] = useState<Map<string, number[] | number>>(new Map());
  const [currentPhase, setCurrentPhase] = useState<'PROFILE' | 'BFI' | 'PRODUCT'>('PROFILE');
  const [progress, setProgressState] = useState<Map<'PROFILE' | 'BFI' | 'PRODUCT', number>>(
    new Map([
      ['PROFILE', ProgressIncrements.PROFILE],
      ['BFI', ProgressIncrements.BFI],
      ['PRODUCT', ProgressIncrements.PRODUCT]
    ])
  );
  // const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Response management
  const setResponses = (variable: string, answer: number[] | number) => {
    setResponsesState(prevResponses => {
      const newResponses = new Map(prevResponses);
      newResponses.set(variable, answer);
      return newResponses;
    });
  };

  const setProgress = () => {
    setProgressState(prevProgress => {
      const newProgress = new Map(prevProgress);
      const increment = ProgressIncrements[currentPhase as keyof typeof ProgressIncrements];
      const currentValue = newProgress.get(currentPhase)!;
      newProgress.set(currentPhase, Math.min(100, currentValue + increment));
      return newProgress;
    });
  };

  const canTransitionToNextPhase = (): boolean => {
    const advanceOfPhase = progress.get(currentPhase);
    return advanceOfPhase ? advanceOfPhase >= 100: false;
  };

  const moveToNextPhase = () => {
    if (!canTransitionToNextPhase()) {
      setError('Please complete all required questions');
      return;
    }
    
    const phases: Array<'PROFILE' | 'BFI' | 'PRODUCT'> = ['PROFILE', 'BFI', 'PRODUCT'];
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1]);
      setProgress();
      setError(null);
    }
  };

  // Context value
  const value: UserContextType = {
    userProfile,
    responses,
    currentPhase,
    progress,
    // authToken,
    error,
    isLoading,
    setUserProfile,
    setResponses,
    setCurrentPhase,
    setProgress,
    // setAuthToken,
    setError,
    setIsLoading,
    canTransitionToNextPhase,
    moveToNextPhase
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};