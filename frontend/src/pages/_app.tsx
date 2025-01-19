// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import { AuthGuard } from "../components/auth/AuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </UserProvider>
  );
}