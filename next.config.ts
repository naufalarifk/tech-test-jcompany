import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  experimental: {
    optimizePackageImports: [
      'react-hot-toast', 
      'next-themes', 
      'zustand',
      'axios',
      'yup'
    ],
    

    // turbo: {
    //   resolveAlias: {
    //     '@': './',
    //   },
    // },
  },

  compress: true,

  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;