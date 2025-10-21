/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poly: ['"Poly"', "serif"],
        ubuntu: ['"Ubuntu"', "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("firefox", ":-moz-any(&)");
    },
  ],
};
