/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
      }
    },
  },
  plugins: [],
}