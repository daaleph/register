import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React's strict mode for catching potential issues.
  poweredByHeader: false, // Hides the "X-Powered-By: Next.js" header to reduce information leakage.
  swcMinify: true, // Enables SWC-based minification for better performance and security.
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Removes console logs in production.
  },
  async headers() {
    return [
      {
        source: "/(.*)", 
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none';", 
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_NEST_URL: process.env.NEXT_PUBLIC_NEST_URL,
    TOKEN: process.env.TOKEN
  },
};

export default nextConfig;