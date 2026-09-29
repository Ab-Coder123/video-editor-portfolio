/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Primary Vibrant Blue
          700: '#1d4ed8',
          800: '#1e40af', // Deep Royal Blue
          900: '#1e3a8a',
          950: '#172554',
        },
        slateText: {
          light: '#64748b',  // Soft Slate Grey
          main: '#475569',   // Standard Slate Grey
          dark: '#334155',   // Deep Slate Grey
          heading: '#1e293b' // Charcoal Slate
        }
      },
      fontFamily: {
        cairo: ['"Cairo"', 'sans-serif'],
        sans: ['"Cairo"', '"Plus Jakarta Sans"', 'sans-serif'],
        italicSerif: ['"Cairo"', 'sans-serif'],
      },
      boxShadow: {
        'blue-glow': '0 10px 30px -10px rgba(37, 99, 235, 0.25)',
        'soft-card': '0 4px 25px 0 rgba(148, 163, 184, 0.12)',
      }
    },
  },
  plugins: [],
}
