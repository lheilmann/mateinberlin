/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          500: "#414747",
          600: "#353a3a",
          700: "#242726",
          800: "#161716",
          900: "#070705",
        }
      }
    },
  },
  plugins: [],
}