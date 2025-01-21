// src/context/UserContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { UserProfile } from '../models/interfaces';

interface UserContextType {
  // Core user data
  userProfile: UserProfile | null;
  responses: Map<string, number[] | number>;
  currentPhase: string;
  progress: number;
  authToken: string | null;
  error: string | null;
  isLoading: boolean;

  // State setters
  setUserProfile: (profile: UserProfile) => void;
  setResponses: (variable: string, answer: number[] | number) => void;
  setCurrentPhase: (phase: string) => void;
  setProgress: (value: number) => void;
  setAuthToken: (token: string) => void;
  setError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;

  // Phase management
  canTransitionToNextPhase: () => boolean;
  moveToNextPhase: () => void;
} // [source](search_result_24)

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core states
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [responses, setResponsesState] = useState<Map<string, number[] | number>>(new Map());
  const [currentPhase, setCurrentPhase] = useState<string>('profile');
  const [progress, setProgress] = useState<number>(0);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // [source](search_result_24)[source](search_result_34)

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
        return 14; // var01-var14 from profile table
      case 'bfi':
        return 44; // var01-var44 from bfi_responses table
      case 'product':
        return 1; // At least one product response
      default:
        return 0;
    } // [source](search_result_34)
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
  }; //[source](search_result_24)

  // Context value
  const value: UserContextType = {
    userProfile,
    responses,
    currentPhase,
    progress,
    authToken,
    error,
    isLoading,
    setUserProfile,
    setResponses,
    setCurrentPhase,
    setProgress,
    setAuthToken,
    setError,
    setIsLoading,
    canTransitionToNextPhase,
    moveToNextPhase
  };// [source](search_result_24)

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; // [source](search_result_24)