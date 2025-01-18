/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xlg: '1280px',
        lg: '1000px',
        '900px': '900px',
        md: '768px',
        sm: '620px',
        xs: '420px',
      },
    },
  },

  plugins: [],
};
