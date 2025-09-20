'use client';

import { useHeader } from '@/context/HeaderContext';
import { Button } from './ui/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GuardedLink } from './GuardedLink';

export default function Header() {
  const { title } = useHeader(); // Usar el hook para obtener el título del contexto
  const { toggleMobileMenu, isDesktopCollapsed } = useSidebarStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <header className='relative flex h-20 shrink-0 items-center justify-between bg-body-dashboard px-4 md:px-6'>
      {/* --- Contenido Izquierda --- */}
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

        {isDesktop && isDesktopCollapsed && (
          <GuardedLink href='/dashboard' className='ml-4 flex items-center'>
            <Image
              src='/logo de universitas legal.svg'
              alt='Universitas Legal Logo'
              width={120}
              height={75}
            />
          </GuardedLink>
        )}
      </div>

      {/* --- Título Centrado Absoluto --- */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className={cn('text-3xl font-semibold text-primary-blue')}>
          {title}
        </h1>
      </div>

      {/* --- Columna Derecha (Vacía para mantener el balance) --- */}
      <div>
        {/* Aquí podrían ir íconos de notificaciones o perfil en el futuro */}
      </div>
    </header>
  );
}
