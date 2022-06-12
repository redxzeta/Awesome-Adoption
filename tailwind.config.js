/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        valencia: {
          DEFAULT: "#DA4B4B",
          50: "#F9E3E3",
          100: "#F6D2D2",
          200: "#EFB1B1",
          300: "#E88F8F",
          400: "#E16D6D",
          500: "#DA4B4B",
          600: "#C52828",
          700: "#961F1F",
          800: "#671515",
          900: "#390C0C",
        },
        "silver-chalice": {
          DEFAULT: "#AAAAAA",
          50: "#FFFFFF",
          100: "#FCFCFC",
          200: "#E7E7E7",
          300: "#D3D3D3",
          400: "#BEBEBE",
          500: "#AAAAAA",
          600: "#8E8E8E",
          700: "#727272",
          800: "#565656",
          900: "#3A3A3A",
        },
      },
    },
  },
  plugins: [],
};
