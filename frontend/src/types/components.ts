// src/types/components.ts
export interface LoadingStateProps {
  message?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface RouteGuardProps {
  children: React.ReactNode;
}