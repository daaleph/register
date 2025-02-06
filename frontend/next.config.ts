// frontend/next.config.ts
import type { NextConfig } from "next";
import loadEnv from './env.config';

loadEnv();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  env: {
    NEXT_PUBLIC_NEST_URL: process.env.NEXT_PUBLIC_NEST_URL,
    TOKEN: process.env.TOKEN
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-dbd642a535de4512bfae0a5fd40ab343.r2.dev',
        pathname: '/CULTURE/**',
      },
    ],
  }
};

export default nextConfig;