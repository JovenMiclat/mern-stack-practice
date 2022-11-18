/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {},
    extend: {
      fontFamily: {
        poppins: "Poppins",
        bebas: "Bebas Neue",
      },
    },
  },
  plugins: [],
};
