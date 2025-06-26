/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif']
  },
  trailingSlash: false,
  // Generate sitemap and robots.txt
  generateBuildId: async () => {
    return 'portfolio-build-' + Date.now()
  },
  // Note: Security headers cannot be used with output: 'export'
  // They should be configured at the hosting level (Vercel, Netlify, etc.)
};

module.exports = nextConfig;
