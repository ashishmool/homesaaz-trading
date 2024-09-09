/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['10px', '14px'],
      sm: ['12px', '18px'],
      base: ['14px', '17.5px'],
      lg: ['16px', '19.94px'],
      xl: ['18px', '22.38px'],
      '2xl': ['22px', '27.26px'],
      '3xl': ['26px', '48px'],
      '4xl': ['46px', '56px'],
      '8xl': ['94px', '104px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: '#ECEEFF',
        'coral-red': '#c42126',
        'slate-gray': '#6D6D6D',
        'pale-blue': '#F5F6FF',
        'white-400': 'rgba(255, 255, 255, 0.80)'
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        hero: "url('assets/images/collection-background.svg')",
        card: "url('assets/images/thumbnail-background.svg')"
      },
      screens: {
        wide: '1440px'
      }
    }
  },
  plugins: []
};
