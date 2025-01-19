// src/components/auth/AuthGuard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';

const publicPaths = ['/'];

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const { authToken } = useUser();

    useEffect(() => {
        const isPublicPath = publicPaths.includes(router.pathname);
        if (!authToken && !isPublicPath) {
            router.push('/');
        }
    }, [authToken, router]);

    return <>{children}</>;
};