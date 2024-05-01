/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          30: '#111827',
          20: '#6B7280',
          10: '#6B7280',
          '0': '#F3F4F6',
        },
        blue: {
          10: '#4f46e5',
          '0': '#6366F1'
        },
      },
    },
  },
  plugins: [],
}