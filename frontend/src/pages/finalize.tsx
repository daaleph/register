import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '@/services/AuthService';
import { useUser } from '@/context/UserContext';
import styles from '../styles/index.module.css';

const FinalizePage: React.FC = () => {
  const { setAuthToken, userProfile } = useUser();
  const router = useRouter();
  const authService = new AuthService();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    length: false,
    number: false,
    uppercase: false,
    lowercase: false,
    // special: false,
  });

  const validatePassword = (pass: string) => {
    const validations = {
      length: pass.length >= 8,
      number: /\d/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      // special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };
    setValidationErrors(validations);
    return Object.values(validations).every(Boolean);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleFinalize = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validatePassword(password)) {
      setError('Por favor, cumple con todos los requisitos de la contraseña');
      return;
    }
    setIsLoading(true);
    try {
      if (!userProfile?.id) throw new Error('Profile ID not found');
      if (!password) throw new Error('Password is required');
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
    <div className={styles.registrationContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.title}>Casi Listo</h1>
        <p className={styles.hardText}>Elige tu llave para el <span className={styles.gothicText}>aleph</span></p>
      </div>

      <form onSubmit={handleFinalize} className={styles.registrationForm}>
        <div className={styles.formGroup} style={{textAlign: 'center'}}>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Contraseña"
          />
          
          <div className={styles.passwordRequirements}>
            <p>Tu contraseña debe tener:</p>
            <ul>
              <li className={validationErrors.length ? styles.valid : styles.invalid}>
                Mínimo 8 caracteres
              </li>
              <li className={validationErrors.number ? styles.valid : styles.invalid}>
                Al menos un número
              </li>
              <li className={validationErrors.uppercase ? styles.valid : styles.invalid}>
                Al menos una mayúscula
              </li>
              <li className={validationErrors.lowercase ? styles.valid : styles.invalid}>
                Al menos una minúscula
              </li>
              {/* <li className={validationErrors.special ? styles.valid : styles.invalid}>
                Al menos un carácter especial (!@#&#36;%^&amp;*(),.?&quot;:&#123;&#125;|&lt;&gt;)
              </li> */}
            </ul>
          </div>
        </div>

        {error && <div className={styles.errorDisplay}>{error}</div>}

        <button 
          type="submit" 
          disabled={isLoading || !Object.values(validationErrors).every(Boolean)}
          className={styles.submitButton}
          style={{width: 'auto'}}
        >
          {isLoading ? 'Sellando Tu Futuro...' : 'Terminar'}
        </button>

        <div className={styles.formFooter}>
          <p className={styles.calmText}>
            Escoge una fuerte contraseña que proteja tu santuario
          </p>
        </div>
      </form>
    </div>
  );
};

export default FinalizePage;