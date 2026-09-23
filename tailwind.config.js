/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          dark: '#080C15',
          light: '#1E293B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6CA65',
          dark: '#B39126',
          subtle: '#FBF7E8',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          light: '#FFFFFF',
          card: '#FFFFFF',
          hover: '#F1F5F9',
        },
        luxury: {
          textPrimary: '#111827',
          textSecondary: '#475569',
          border: '#E2E8F0',
          borderLight: '#F1F5F9',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'luxury': '20px',
        'luxury-lg': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'luxury': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'luxury-hover': '0 20px 40px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(212, 175, 55, 0.15)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
