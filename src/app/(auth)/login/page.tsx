import { LoginForm } from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='flex w-full min-h-screen'>
      {/* Panel Izquierdo (Azul) */}
      <div className='hidden lg:flex w-1/2 bg-[#001A70] text-white flex-col items-center justify-center p-12 text-center'>
        <div className='space-y-4'>
          <Image
            src='/blan.svg'
            alt='Universitas Legal Logo'
            width={250}
            height={250}
            className='mx-auto'
            priority
          />
        </div>
        <div className='mt-8'>
          <p className='text-3xl font-semibold'>
            Gestión simplificada de Actas de Entrega
          </p>
        </div>
      </div>

      {/* Panel Derecho (Formulario) y Layout Móvil */}
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center p-6'>
        <div className='lg:hidden mb-8'>
          <Image
            src='/Azul.svg'
            alt='Universitas Legal Logo'
            width={250}
            height={250}
            priority
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
