/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js", // Inclusione dei file di Flowbite
    "node_modules/flowbite-react/**/*.js", // Importa i componenti Flowbite React
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Importazione del plugin Flowbite
  ],
};

