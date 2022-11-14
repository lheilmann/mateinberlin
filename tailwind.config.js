/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: ({ theme }) => ({
        backdrop: `0 0 0 2px ${theme.colors.violet}`,
      }),
    },
  },
  plugins: [],
};

//, -15px 0 30px -15px var(--colors-orangeA8), 0 0 30px -15px var(--colors-pinkA8), 15px 0 30px -15px var(--colors-violetA8)`,theme('colors.gray')
