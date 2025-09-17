// src/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CgHome } from 'react-icons/cg';
import {
  AiOutlineBook,
  AiOutlineFileSearch,
  AiOutlineLogout,
} from 'react-icons/ai';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FiHelpCircle } from 'react-icons/fi';
import { LiaRobotSolid } from 'react-icons/lia';
import { BiInfoCircle } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Image from 'next/image';
import { useModalStore } from '@/stores/useModalStore';
import { useAuthStore } from '@/stores/useAuthStore';
import apiClient from '@/lib/axios';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // Obtenemos tanto el 'user' como la función 'logout'
  const { user, logout } = useAuthStore();
  const { open: openModal } = useModalStore();

  const navLinks = [
    {
      href: '/dashboard',
      label: 'Inicio',
      icon: CgHome,
    },
    {
      href: '/dashboard/repositorio',
      label: 'Repositorio Legal',
      icon: AiOutlineBook,
    },
    {
      href: '/dashboard/revision',
      label: 'Revisión de acta',
      icon: AiOutlineFileSearch,
    },
    {
      href: '/dashboard/panel-actas',
      label: 'Panel de actas',
      icon: LuLayoutDashboard,
    },
    {
      href: '/dashboard/faq',
      label: 'Preguntas frecuentes',
      icon: FiHelpCircle,
    },
    {
      href: '/dashboard/asistenteia',
      label: 'Asistente virtual',
      icon: LiaRobotSolid,
    },
  ];

  const aboutLink = {
    href: '/dashboard/acerca-de',
    label: 'Acerca de',
    icon: BiInfoCircle,
  };

  const handleLogoutClick = () => {
    openModal('logoutConfirmation', {
      title: '¿Estás seguro que quieres cerrar sesión?',
      onConfirm: async () => {
        // 2. Convertimos esta función en 'async'
        try {
          // ▼▼▼ 3. AÑADIMOS LA LLAMADA AL BACKEND ▼▼▼
          // Le decimos al backend que vamos a cerrar sesión ANTES de borrar el token
          await apiClient.post('/auth/logout');
        } catch (error) {
          // Si falla la notificación, lo mostramos en la consola pero continuamos
          // con el cierre de sesión para no bloquear al usuario.
          console.error('No se pudo notificar el logout al servidor:', error);
        }
        logout(); // Llama a la función de logout del store
        router.push('/login');
      },
    });
  };

  // ▼▼▼ REEMPLAZA ESTA FUNCIÓN ▼▼▼
  const getInitials = (name: string = '', lastName: string = '') => {
    const firstNameInitial = name ? name[0] : '';
    const lastNameInitial = lastName ? lastName[0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };
  // ▲▲▲ FIN DE LA FUNCIÓN MODIFICADA ▲▲▲
  return (
    <aside
      className={cn(
        'relative z-50 flex h-full flex-col bg-white text-black transition-all duration-300 ease-in-out',
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
          <GiHamburgerMenu className='h-4 w-4' />
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
                ? 'bg-body-dashboard text-black font-semibold'
                : 'text-gray-700 hover:bg-gray-300 hover:text-black rounded-md'
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
                ? 'bg-body-dashboard text-gray-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-300 hover:text-black rounded-md'
            )}
          >
            <aboutLink.icon className='h-4 w-4 shrink-0' />
            {!isCollapsed && (
              <span className='truncate'>{aboutLink.label}</span>
            )}
          </Link>

          <Button
            variant='ghost'
            title={isCollapsed ? 'Cerrar Sesión' : ''}
            onClick={handleLogoutClick}
            className={cn(
              'flex items-center gap-3 py-2 w-full transition-all duration-200 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md',
              isCollapsed ? 'justify-center px-4' : 'px-4 justify-start'
            )}
          >
            <AiOutlineLogout className='h-4 w-4 shrink-0' />
            {!isCollapsed && <span className='truncate'>Cerrar sesión</span>}
          </Button>
        </div>

        {/* Perfil de Usuario con su separador */}
        <div className='border-t border-gray-400 pt-2'>
          <Link
            href='/dashboard/perfil'
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
              !isCollapsed && 'hover:bg-sidebar-hover-bg cursor-pointer group'
            )}
          >
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarFallback className='bg-primary-blue text-white text-sm'>
                {/* Usamos el nombre y el apellido para las iniciales */}
                {user ? getInitials(user.name, user.apellido) : ''}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-gray-800 group-hover:text-black'>
                  {/* Mostramos el nombre y el apellido juntos */}
                  {user ? `${user.name} ${user.apellido || ''}` : 'Usuario'}
                </p>
                <p className='truncate text-xs text-gray-600'>
                  {user?.email || 'email@ejemplo.com'}
                </p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
}
