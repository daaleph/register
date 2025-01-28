// frontend/src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import AuthService from '@/services/AuthService';

const authService = new AuthService();

export const useAuth = () => {
  const { setAuthToken, authToken } = useUser();

  useEffect(() => {
    const token = authService.getToken();
    if (token && !authToken) {
      setAuthToken(token);
    }
  }, [authToken, setAuthToken]);

  const login = async (email: string, password: string) => {
    const { accessToken } = await authService.login(email, password);
    setAuthToken(accessToken);
    return accessToken;
  };

  const logout = () => {
    authService.logout();
    setAuthToken(null);
  };

  return {
    login,
    logout,
    isAuthenticated: !!authToken,
  };
};