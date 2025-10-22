/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vermelho: '#ED150C',
        cinza: '#E3E3E3',
        preto: '#1B1B1B'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      boxShadow: {
        padrao: '0px 0px 10px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
}

