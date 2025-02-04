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
};

export default nextConfig;