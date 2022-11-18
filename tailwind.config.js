/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lila: {
          100: "#f3eafb",
          200: "#e7d4f7",
          300: "#c295ea",
          400: "#9e55dd",
          500: "#852ad5",
          600: "#501980",
          700: "#3b135e",
          800: "#280d40",
          900: "#150722",
        },
      },
      boxShadow: ({ theme }) => ({
        backdrop: `0 0 0 2px ${theme.colors.violet}`,
      }),
      animation: {
        shimmer: "shimmer 3s infinite 1s",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
