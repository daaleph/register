// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/components.module.css';

const LoginPage: React.FC = () => {
    const [email, setProfileId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const router = useRouter();

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
            router.push('/home');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid Profile ID, password, or authentication failed');
        }
    };
    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <div className={styles.formGroup}>
                <label htmlFor="email">eMail</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setProfileId(e.target.value)}
                    placeholder="tu Email"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="contraseña"
                />
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button className={styles.submitButton} onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;