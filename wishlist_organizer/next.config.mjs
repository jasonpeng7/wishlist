/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jvbuyciuhqlslpypafbu.supabase.co',
      },
    ],
  },
};

export default nextConfig;
