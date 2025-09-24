// src/components/Header.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useHeader } from '@/context/HeaderContext';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from './ui/button';
import { GuardedButton } from './GuardedButton';
import { cn } from '@/lib/utils';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Header() {
  const { title } = useHeader();
  // Obtenemos del store las funciones y estados que necesitamos.
  // 'toggleMobileMenu' es la acción que este componente dispara.
  // 'isDesktopCollapsed' es un estado que este componente lee para reaccionar a él.
  const { toggleMobileMenu, isDesktopCollapsed } = useSidebarStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <header className='relative flex h-20 shrink-0 items-center justify-between bg-body-dashboard px-4 md:px-6'>
      {/* --- Contenido Izquierda --- */}
      <div className='flex items-center gap-4'>
        {/*
          Este es el botón clave para la experiencia móvil.
          - Se muestra solo en pantallas pequeñas (gracias a `md:hidden`).
          - Al hacer clic, llama a `toggleMobileMenu`.
          - Esta función actualiza el estado `isMobileMenuOpen` en tu store de Zustand.
          - El componente Sidebar.tsx (que ahora contiene el <Sheet />) está escuchando
            ese mismo estado, y se abrirá o cerrará automáticamente en respuesta.
          ¡Esta es la conexión! Simple, desacoplada y efectiva.
        */}
        <Button
          variant='ghost'
          onClick={toggleMobileMenu}
          aria-label='Abrir menú de navegación'
          className='h-11 w-11 flex items-center justify-center rounded-lg text-black hover:bg-gray-200 md:hidden'
        >
          <GiHamburgerMenu className='h-6 w-6' />
        </Button>

        {/*
          Esta lógica es excelente.
          - Se muestra solo en escritorio (`isDesktop`).
          - Y solo cuando el sidebar está colapsado (`isDesktopCollapsed`).
          - Esto complementa perfectamente nuestro nuevo Sidebar.tsx, que OCULTA el logo
            cuando está colapsado. El Header toma el relevo para mantener la marca visible.
        */}
        {isDesktop && isDesktopCollapsed && (
          <GuardedButton href='/dashboard' className='ml-4 flex items-center'>
            <Image
              src='/logo de universitas legal.svg'
              alt='Universitas Legal Logo'
              width={120}
              height={48} // Ajustar height para que coincida con el aspect ratio
              className='object-contain'
            />
          </GuardedButton>
        )}
      </div>

      {/* --- Título Centrado Absoluto --- */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-center text-xl font-semibold text-primary-blue sm:text-2xl md:text-3xl'>
          {title}
        </h1>
      </div>

      {/* --- Columna Derecha (Vacía para mantener el balance) --- */}
      {/* Usamos 'flex-1' en las columnas laterales y 'text-center' en el título
          para un centrado más robusto que el posicionamiento absoluto.
          Pero si el método actual te funciona bien, no hay problema en mantenerlo.
          Este div vacío ayuda a que `justify-between` funcione correctamente.
      */}
      <div
        className='flex-shrink-0'
        style={{ width: isDesktop && isDesktopCollapsed ? '152px' : '52px' }}
      >
        {/* Este div actúa como un espaciador para asegurar que el título quede centrado.
            Su ancho debe reflejar el ancho del contenido izquierdo.
        */}
      </div>
    </header>
  );
}
