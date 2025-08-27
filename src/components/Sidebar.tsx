// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, HelpCircle, Menu, Home, FileText, User } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/actas', label: 'Documentos', icon: FileText },
    { href: '/dashboard/perfil', label: 'JulioIA', icon: User },
  ];

  const bottomLinks = [
    { label: 'Settings', icon: Settings },
    { label: 'Get Help', icon: HelpCircle },
  ];

  // Se eliminó la constante 'primaryBlue'

  return (
    <aside
      className={cn(
        'relative z-50 flex h-full flex-col bg-primary-blue transition-all duration-300 ease-in-out', // <-- CAMBIO: Se usa la clase de Tailwind
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo y Botón de Menú */}
      <div className='flex h-16 items-center border-b border-gray-700 px-4'>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 shrink-0 text-white hover:bg-primary-blue-dark' // <-- CAMBIO: Se usa la clase de hover
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className='h-4 w-4' />
        </Button>
        {!isCollapsed && (
          <Link
            href='/dashboard'
            className='ml-2 flex items-center gap-2 font-semibold'
          >
            <Image
              src='/horizontal - blanco.svg'
              alt='Universitas Legal Logo'
              width={120}
              height={120}
              className='rounded-sm'
            />
            <span className='truncate text-white'></span>
          </Link>
        )}
      </div>

      {/* Navegación Principal */}
      <nav className='flex-1 space-y-1 py-2'>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            title={isCollapsed ? link.label : ''}
            className={cn(
              'flex items-center gap-3 py-2 w-full transition-all duration-200',
              isCollapsed ? 'justify-center px-4' : 'px-4',
              pathname === link.href
                ? 'bg-white text-gray-900 font-semibold'
                : 'text-gray-200 hover:bg-primary-blue-dark hover:text-white rounded-md' // <-- CAMBIO: Se usa la clase de hover
            )}
          >
            <link.icon className='h-4 w-4 shrink-0' />
            {!isCollapsed && <span className='truncate'>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Navegación Inferior y Perfil */}
      <div className='mt-auto space-y-1 border-t border-gray-700 p-2'>
        {bottomLinks.map((link) => (
          <Button
            key={link.label}
            variant='ghost'
            title={isCollapsed ? link.label : ''}
            className={cn(
              'w-full gap-3 transition-all duration-200',
              isCollapsed ? 'justify-center' : 'justify-start',
              'text-gray-200 hover:bg-primary-blue-dark hover:text-white' // <-- CAMBIO: Se usa la clase de hover
            )}
          >
            <link.icon className='h-4 w-4 shrink-0' />
            {!isCollapsed && <span className='truncate'>{link.label}</span>}
          </Button>
        ))}

        {/* Perfil de Usuario */}
        <div className='border-t border-gray-700 pt-2'>
          <div
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2',
              !isCollapsed && 'hover:bg-primary-blue-dark', // <-- CAMBIO: Se usa la clase de hover
              'text-gray-200'
            )}
          >
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarImage src='/placeholder-user.jpg' alt='Usuario' />
              <AvatarFallback className='bg-white text-primary-blue text-sm'>
                JL
              </AvatarFallback>{' '}
              {/* <-- CAMBIO: Se usa la clase de texto */}
            </Avatar>
            {!isCollapsed && (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>Julio Lopera</p>
                <p className='truncate text-xs text-gray-300'>
                  julio.lopera@universitas.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
