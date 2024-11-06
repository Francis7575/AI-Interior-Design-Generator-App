import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs'], // Make sure Clerk is handled correctly
  },
};

export default nextConfig;