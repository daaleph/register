// frontend/src/pages/index.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { ProfileService } from '../services/ProfileService';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import { UserProfile } from '@/models/interfaces';
import { LoadingState } from '@/components/common/LoadingState';

const InitialRegistration: React.FC = () => {
  const router = useRouter();
  const { setUserProfile } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UserProfile>({
    id: '',
    complete_name: '',
    preferred_name: '',
    email: '',
    movil: '',
    telegram: ''
  });

  const validateForm = (): boolean => {
    if (!formData.complete_name.trim()) {
      setError('Complete name is required');
      return false;
    }
    if (!formData.preferred_name.trim()) {
      setError('Preferred name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Valid email is required');
      return false;
    }
    if (!formData.movil.trim() || !/^\+?[\d\s-]{8,}$/.test(formData.movil)) {
      setError('Valid mobile number is required');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      const profileService = new ProfileService();
      const response = await profileService.createProfile(formData);
      const newProfile = {
        ...formData,
        id: response.id
      };
      setUserProfile(newProfile);
      router.push(`/profile`, undefined, { shallow: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while the profile is being created
  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="registration-container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="complete_name">Complete Name *</label>
          <input
            type="text"
            id="complete_name"
            name="complete_name"
            value={formData.complete_name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferred_name">Preferred Name *</label>
          <input
            type="text"
            id="preferred_name"
            name="preferred_name"
            value={formData.preferred_name}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="movil">Mobile Number *</label>
          <input
            type="tel"
            id="movil"
            name="movil"
            value={formData.movil}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telegram">Telegram Handle</label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            value={formData.telegram}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {error && <ErrorDisplay message={error} />}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Profile...' : 'Start Registration'}
        </button>
      </form>
    </div>
  );
};

export default InitialRegistration;