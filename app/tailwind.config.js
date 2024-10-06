/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F5F5F5', // Light gray for light mode
          DEFAULT: '#FFFFFF', // White for default
          dark: '#1F1F1F', // Dark gray for dark mode
        },
        accent: {
          gray: '#B0B0B0', // Soft gray for accents
          darkGray: '#4b5563', // Medium gray for darker accents
          black: '#000000', // Pure black for strong accents
        },
      },
    },
  },
  plugins: [],
};

