// src/pages/home.tsx
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/context/UserContext';
import AuthGuard from '@/components/auth/AuthGuard';
import styles from '@/styles/components.module.css';
import Head from 'next/head';

const HomePage: React.FC = () => {
    const { logout } = useAuth();
    const { userProfile } = useUser();

    return (
        <AuthGuard>
            <>
                <Head><title>Aleph</title></Head>
                <div className={styles.homeContainer}>
                    <h1>Welcome, {userProfile?.preferred_name || 'User'}!</h1>
                    <p>You have successfully completed the registration process.</p>
                    <button className={styles.logoutButton} onClick={logout}>
                        Logout
                    </button>
                </div>
            </>
        </AuthGuard>
    );
};

export default HomePage;