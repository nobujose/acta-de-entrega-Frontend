'use client';

import { useHeader } from '@/context/HeaderContext';
import { Button } from './ui/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebarStore } from '@/stores/useSidebarStore';

export default function Header() {
  const { title } = useHeader(); // Usar el hook para obtener el título del contexto
  const { toggleMobileMenu } = useSidebarStore();

  return (
    <header className='flex h-20 shrink-0 items-center justify-between bg-body-dashboard px-4 md:px-6'>
      <div className='flex items-center gap-4'>
        {/* Botón visible solo en móvil que controla el menú */}
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 shrink-0 text-black hover:bg-gray-200 md:hidden'
          onClick={toggleMobileMenu}
        >
          <GiHamburgerMenu className='h-5 w-5' />
        </Button>
        {/* Título dinámico */}
        <h1 className='text-3xl font-semibold text-primary-blue'>{title}</h1>
      </div>
    </header>
  );
}
