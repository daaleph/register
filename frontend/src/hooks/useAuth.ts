// frontend/src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import AuthService from '@/services/AuthService';

export const useAuth = () => {

  const auth = new AuthService();
  const { setAuthToken, authToken } = useUser();

  useEffect(() => {
    const token = auth.getToken();
    if (token && !authToken) {
      setAuthToken(token);
    }
  }, [authToken, setAuthToken]);

  const login = async (email: string, password: string) => {
    const { accessToken } = await auth.login(email, password);
    setAuthToken(accessToken);
  };

  const logout = () => {
    auth.logout();
    setAuthToken(null);
  };

  return {
    login,
    logout,
    isAuthenticated: !!authToken,
  };
};