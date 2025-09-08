'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

// Componente para mostrar el estado
const StatusDisplay = ({
  icon,
  title,
  message,
  buttonText,
  onButtonClick,
  isLoading = false,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isLoading?: boolean;
}) => (
  <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center'>
    <div className='bg-white p-8 rounded-lg shadow-md max-w-sm w-full'>
      <div className='mx-auto mb-4'>{icon}</div>
      <h1 className='text-2xl font-bold text-gray-800 mb-2'>{title}</h1>
      <p className='text-gray-600 mb-6'>{message}</p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          disabled={isLoading}
          className='w-full bg-[#001A70] text-white py-2 px-4 rounded-md hover:bg-[#001A70]/90 transition-colors'
        >
          {isLoading ? 'Redirigiendo...' : buttonText}
        </button>
      )}
    </div>
  </div>
);

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setErrorMessage('No se encontró el token de verificación.');
      setStatus('error');
      return;
    }

    const verifyToken = async () => {
      try {
        // La URL de tu endpoint de backend para confirmar el correo
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email/${token}`;

        // Hacemos la llamada a la API desde el cliente
        await axios.get(apiUrl);

        // Si la llamada es exitosa, cambiamos el estado
        setStatus('success');

        // Redirigimos al usuario al login después de 3 segundos
        setTimeout(() => {
          router.push('/login?email_verified=true');
        }, 3000);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(
            error.response.data.message ||
              'El enlace no es válido o ha expirado.'
          );
        } else {
          setErrorMessage('Ocurrió un error al verificar el correo.');
        }
        setStatus('error');
      }
    };

    verifyToken();
  }, [searchParams, router]);

  if (status === 'loading') {
    return (
      <StatusDisplay
        icon={<Loader2 className='h-12 w-12 text-[#001A70] animate-spin' />}
        title='Verificando tu correo...'
        message='Por favor, espera un momento.'
      />
    );
  }

  if (status === 'success') {
    return (
      <StatusDisplay
        icon={<CheckCircle className='h-12 w-12 text-green-500' />}
        title='¡Correo Verificado!'
        message='Serás redirigido a la página de inicio de sesión en unos segundos.'
        buttonText='Ir a Iniciar Sesión'
        onButtonClick={() => router.push('/login?email_verified=true')}
        isLoading={true}
      />
    );
  }

  return (
    <StatusDisplay
      icon={<XCircle className='h-12 w-12 text-red-500' />}
      title='Error de Verificación'
      message={errorMessage}
      buttonText='Volver a Intentar'
      onButtonClick={() => router.push('/login')}
    />
  );
}
