/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        azul: '#003BE5',
        verde: '#2FC18C',
        null: '#E1E5EB',
        marinho: '#00D5E2',
      },
    },

    screens: {
      sm: '394px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 1024px) { ... }

      lg: '1024px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
