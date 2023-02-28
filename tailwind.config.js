/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "index.html"
  ],
  theme: {
    extend: {
      scale: {
        '175': '1.75',
      },
      backgroundColor: {
        "main-primary": "#27ae60"
      }
    },
  },
  plugins: [],
}
