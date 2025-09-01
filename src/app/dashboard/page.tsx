import Card from '@/components/Card';
import { FileText } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className='grid grid-cols-1 gap-8 row-gap-5 md:grid-cols-2 lg:grid-cols-3'>
      <Card
        icon={<FileText className='h-6 w-6 text-white' />}
        title='Acta de Entrega Saliente'
        description='Servidor Público Saliente.'
        hashtag='#UniversitasLegal'
        href='/dashboard/compliance'
        gratis={true}
      />

      <Card
        icon={<FileText className='h-6 w-6 text-white' />}
        title='Actas de Entrega Entrante'
        description='Servidor Público Entrante.'
        hashtag='#UniversitasLegal'
        href='/dashboard/actas'
        gratis={true}
      />

      <Card
        icon={<FileText className='h-6 w-6 text-white' />}
        title='Maxima Autoridad'
        description='Acta de Entrega de la Maxima Autoridad.'
        hashtag='#UniversitasLegal'
        href='/dashboard/actas/maxima-autoridad'
        gratis={true}
      />
    </div>
  );
}
