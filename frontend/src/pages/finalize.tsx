// frontend/src/pages/finalize.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '@/services/AuthService';
import { useUser } from '@/context/UserContext';

const FinalizePage: React.FC = () => {
  const { setAuthToken, userProfile } = useUser();
  const router = useRouter();
  const authService = new AuthService();

  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFinalize = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!userProfile?.id) throw new Error('Profile ID not found');
      if (!password) throw new Error('Password is required');

      // Call the finalizeRegistration method with profileId and password
      const { accessToken } = await authService.finalizeRegistrationWithPassword(userProfile.email, password);
      setAuthToken(accessToken);
      router.push('/home');
    } catch (error: any) {
      console.error('Failed to finalize registration:', error);
      setError(error.message || 'An error occurred');
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Finalize Registration</h1>
      <form onSubmit={handleFinalize}>
        <div>
          <label htmlFor="password">Set Your Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Finalizing...' : 'Finalize Registration'}
        </button>
      </form>
    </div>
  );
};

export default FinalizePage;