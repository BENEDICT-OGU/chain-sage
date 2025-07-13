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
        // Dark theme
        'block-dark': '#0f172a',
        'block-primary-dark': '#1e293b',
        'block-secondary-dark': '#334155',
        'block-accent-dark': '#0ea5e9',
        
        // Light theme
        'block-light': '#f8fafc',
        'block-primary-light': '#e2e8f0',
        'block-secondary-light': '#cbd5e1',
        'block-accent-light': '#0369a1',
        
        // Universal
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}