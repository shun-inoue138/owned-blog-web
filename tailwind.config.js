/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      main: "#303030",
      base: "#DCDCDC",
      accent: "#DC143C",
      main_text: "#303030",
      sub_text: "#708090",
      base_text: "#DCDCDC",
      success: "#0000FF",
      info: "#008000",
      alert: "#FF0000",
    },
    extend: {},
  },
  plugins: [],
};
