// src/context/UserContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { UserProfile } from '../models/interfaces';

interface UserContextType {
  // Core user data
  userProfile: UserProfile | null;
  responses: Map<string, number[] | number>;
  currentPhase: string;
  progress: number;
  // authToken: string | null;
  error: string | null;
  isLoading: boolean;

  // State setters
  setUserProfile: (profile: UserProfile) => void;
  setResponses: (variable: string, answer: number[] | number) => void;
  setCurrentPhase: (phase: string) => void;
  setProgress: (value: number) => void;
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
  const [currentPhase, setCurrentPhase] = useState<string>('profile');
  const [progress, setProgress] = useState<number>(0);
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

  // Phase transition logic
  const getRequiredResponsesForPhase = (phase: string): number => {
    switch (phase) {
      case 'profile':
        return 14;
      case 'bfi':
        return 44;
      case 'product':
        return 1;
      default:
        return 0;
    }
  };

  const canTransitionToNextPhase = (): boolean => {
    const requiredResponses = getRequiredResponsesForPhase(currentPhase);
    return Array.from(responses.keys()).length >= requiredResponses;
  };

  const moveToNextPhase = () => {
    if (!canTransitionToNextPhase()) {
      setError('Please complete all required questions');
      return;
    }
    
    const phases = ['profile', 'bfi', 'product'];
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1]);
      setProgress(0);
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