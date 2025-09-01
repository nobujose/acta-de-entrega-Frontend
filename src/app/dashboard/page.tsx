'use client';

import { useEffect } from 'react';
import Card from '@/components/Card';
import { FileOutput, FileInput, Stamp } from 'lucide-react';
import { useHeader } from '@/context/HeaderContext';

export default function DashboardPage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Menú Principal');
  }, [setTitle]);

  return (
    <div className='grid grid-cols-1 gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3'>
      <Card
        icon={<FileOutput className='h-6 w-6 text-white' />}
        title='Acta de Entrega Saliente'
        description='Genera el acta de entrega con facilidad para el Servidor Público Saliente.'
        hashtag='#UniversitasLegal'
        href='/dashboard/actas/saliente'
        gratis={true}
      />

      <Card
        icon={<FileInput className='h-6 w-6 text-white' />}
        title='Actas de Entrega Entrante'
        description='Genera el acta de entrega con facilidad para el Servidor Público Entrante.'
        hashtag='#UniversitasLegal'
        href='/dashboard/actas/entrante'
        gratis={true}
      />

      <Card
        icon={<Stamp className='h-6 w-6 text-white' />}
        title='Maxima Autoridad'
        description='General el acta de entrega con facilidad para el Servidor Público asignado por la Máxima Autoridad.'
        hashtag='#UniversitasLegal'
        href='/dashboard/actas/maxima-autoridad'
        gratis={true}
      />
    </div>
  );
}
