/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120', // Very dark blue
        surface: '#162032',    // Slightly lighter blue for cards/nav
        primary: '#3B82F6',    // Bright blue for main actions
        secondary: '#0EA5E9',  // Sky blue for secondary actions
        accent: '#F59E0B',     // Amber for highlights (like prizes/jackpots)
      }
    },
  },
  plugins: [],
}
