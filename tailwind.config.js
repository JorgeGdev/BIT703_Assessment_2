/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        'brand': {
          'green': '#2F4B4D',
          'green-dark': '#1f3234',
          'green-light': '#3f5b5d',
          'blue': '#4B7692',
          'blue-dark': '#3a5f75',
          'blue-light': '#5c8caa',
        },
      },
    },
  },
  plugins: [],
};
