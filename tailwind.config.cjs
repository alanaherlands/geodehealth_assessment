/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-olive-100": "#313628",
        "black-olive-50": "#606A4E",
        "gray-70": "#595358",
        "gray-40": "#888187",
        "gray-10": "#E3EBDE",
        "light-blue-100": "#224A6D",
        "light-blue-70": "#83B0D8",
        "light-blue-30": "#BDD5EA",
        "green-100": "#54BF6A",
        "green-70": "#73C881",
      },
    },
  },
  plugins: [],
};
