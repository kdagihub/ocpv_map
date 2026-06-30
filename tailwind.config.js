/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        agrilink: {
          bg: '#121212',
          card: '#1A1A1A',
          orange: '#f97316',
          green: '#22c55e',
        },
      },
    },
  },
  plugins: [],
}
