// src/app/verificar-email/VerificationContent.tsx

'use client'; // 👈 ¡Muy importante! Marca este como un componente de cliente.

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerificationContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Verificando...');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (token && email) {
      // Aquí iría tu lógica para verificar el token con el backend
      console.log('Verificando token:', token, 'para el email:', email);
      setStatus(`Token encontrado. Verificando...`);
    } else {
      setStatus(
        'Error: Faltan los parámetros necesarios para la verificación.'
      );
    }
  }, [searchParams]);

  return (
    <div>
      <h1 className='text-2xl font-bold'>Verificación de Correo Electrónico</h1>
      <p className='mt-4'>{status}</p>
    </div>
  );
}
