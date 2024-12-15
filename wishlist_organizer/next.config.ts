import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"]
    }
  },
  // Add ESLint config
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx']
};

export default config;