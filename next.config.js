/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors during builds
  },
  images: { unoptimized: true }, // Disable Next.js image optimization
  distDir: 'build', // Specify a custom output directory
  // Additional configurations can go here
};

module.exports = nextConfig;
