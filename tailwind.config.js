/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        microphone: ['"Microphone Check Regular"', '"Microphone Check Regular Placeholder"', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#FF1E56',
          'pink-hover': '#e01648',
          dark: '#0c0c0e',
          card: '#141316',
          'card-hover': '#1a191e',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.16)',
          muted: '#8A8A93',
        },
      },
    },
  },
  plugins: [],
};
