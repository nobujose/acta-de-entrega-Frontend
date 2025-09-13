// src/app/dashboard/revision/page.tsx
'use client';

import { useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function RevisionDeActaPage() {
  const { setTitle } = useHeader();

  // Actualiza el título del Header al cargar la página
  useEffect(() => {
    setTitle('Panel de Actas');
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
              Gestiona, corrige y perfecciona todas tus actas en un solo lugar.
            </h2>
            <p className='text-base'>
              El Panel de Actas es tu centro de control exclusivo de la versión
              Pro.
              <br />
              Guarda un historial de todos tus documentos, revisa su estado,
              edita la información y genera el acta final para enviarla por
              correo o compartirla con un enlace seguro.
            </p>
          </div>

          {/* Botón de acción */}
          {/* En móvil, este botón se mostrará debajo del texto */}
          <Button
            asChild
            className='bg-button-gold hover:bg-button-gold/90 text-primary-blue font-semibold whitespace-nowrap w-full md:w-auto'
          >
            <a href='#' target='_blank' rel='noopener noreferrer'>
              Adquirir versión PRO
              <ArrowRight className='ml-2 h-5 w-5' />
            </a>
          </Button>
        </div>

        {/* Línea separadora */}
        <div className='h-px w-full bg-white/20 my-6' />

        {/* Lista de características */}
        <div>
          <p className='text-base font-semibold'>
            Con el Panel de Actas Pro podrás:
          </p>
          <ul className='list-disc list-inside mt-2 space-y-1 text-base'>
            <li>
              Visualizar y editar todas tus actas guardadas en cualquier
              momento.
            </li>
            <li>Recibir alertas automáticas sobre anexos faltantes.</li>
            <li>
              Corregir y regenerar tus documentos cuantas veces sea necesario.
            </li>
            <li>Tener un historial completo para una gestión impecable.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
