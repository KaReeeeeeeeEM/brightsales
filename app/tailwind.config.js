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
          light: '#ddd', // Light gray for light mode
          DEFAULT: '#FFFFFF', // White for default
          glass: '#2f2f2f', //for divs and spans in dark mode
          dark: '#1F1F1F', // Dark gray for dark mode
        },
        accent: {
          gray: '#B0B0B0', // Soft gray for accents
          grayShade: '#6b728080', //slightly darker gray
          darkGray: '#4b5563', // Medium gray for darker accents
          black: '#000000', // Pure black for strong accents
        },
      },
    },
  },
  plugins: [],
};

