/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c3e50",
        secondary: "#4ca1af",
        third: "#f14666",
        fourth: "#f3edff",
        gray: "#e0e7f0",
        grayDark: "#395e71",
        grayField: "#ccd0d7",
        greenBold: "#14532d",
        greenNomal: "#4ade80",
      },
    },
  },
  plugins: [],
};
