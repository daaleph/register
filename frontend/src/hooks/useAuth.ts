// frontend/src/hooks/useAuth.ts
import { useUser } from '@/context/UserContext';
import AuthService from '@/services/AuthService';

export const useAuth = () => {

  const auth = new AuthService();
  const { setAuthToken, authToken } = useUser();

  const login = async (email: string, password: string) => {
    const { accessToken } = await auth.login(email, password);
    setAuthToken(accessToken);
  };

  const logout = () => {
    setAuthToken(null);
  };

  return {
    login,
    logout,
    isAuthenticated: !!authToken,
  };
};