// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/UserContext';
import { AuthGuard } from '../components/auth/AuthGuard';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  // Pages that don't require authentication
  const isPublicPage = Component.displayName === 'Home'; // Add other public pages as needed

  return (
    <UserProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      )}
    </UserProvider>
  );
}

export default App;