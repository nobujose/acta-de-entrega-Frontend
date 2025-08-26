import { LoginForm } from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className='flex w-full min-h-screen'>
      {/* Panel Izquierdo (Azul) */}
      <div className='hidden lg:flex w-1/2 bg-[#001A70] text-white flex-col items-center justify-center p-12 text-center'>
        <div className='space-y-4'>
          <Image
            src='/logoBlanco.png'
            alt='Universitas Legal Logo'
            width={150}
            height={150}
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
            src='/logo.jpg'
            alt='Universitas Legal Logo'
            width={80}
            height={80}
            priority
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
