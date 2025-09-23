// src/app/dashboard/revision/page.tsx
'use client';

import { useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa';

export default function RevisionDeActaPage() {
  const { setTitle } = useHeader();

  // Actualiza el título del Header al cargar la página
  useEffect(() => {
    setTitle('Compliance Actas de Entrega');
  }, [setTitle]);

  return (
    <div className='flex justify-center items-start pt-10'>
      <div className='w-full max-w-4xl rounded-xl bg-primary-blue text-white p-8 shadow-lg'>
        {/* Contenedor principal responsivo 
            - 'flex-col': Apilado en móvil
            - 'md:flex-row': Lado a lado en pantallas medianas y grandes
        */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-6 mb-6'>
          {/* Título y descripción principal */}
          <div className='max-w-2xl'>
            <h2 className='text-2xl font-bold mb-4'>
              ¿Están tus Actas de Entrega a prueba de auditorías?
            </h2>
            <p className='text-base'>
              Un simple error en un acta de entrega puede resultar en hallazgos
              y sanciones.
              <br />
              Nuestra herramienta Revisión de Acta Pro te guía en una
              autoevaluación rápida para identificar incumplimientos y asegurar
              la correcta gestión de tu organismo.
            </p>
          </div>

          {/* Botón de acción */}
          {/* En móvil, este botón se mostrará debajo del texto */}
          <Button
            asChild
            className='bg-button-gold hover:bg-button-gold/90 text-primary-blue font-semibold whitespace-nowrap w-full md:w-auto'
          >
            <a
              href='https://api.whatsapp.com/send?phone=+584125253023&text=Hola,%20quiero%20adquirir%20Actas%20de%20Entregas%20PRO'
              target='_blank'
              rel='noopener noreferrer'
            >
              Adquirir versión PRO
              <FaArrowRight className='ml-2 h-5 w-5' />
            </a>
          </Button>
        </div>

        {/* Línea separadora */}
        <div className='h-px w-full bg-white/20 my-6' />

        {/* Lista de características */}
        <div>
          <p className='text-base font-semibold'>Con la versión Pro podrás:</p>
          <ul className='list-disc list-inside mt-2 space-y-1 text-base'>
            <li>Realizar una autoevaluación guiada paso a paso.</li>
            <li>Identificar incumplimientos según la normativa vigente.</li>
            <li>Obtener un informe detallado con recomendaciones de mejora.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
