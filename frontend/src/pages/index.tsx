// frontend/src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import { ProfileService } from '../services/ProfileService';
import AuthService from '../services/AuthService';
import { ErrorDisplay } from '../components/common/ErrorDisplay';
import { UserProfile } from '@/models/interfaces';
import { LoadingState } from '@/components/common/LoadingState';
import styles from '../styles/index.module.css';
import Head from 'next/head';

const InitialRegistration: React.FC = () => {
  const router = useRouter();
  const { setUserProfile } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialToken, setInitialToken] = useState<string | null>('');
  const [formData, setFormData] = useState<UserProfile>({
    id: '',
    complete_name: '',
    preferred_name: '',
    email: '',
    movil: '',
    telegram: ''
  });

  const authService = AuthService.getInstance();

  useEffect(() => {
    async function getInitialToken() {
      setInitialToken(await authService.intialToken());
    }
    getInitialToken();
  }, [])

  useEffect(() => {
    if (initialToken) storeCsrfTokenAsCookie(initialToken);
  }, [initialToken])

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
      const profileService = ProfileService.getInstance();
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

  if (isLoading) return <LoadingState />

  return (
    <>  
      <Head>
        <title>Aleph</title>
        <meta name="title" content="Aleph - increasing universal wisdom" />
        <meta name="description" content="Discover Aleph, the site where eternity tends to converge." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aleph-space.org/" />
        <meta property="og:title" content="Aleph - increasing universal wisdom" />
        <meta property="og:description" content="Discover Aleph, the site where eternity tends to converge." />
        <meta property="twitter:url" content="https://www.aleph-space.org/" />
        <meta property="twitter:title" content="Aleph - increasing universal wisdom" />
        <meta property="twitter:description" content="Discover Aleph, the site where eternity tends to converge." />
      </Head>
      <div className={styles.registrationContainer}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.title}>Aleph</h1>
          <p className={styles.hardText}>Increasing universal wisdom.</p>
        </div>

        <div className={styles.privacyNotice}>
          <h3 className={styles.privacyTitle} style={{textAlign: 'center'}}>Seguridad</h3>
          <p className={styles.privacyText} style={{textAlign: 'right'}}>
            Nuestra información es sagrada. La proteje la misma dedicación de nuestros antepasados guardando sus tesoros en criptas tecnológicamente
            dentro del aleph comunicadas mejorando tu experiencia humana.
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.registrationForm}>
          <div className={styles.formGroup}>
            <label htmlFor="complete_name">Nombres y Apellidos *</label>
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

          <div className={styles.formGroup}>
            <label htmlFor="preferred_name">¿Cómo prefieres ser conocido? *</label>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
            <label htmlFor="movil">Número Móvil *</label>
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

          <div className={styles.formGroup}>
            <label htmlFor="telegram">Telegram</label>
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

          <p className={styles.calmText} style={{textAlign: 'right'}}>
            Toma tu tiempo. Respira. No habrá más prisas.
          </p>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creando Perfil...' : 'Comienza'}
          </button>
        </form>

        <div className={styles.formFooter}>
          <p className={styles.calmText} style={{textAlign: 'right'}}>
            Toma tu tiempo para asegurar información válida.
            Nuestra aventura comenzará.
            Solo si llegas hasta el final.
          </p>
        </div>
      </div>
    </>
  );
};

export default InitialRegistration;


const storeCsrfTokenAsCookie = (csrfToken: string) => {
  const cookieName = 'csrfToken';
  const maxAge = 60 * 60 * 24;
  const secure = process.env.NODE_ENV === 'production';
  const sameSite = 'Strict';
  document.cookie = `${cookieName}=${csrfToken}; Max-Age=${maxAge}; Path=/; ${
    secure ? 'Secure;' : ''
  } SameSite=${sameSite}`;
};