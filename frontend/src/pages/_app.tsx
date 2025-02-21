// frontend/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { UserProvider } from '../contexts/User';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );

}

export default App;