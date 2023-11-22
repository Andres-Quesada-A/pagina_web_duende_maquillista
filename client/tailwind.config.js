/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '300px',
      },
      width: {
        '1/7': '14.2857143%',
      }
    },
  },
  plugins: [],
}