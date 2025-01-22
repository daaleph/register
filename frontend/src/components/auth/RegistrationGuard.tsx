// src/components/auth/RegistrationGuard.tsx
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';
import { useEffect } from 'react';

export const RegistrationGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { userProfile } = useUser();

  useEffect(() => {
    if (!userProfile && !router.pathname.includes('/register/initial')) {
      router.push('/register/initial');
    }
  }, [userProfile, router]);

  return <>{children}</>;
};