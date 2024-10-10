/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors during builds
  },
  images: { unoptimized: true }, // Disable Next.js image optimization 
  // distDir: 'build', // Uncomment this if you want to specify a custom output directory for .next files, not for export
};

module.exports = nextConfig;
