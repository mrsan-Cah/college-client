/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // 🔴 THIS IS CRITICAL
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
