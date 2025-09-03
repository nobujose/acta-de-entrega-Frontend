// src/components/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menu,
  Home,
  Bot,
  BookOpenText,
  CircleAlert,
  Folder,
  StickyNote,
  CircleQuestionMark,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const { open: openModal } = useModalStore();

  const navLinks = [
    { href: '/dashboard', label: 'Inicio', icon: Home },
    {
      href: '/dashboard/repositorio',
      label: 'Repositorio Legal',
      icon: Folder,
    },
    {
      href: '/dashboard/revision',
      label: 'Revisión de acta',
      icon: StickyNote,
    },
    {
      href: '/dashboard/panel-actas',
      label: 'Panel de actas',
      icon: BookOpenText,
    },
    {
      href: '/dashboard/faq',
      label: 'Preguntas frecuentes',
      icon: CircleQuestionMark,
    },
    {
      href: '/dashboard/asistenteia',
      label: 'Asistente virtual',
      icon: Bot,
    },
  ];

  const aboutLink = {
    href: '/dashboard/acerca-de',
    label: 'Acerca de',
    icon: CircleAlert,
  };

  const handleLogoutClick = () => {
    openModal('logoutConfirmation', {
      title: '¿Estás seguro que quieres cerrar sesión?',
      onConfirm: () => {
        logout(); // Llama a la función de logout del store
        router.push('/login');
      },
    });
  };

  return (
    <aside
      className={cn(
        'relative z-50 flex h-full flex-col bg-sidebar-bg text-black transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo y Botón de Menú */}
      <div className='flex h-16 items-center gap-x-4 px-4'>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 shrink-0 text-black hover:bg-sidebar-hover-bg'
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
              src='/logo de universitas legal.svg'
              alt='Universitas Legal Logo'
              width={120}
              height={75}
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
                ? 'bg-white text-black font-semibold'
                : 'text-gray-700 hover:bg-sidebar-hover-bg hover:text-black rounded-md'
            )}
          >
            <link.icon className='h-4 w-4 shrink-0' />
            {!isCollapsed && <span className='truncate'>{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className='mt-auto p-2'>
        {/* Separador superior */}
        <div className='border-t border-gray-400' />

        {/* Enlaces inferiores */}
        <div className='py-2'>
          <Link
            href={aboutLink.href}
            title={isCollapsed ? aboutLink.label : ''}
            className={cn(
              'flex items-center gap-3 py-2 w-full transition-all duration-200',
              isCollapsed ? 'justify-center px-4' : 'px-4',
              pathname === aboutLink.href
                ? 'bg-white text-gray-900 font-semibold'
                : 'text-gray-700 hover:bg-sidebar-hover-bg hover:text-black rounded-md'
            )}
          >
            <aboutLink.icon className='h-4 w-4 shrink-0' />
            {!isCollapsed && (
              <span className='truncate'>{aboutLink.label}</span>
            )}
          </Link>

          {/* ▼▼▼ CAMBIO: Botón de Cerrar Sesión ▼▼▼ */}
          <Button
            variant='ghost'
            title={isCollapsed ? 'Cerrar Sesión' : ''}
            onClick={handleLogoutClick}
            className={cn(
              'flex items-center gap-3 py-2 w-full transition-all duration-200 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md',
              isCollapsed ? 'justify-center px-4' : 'px-4 justify-start'
            )}
          >
            <LogOut className='h-4 w-4 shrink-0' />
            {!isCollapsed && <span className='truncate'>Cerrar sesión</span>}
          </Button>
        </div>

        {/* Perfil de Usuario con su separador */}
        <div className='border-t border-gray-400 pt-2'>
          <div
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2',
              !isCollapsed && 'hover:bg-sidebar-hover-bg cursor-pointer group'
            )}
          >
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarImage src='/placeholder-user.jpg' alt='Usuario' />
              <AvatarFallback className='bg-primary-blue text-white text-sm'>
                JL
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-gray-800 group-hover:text-black'>
                  Julio Lopera
                </p>
                <p className='truncate text-xs text-gray-600'>
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
