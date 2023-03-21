/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      RobotoSerif: ['Roboto Serif'],
    },
    extend: {
      animation: {
        'spin-slow': 'spin 22s linear infinite',
      }
    },
  },
  plugins: [],
}
