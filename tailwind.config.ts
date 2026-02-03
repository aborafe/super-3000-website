/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        text: 'rgb(var(--color-text-rgb) / <alpha-value>)',
        muted: 'var(--color-muted)',
        border: 'rgb(var(--color-border-rgb) / <alpha-value>)'
      },
      fontFamily: {
        arabic: ['var(--font-ar)', 'system-ui', 'sans-serif'],
        english: ['var(--font-en)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 12px 24px rgba(15, 23, 42, 0.12)'
      },
      borderRadius: {
        card: '1rem'
      }
    }
  },
  plugins: []
};

export default config;
