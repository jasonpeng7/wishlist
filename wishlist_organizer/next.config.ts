import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  experimental: {
    // Fix the serverActions type error by using the correct typing
    serverActions: {
      bodySizeLimit: "2mb",  // or whatever limit you want
      allowedOrigins: ["*"]  // or specific origins you want to allow
    }
  },
  pageExtensions: ['ts', 'tsx', 'mdx']
};

export default config;