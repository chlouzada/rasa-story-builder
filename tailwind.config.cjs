/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#5a17ee",
        secondary: "#2c3951",
      }
    },
  },
  plugins: [],
};
