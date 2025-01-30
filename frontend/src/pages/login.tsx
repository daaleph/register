// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import styles from '@/styles/index.module.css';
import { useAuth } from '@/hooks/useAuth';
import router from 'next/router';

const LoginPage: React.FC = () => {

    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin();
    };

    const handleLogin = async () => {
        try {
            if (!email.trim()) {
                setError('Profile ID is required');
                return;
            }
            if (!password.trim()) {
                setError('Password is required');
                return;
            }
            await login(email, password);
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid Profile ID, password, or authentication failed');
        } finally {
            router.push('/home');
        }
    };
    return (
        <div className={styles.registrationContainer}>
            <div className={styles.welcomeSection}>
                <h1 className={styles.title}>aleph</h1>
                <p className={styles.hardText}>Increasing universal wisdom.</p>
            </div>

            <form className={styles.registrationForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">eMail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu Email"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="contraseña"
                        required
                    />
                </div>

                {error && <div className={styles.errorDisplay}>{error}</div>}

                <button 
                    type="submit" 
                    className={styles.submitButton}
                >
                    Ingresar
                </button>

                <div className={styles.formFooter}>
                    <p className={styles.calmText} style={{textAlign: 'right'}}>
                        Vuelves a tu viaje de sabiduría.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;