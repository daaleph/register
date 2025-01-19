// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export const useAuth = () => {
    const { setAuthToken, authToken } = useUser();

    useEffect(() => {
        const token = authService.getToken();
        if (token && !authToken) {
            setAuthToken(token);
        }
    }, [authToken, setAuthToken]);

    const login = async (profileId: string) => {
        const { token } = await authService.login(profileId);
        setAuthToken(token);
        return token;
    };

    const logout = () => {
        authService.logout();
        setAuthToken('');
    };

    return {
        login,
        logout,
        isAuthenticated: !!authToken
    };
};