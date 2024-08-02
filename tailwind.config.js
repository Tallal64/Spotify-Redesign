/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        sidebar: "#010A05",
        foreground: "#F2F2F2",
        Neutrals: {
          DEFAULT: "#808080",
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#000000",
        },
        Accent: {
          DEFAULT: "#1ED760",
          50: "#E9FBEF",
          100: "#D2F7DF",
          200: "#A5EFBF",
          300: "#78E7A0",
          400: "#4BDF80",
          500: "#1ED760",
          600: "#18AC4D",
          700: "#12813A",
          800: "#062B13",
          850: "#041F0E",
          900: "#03150A",
        },
      },
    },
  },
};
