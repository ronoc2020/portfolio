import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enables dark mode toggling via classes
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Path to your page components
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Path to your reusable components
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Additional paths for any app directory
  ],
  theme: {
    extend: {
      // Define custom colors
      colors: {
        primary: 'var(--primary-color)', // Custom primary color variable
        secondary: 'var(--secondary-color)', // Custom secondary color variable
        background: 'var(--background-color)', // Custom background color variable
        // Additional custom colors can be added here
      },
      // Define custom fonts
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default sans font
        heading: ['Montserrat', 'sans-serif'], // Font for headings
        // Additional font families can be added here
      },
      // Define custom animations
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate', // Glow animation
      },
      // Define keyframes for animations
      keyframes: {
        glow: {
          '0%': {
            textShadow: '0 0 5px #8a2be2, 0 0 10px #8a2be2, 0 0 15px #8a2be2',
          },
          '100%': {
            textShadow: '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2',
          },
        },
      },
    },
  },
  // Add plugins to extend Tailwind's functionality
  plugins: [
    require('tailwindcss-animate'), // Tailwind CSS animate plugin
    // Add any additional plugins as needed
  ],
};

export default config;
