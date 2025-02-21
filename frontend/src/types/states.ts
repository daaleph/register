// src/types/states.ts
export interface PhaseState {
  currentPhase: string;
  progress: number;
  isComplete: boolean;
}

export interface ErrorState {
  message: string;
  code?: string;
  details?: unknown;
}