/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0.02em' }],
      sm: ['0.8125rem', { lineHeight: '1.35rem' }],
      base: ['0.9375rem', { lineHeight: '1.65rem' }],
      lg: ['1.0625rem', { lineHeight: '1.7rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '1.9rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.6rem' }],
      '5xl': ['3rem', { lineHeight: '1.15' }],
      '6xl': ['3.5rem', { lineHeight: '1.1' }],
      '7xl': ['4.25rem', { lineHeight: '1.05' }],
      '8xl': ['5rem', { lineHeight: '1' }]
    },
    extend: {
      fontFamily: {
        display: ['Palanquin', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        palanquin: ['Palanquin', 'system-ui', 'sans-serif'],
        montserrat: ['Manrope', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#F3F3F1',
        'coral-red': '#c42126',
        brand: {
          DEFAULT: '#c42126',
          soft: '#f7e8e9',
          deep: '#9e1a1e'
        },
        ink: {
          DEFAULT: '#1a1a1a',
          muted: '#5c5c5c',
          soft: '#8a8a8a'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f6f6f4',
          raised: '#efefed',
          dark: '#141414',
          'dark-raised': '#1e1e1e'
        },
        'slate-gray': '#5c5c5c',
        'pale-blue': '#F3F3F1',
        'white-400': 'rgba(255, 255, 255, 0.72)'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26, 26, 26, 0.04), 0 8px 24px rgba(26, 26, 26, 0.06)',
        nav: '0 1px 0 rgba(26, 26, 26, 0.06), 0 8px 24px rgba(26, 26, 26, 0.04)',
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.08)',
        focus: '0 0 0 3px rgba(196, 33, 38, 0.25)'
      },
      borderRadius: {
        brand: '0.375rem',
        'brand-lg': '0.75rem'
      },
      maxWidth: {
        content: '72rem',
        wide: '80rem'
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        nav: '4.25rem'
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      transitionDuration: {
        brand: '320ms'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.45s ease both',
        'slide-down': 'slide-down 0.28s cubic-bezier(0.22, 1, 0.36, 1) both'
      },
      screens: {
        wide: '1440px'
      }
    }
  },
  plugins: []
};
