/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n,
  experimental: {
    appDir: false
  },
  rewrites: async () => [
    {
      source: '/api/admin/:path*',
      destination: 'http://carmarket-eg.online/api/services/admin/:path*',
    },
    {
      source: '/api/:path*',
      destination: 'http://carmarket-eg.online/api/:path*', 
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
};

module.exports = nextConfig;