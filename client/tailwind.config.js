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
        dark: {
          950: '#07080C',
          900: '#0B0D14',
          850: '#0F121C',
          800: '#141826',
          750: '#1B2032',
          700: '#23293F',
          600: '#343D5D',
        },
        java: {
          light: '#FBBF24',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        backend: {
          emerald: '#10B981',
          teal: '#14B8A6',
          cyan: '#06B6D4',
        },
        accent: {
          indigo: '#6366F1',
          violet: '#8B5CF6',
          blue: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.12) 0%, rgba(99, 102, 241, 0.08) 35%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
