// src/app/dashboard/repositorio/page.tsx
'use client';

import { useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import { RepoCard } from '@/components/RepoCard';

const cardData = [
  {
    imageUrl: '/repositorio/Consideraciones-generales.png',
    description:
      'Para garantizar un proceso de entrega-recepción transparente, te invitamos a leer detenidamente las siguientes consideraciones',
    buttonText: 'Ingrese aquí',
    linkHref: '#',
  },
  {
    imageUrl: '/repositorio/descargar-resolucion.png',
    description: 'Descarga la Resolución CGR N°01-000162 de fecha 27-07-2009',
    buttonText: 'Descarga aquí',
    linkHref: '#',
  },
  {
    imageUrl: '/repositorio/Portada-para-APP.png',
    description:
      'Este programa te equipará con las competencias esenciales para la elaboración y gestión de Actas de Entrega. Profundiza en el marco jurídico y los procedimientos clave.',
    buttonText: 'Más información',
    linkHref: 'https://universitas.academy/cursos/actas-de-entrega/',
  },
  {
    imageUrl: '/repositorio/control-fiscal.png',
    description:
      'Domina la complejidad del control fiscal con la guía de Universitas Legal. Te ofrecemos acceso a una biblioteca legal exhaustiva, con la normativa y jurisprudencia clave.',
    buttonText: 'Ingrese aquí',
    linkHref: 'https://universitas.legal/control-fiscal/',
  },
  {
    imageUrl: '/repositorio/biblioteca-contrataciones.png',
    description:
      'Domina las Contrataciones Públicas con la guía de Universitas Legal. Te ofrecemos acceso a una biblioteca legal exhaustiva, con la normativa y jurisprudencia clave.',
    buttonText: 'Ingrese aquí',
    linkHref: 'https://universitas.legal/contrataciones-publicas/',
  },
  {
    imageUrl: '/repositorio/biblioteca-ordenanzas.png',
    description: 'Conoce las Ordenanzas Municipales',
    buttonText: 'Ingrese aquí',
    linkHref: 'https://universitas.legal/biblioteca-de-ordenanzas-municipales/',
  },
];

export default function RepositorioLegalPage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Repositorio Legal');
  }, [setTitle]);

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {cardData.map((card, index) => (
        <RepoCard
          key={index}
          imageUrl={card.imageUrl}
          description={card.description}
          buttonText={card.buttonText}
          linkHref={card.linkHref}
        />
      ))}
    </div>
  );
}
