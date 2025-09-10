'use client';

import { useEffect } from 'react';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { FileDown, ShieldCheck, FileUp, ArrowRight } from 'lucide-react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from 'react-icons/fa';
import { FaSquareXTwitter, FaSquareTwitter } from 'react-icons/fa6';
import { HiDocumentArrowUp, HiDocumentArrowDown } from 'react-icons/hi2';
import { SiSpringsecurity } from 'react-icons/si';
import { useHeader } from '@/context/HeaderContext';

export default function DashboardPage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Menú Principal');
  }, [setTitle]);

  return (
    // ▼▼▼ CONTENEDOR PRINCIPAL RESPONSIVO ▼▼▼
    // Este div envuelve todo el contenido de la página.
    // 'w-full': Asegura que ocupe todo el ancho disponible.
    // 'max-w-7xl': Limita el ancho máximo a 1280px (el breakpoint 'xl') en pantallas grandes,
    //             evitando que el contenido se estire demasiado.
    // 'mx-auto': Centra el contenedor horizontalmente dentro de su padre.
    // 'space-y-8': Aplica un espacio vertical consistente entre sus hijos directos.
    <div className='w-full max-w-7xl mx-auto space-y-8'>
      {/* --- SECCIÓN DE TARJETAS --- */}
      {/* 'grid': Activa el layout de rejilla.
          'grid-cols-1': Por defecto (móvil), muestra una sola columna.
          'md:grid-cols-2': En pantallas medianas (768px) en adelante, cambia a dos columnas.
          'lg:grid-cols-3': En pantallas grandes (1024px) en adelante, cambia a tres columnas.
          'gap-8': Espacio uniforme entre las tarjetas.
      */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <Card
          icon={<HiDocumentArrowUp className='h-6 w-6 text-white' />}
          title='Acta de Entrega Saliente'
          description='Generar el acta de entrega con facilidad para el Servidor Público Saliente.'
          hashtag='#UniversitasLegal'
          href='/dashboard/actas/saliente'
          gratis={true}
        />
        <Card
          icon={<HiDocumentArrowDown className='h-6 w-6 text-white' />}
          title='Actas de Entrega Entrante'
          description='Generar el acta de entrega con facilidad para el Servidor Público Entrante.'
          hashtag='#UniversitasLegal'
          href='/dashboard/actas/entrante'
          gratis={true}
        />
        <Card
          icon={<SiSpringsecurity className='h-6 w-6 text-white' />}
          title='Maxima Autoridad'
          description='Generar el acta de entrega con facilidad para el Servidor Público asignado por la Máxima Autoridad.'
          hashtag='#UniversitasLegal'
          href='/dashboard/actas/maxima-autoridad'
          gratis={true}
        />
      </div>

      {/* --- SECCIÓN "CONÓCENOS Y SÍGUENOS" --- */}
      <div className='w-full rounded-xl bg-primary-blue text-white p-6 md:p-8 shadow-lg'>
        {/* Sección Superior Responsiva */}
        {/* 'flex-col': En móvil, los elementos se apilan verticalmente.
            'md:flex-row': En pantallas medianas, se colocan uno al lado del otro.
            'text-center md:text-left': El texto se centra en móvil y se alinea a la izquierda en escritorio.
        */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left'>
          <div className='max-w-3xl'>
            {/* 'text-2xl md:text-3xl': El tamaño de la fuente es más pequeño en móvil y más grande en escritorio. */}
            <h2 className='text-2xl md:text-3xl font-bold mb-2'>
              Conócenos y síguenos en nuestras redes
            </h2>
            <p className='text-base text-gray-300'>
              Forma parte de nuestra comunidad. Accede a todos nuestros cursos
              sobre diversos temas de la Administración Pública. Infórmate de
              temas de interés en nuestro medio digital, Ágora.
            </p>
          </div>
          <Button
            asChild
            // 'w-full md:w-auto': El botón ocupa todo el ancho en móvil para ser fácil de presionar,
            // y vuelve a su tamaño natural en escritorio.
            className='bg-button-gold hover:bg-button-gold/90 text-primary-blue font-semibold whitespace-nowrap w-full md:w-auto'
          >
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'
            >
              Más información
              <ArrowRight className='ml-2 h-5 w-5' />
            </a>
          </Button>
        </div>

        {/* Línea Separadora */}
        <div className='h-px w-full bg-white/20 my-6' />

        {/* Sección Inferior Responsiva */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          {/* 'text-xl md:text-2xl': Tamaño de fuente adaptable. */}
          <h3 className='text-xl md:text-2xl font-bold'>Síguenos en:</h3>
          <div className='flex items-center gap-4'>
            <a
              href='https://www.facebook.com/contratacionespublicas'
              target='_blank'
              rel='noopener noreferrer'
              className='p-1 rounded-full hover:bg-white/20 transition-colors'
            >
              <FaFacebookSquare className='h-7 w-7' />
            </a>
            <a
              href='https://www.instagram.com/universitas.legal/'
              target='_blank'
              rel='noopener noreferrer'
              className='p-1 rounded-full hover:bg-white/20 transition-colors'
            >
              <FaInstagramSquare className='h-7 w-7' />
            </a>
            <a
              href='https://www.linkedin.com/company/universitas-legal/'
              target='_blank'
              rel='noopener noreferrer'
              className='p-1 rounded-full hover:bg-white/20 transition-colors'
            >
              <FaLinkedin className='h-7 w-7' />
            </a>
            <a
              href='https://twitter.com/contratosve'
              target='_blank'
              rel='noopener noreferrer'
              className='p-1 rounded-full hover:bg-white/20 transition-colors'
            >
              <FaSquareXTwitter className='h-7 w-7' />
            </a>
            <a
              href='https://twitter.com/contratarve'
              target='_blank'
              rel='noopener noreferrer'
              className='p-1 rounded-full hover:bg-white/20 transition-colors'
            >
              <FaSquareTwitter className='h-7 w-7' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
