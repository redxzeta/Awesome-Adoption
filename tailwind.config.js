/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ["Amatic SC", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          primary: "#ef4444",

          secondary: "#831843",

          accent: "#170075",

          neutral: "#e7e5e4",

          "base-100": "#1f2937",

          info: "#6791E0",

          success: "#51DB8B",

          warning: "#E18E19",

          error: "#F0667D",

        }
      },
      {
        light: {
          primary: "#ef4444",

          secondary: "#831843",

          accent: "#170075",

          neutral: "#1C161D",

          "base-100": "#e7e5e4",

          info: "#6791E0",

          success: "#51DB8B",

          warning: "#E18E19",

          error: "#F0667D",
        }
      }
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
