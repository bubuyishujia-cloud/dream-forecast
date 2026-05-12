/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0a0e27',
        'space-blue': '#1a1f3a',
        'cosmic-purple': '#2d1b69',
        'star-gold': '#ffd700',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
