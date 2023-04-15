/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      keyframes: ({theme}) => ({
        fadeIn: {
          '0%': {backgroundColor: theme("colors.transparent")},
          '100%': {backgroundColor: "rgba(107, 114, 128, 0.6)"}
        }
      }),
      animation: {
        'fade-in-modal': 'fadeIn 0.15s ease-in-out forwards'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  future: {
    hoverOnlyWhenSupported: true,
  }
}
