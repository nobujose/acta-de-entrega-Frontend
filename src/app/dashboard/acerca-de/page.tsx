// src/app/dashboard/acerca-de/page.tsx
'use client';

import { useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import Image from 'next/image'; // Importamos el componente de Imagen

export default function AcercaDePage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Acerca de');
  }, [setTitle]);

  return (
    <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
      <div className='p-8'>
        {/* Encabezado con Logo y Título */}
        <div className='flex flex-col sm:flex-row items-center text-center sm:text-left mb-6'>
          <Image
            src='/AZUL 250PX.svg' // Asegúrate de que tu logo esté en la carpeta `public`
            alt='Universitas Legal Logo'
            width={100}
            height={100}
            className='mb-4 sm:mb-0 sm:mr-6'
          />
          <div>
            <h2 className='text-3xl font-bold text-[#001A70] mb-2'>
              Acerca de Actas de Entrega
            </h2>
            <p className='text-md text-gray-500 italic'>
              Una solución innovadora de Universitas Services C.A.
            </p>
          </div>
        </div>

        {/* Separador */}
        <hr className='my-6' />

        {/* Contenido Principal */}
        <div className='space-y-4 text-gray-700 leading-relaxed'>
          <p>
            Actas de entrega es una innovadora plataforma digital diseñada para
            ser el principal asistente tecnológico de los servidores públicos en
            Venezuela. Nuestra aplicación transforma un proceso tradicionalmente
            complejo en una experiencia de usuario simple, estructurada y
            segura.
          </p>
          <p>
            El núcleo de nuestra plataforma es una interfaz intuitiva que guía
            al usuario a través de formularios inteligentes, facilitando la
            recopilación de toda la información necesaria de manera ordenada.
            Hemos creado un ecosistema que se adapta a las distintas necesidades
            de nuestros usuarios a través de dos versiones: una versión express,
            ideal para generar un documento de forma rápida y directa, y una
            versión pro, pensada para una gestión integral y a largo plazo.
          </p>
          <p className='p-4 bg-slate-50 border-l-4 border-[#001A70] rounded-r-lg'>
            <strong>La versión pro es el corazón de nuestra innovación.</strong>{' '}
            Ofrece un entorno robusto con almacenamiento seguro en la nube,
            permitiendo al usuario guardar, gestionar y editar sus documentos en
            cualquier momento y desde cualquier lugar. Además, integramos
            herramientas de inteligencia artificial que actúan como un asesor
            proactivo, generando alertas y sugerencias para asegurar la debida
            diligencia en cada paso.
          </p>
          <p>
            En Universitas Services C.A. estamos comprometidos con el desarrollo
            de soluciones digitales profesionales. Actas de entrega es un
            reflejo de esa visión: una aplicación potente, confiable y segura,
            diseñada no solo para generar un documento, sino para aportar
            tranquilidad, control y eficiencia a la importante labor de los
            servidores públicos de nuestro país.
          </p>
        </div>
      </div>
    </div>
  );
}
