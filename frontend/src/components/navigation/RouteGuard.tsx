// src/components/navigation/RouteGuard.tsx
// import { useRouter } from 'next/router';
// import { useUser } from '../../context/UserContext';

export const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // const router = useRouter();
  // const { authToken, currentPhase } = useUser();

  // Add phase-based routing logic
  return <>{children}</>;
};