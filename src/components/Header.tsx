'use client';

import { useHeader } from '@/context/HeaderContext';

export default function Header() {
  const { title } = useHeader(); // Usar el hook para obtener el título del contexto

  return (
    <header className='flex h-16 shrink-0 items-center justify-between bg-white px-4 md:px-6'>
      {/* Título dinámico */}
      <h1 className='text-xl font-semibold text-gray-700'>{title}</h1>
    </header>
  );
}
