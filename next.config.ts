import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs'], // Make sure Clerk is handled correctly
  },
  // Disable edge functions and use the Node.js server runtime instead
  target: 'server', // Use 'server' to force serverless functions instead of edge functions
};

export default nextConfig;