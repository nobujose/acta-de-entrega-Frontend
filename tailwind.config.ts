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
        'sidebar-bg': '#C1C1C1', // Nuevo color del Sidebar
        'sidebar-hover-bg': '#A9A9A9', // Nuevo color para el hover
        'badge-gold': '#FFC200', // Color dorado para la etiqueta "Express"
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
