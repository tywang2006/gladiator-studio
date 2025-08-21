/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        secondary: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },
        accent: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-elegant': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-warm': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      boxShadow: {
        'elegant': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'soft': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};