import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Handle paths with special characters
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  },
  // Improve font loading and handle network issues
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
};

export default nextConfig;
