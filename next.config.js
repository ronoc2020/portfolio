/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Important for generating a static site
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors during builds
  },
  images: { unoptimized: true }, // Disable Next.js image optimization
  // If you later need rewrites or custom handling, you can add it here
};

module.exports = nextConfig;
