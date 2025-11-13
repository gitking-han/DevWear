/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ✅ Allow all HTTPS domains
      },
      {
        protocol: 'http',
        hostname: '**', // (optional) Allow all HTTP domains — not recommended for production
      },
    ],
  },
};

export default nextConfig;
