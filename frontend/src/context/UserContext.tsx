import React, { createContext, useState, useContext } from 'react';
import { UserProfile } from '../models/types';

interface UserContextType {
  userProfile: UserProfile | null;
  responses: Map<string, number[] | number>;
  currentPhase: string;
  progress: number;
  authToken: string | null;
  setUserProfile: (profile: UserProfile) => void;
  setResponses: (variable: string, answer: number[] | number) => void;
  setCurrentPhase: (phase: string) => void;
  setProgress: (value: number) => void;
  setAuthToken: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [responses, setResponsesState] = useState<Map<string, number[] | number>>(new Map());
  const [currentPhase, setCurrentPhase] = useState<string>('profile');
  const [progress, setProgress] = useState<number>(0);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const setResponses = (variable: string, answer: number[] | number) => {
    setResponsesState(prevResponses => {
      const newResponses = new Map(prevResponses);
      newResponses.set(variable, answer);
      return newResponses;
    });
  };

  const value: UserContextType = {
    userProfile,
    responses,
    currentPhase,
    progress,
    authToken,
    setUserProfile,
    setResponses,
    setCurrentPhase,
    setProgress,
    setAuthToken
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}; // [source](search_result_1)

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};