/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d85f27",

          secondary: "#f2a4e4",

          accent: "#170075",

          neutral: "#1C161D",

          "base-100": "#3C3C49",

          info: "#6791E0",

          success: "#51DB8B",

          warning: "#E18E19",

          error: "#F0667D",
        },
      },
    ],
  },
};
