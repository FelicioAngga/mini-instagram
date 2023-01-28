module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexeda: ["Lexend Deca", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
      transitionProperty: {
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}