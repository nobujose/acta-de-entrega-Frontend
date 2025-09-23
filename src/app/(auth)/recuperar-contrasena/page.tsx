// src/app/recuperar-contraseña/page.tsx
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  return (
    <div className='min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4 relative'>
      <Link
        replace
        href='/login'
        className='absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-800'
      >
        <FaArrowLeft className='mr-2 h-4 w-4' />
        Volver al inicio de sesión
      </Link>

      <div className='w-full max-w-lg bg-white p-8 sm:p-12 rounded-xl shadow-lg'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
