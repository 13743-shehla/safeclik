/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e17',
          card: '#111827',
          border: '#1e293b',
          cyan: '#00f2fe',
          blue: '#4facfe',
          neon: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace', 'Courier New'],
      }
    },
  },
  plugins: [],
}
