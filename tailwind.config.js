/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "hsl(var(--tw-color-ocean-100))",
          200: "hsl(var(--tw-color-ocean-200))",
          300: "hsl(var(--tw-color-ocean-300))",
          400: "hsl(var(--tw-color-ocean-400))",
          500: "hsl(var(--tw-color-ocean-500))",
          600: "hsl(var(--tw-color-ocean-600))",
          700: "hsl(var(--tw-color-ocean-700))",
          800: "hsl(var(--tw-color-ocean-800))",
          900: "hsl(var(--tw-color-ocean-900))",
        },
      },
      boxShadow: ({ theme }) => ({
        backdrop: `0 0 0 2px ${theme.colors.violet}`,
      }),
      animation: {
        shimmer: "shimmer 3s infinite 1s",
        "fade-in": "fade-in 150ms ease-out",
        "fade-out": "fade-out 150ms ease-in",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
