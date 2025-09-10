import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#001A70', // Tu azul principal
        'primary-blue-dark': '#00114D', // Un tono más oscuro para el hover
        'gris-bg': '#C1C1C1', // Color gris para el fondo
        'sidebar-hover-bg': '#A9A9A9', // Color para el hover
        'badge-gold': '#FFC200', // Color dorado para la etiqueta "Express"
        'button-gold': '#E6AF01', // Color dorado para botones
        'icon-gray-bg': '#F3F4F6', // Color de fondo de icono gris "Express"
        'text-answer': '#4F7396', // Color del texto de la respuesta
        'body-dashboard': '#E8EDF2', // Color de fondo para el dashboard layout
      },
      boxShadow: {
        'blue-soft':
          '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.15)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
