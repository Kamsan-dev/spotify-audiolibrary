/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-bg' : '#181818'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}