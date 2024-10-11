import type { Config } from 'tailwindcss';

const config: Config = {
  // Enable JIT mode for faster build times and on-demand class generation
  mode: 'jit',
  
  // Enable dark mode with class toggling
  darkMode: 'class',
  
  // Specify the paths to all of your template files
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Next.js page components
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Reusable components
    './app/**/*.{js,ts,jsx,tsx,mdx}', // New app directory structure if used
  ],
  
  theme: {
    // Customize the default theme
    extend: {
      // Custom colors
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        // Additional custom colors can go here
      },
      // Custom fonts
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        // Additional custom font families can go here
      },
      // Custom animations
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      // Keyframes for the custom animation
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
      // Breakpoints for responsive design
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },

  // Add plugins to extend Tailwind's functionality
  plugins: [
    require('@tailwindcss/forms'), // For better form styles
    require('@tailwindcss/typography'), // For better typography styles
    require('tailwindcss-animate'), // For custom animations
    // Add any other plugins as needed
  ],
};

export default config;
