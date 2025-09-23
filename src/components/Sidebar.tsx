// src/components/Sidebar.tsx
'use client';

import React from 'react';
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
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { slide as Menu } from 'react-burger-menu';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { GuardedButton } from './GuardedButton';
import { logoutUser } from '@/services/authService';

const SidebarContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Inicio', icon: CgHome },
    {
      href: '/dashboard/repositorio',
      label: 'Repositorio legal',
      icon: AiOutlineBook,
    },
    {
      href: '/dashboard/revision',
      label: 'Compliance',
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

  return (
    <div className='flex-1 overflow-y-auto p-2'>
      <nav className='space-y-1'>
        {navLinks.map((link) => (
          <GuardedButton
            key={link.href}
            href={link.href}
            variant='ghost'
            title={isCollapsed ? link.label : ''}
            className={cn(
              'w-full justify-start px-4 h-auto py-2 text-base',
              'text-gray-700 hover:bg-gray-200 hover:rounded-lg',
              isCollapsed && 'justify-center px-2',
              pathname === link.href &&
                'bg-body-dashboard text-black font-semibold'
            )}
          >
            <link.icon className='h-5 w-5 shrink-0' />
            {!isCollapsed && <span className='truncate'>{link.label}</span>}
          </GuardedButton>
        ))}
      </nav>
    </div>
  );
};

// Componente principal que aplica la lógica responsiva
export default function AppSidebar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const {
    isMobileMenuOpen,
    setMobileMenuOpen,
    isDesktopCollapsed,
    toggleDesktopCollapse,
  } = useSidebarStore();

  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { open: openModal } = useModalStore();
  const aboutLink = {
    href: '/dashboard/acerca-de',
    label: 'Acerca de',
    icon: BiInfoCircle,
  };

  const handleLogoutClick = () => {
    openModal('logoutConfirmation', {
      title: '¿Ya te vas?',
      description: (
        <>
          ¡No te preocupes! Tu progreso se ha guardado.
          <br />
          Vuelve pronto para continuar donde lo dejaste.
        </>
      ),
      onConfirm: async () => {
        router.push('/login');
        await logoutUser();
        logout();
      },
    });
  };

  const getInitials = (name: string = '', lastName: string = '') => {
    const firstNameInitial = name ? name[0] : '';
    const lastNameInitial = lastName ? lastName[0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  const SidebarFooter = ({
    isCollapsed = false,
  }: {
    isCollapsed?: boolean;
  }) => (
    <div className='mt-auto'>
      <div className='p-2'>
        <div className='border-t border-gray-300' />

        <div className='w-full space-y-1 py-2'>
          {/* Estos botones son nuestro modelo a seguir: clases de layout en el botón mismo */}
          <GuardedButton
            href={aboutLink.href}
            variant='ghost'
            title={isCollapsed ? aboutLink.label : ''}
            className={cn(
              'w-full justify-start px-4 h-auto py-2 text-base text-gray-700 hover:bg-gray-200 hover:rounded-lg',
              pathname === aboutLink.href &&
                'bg-body-dashboard text-black font-semibold',
              isCollapsed && 'justify-center px-2'
            )}
          >
            <aboutLink.icon className='h-5 w-5 shrink-0' />
            {!isCollapsed && (
              <span className='truncate'>{aboutLink.label}</span>
            )}
          </GuardedButton>
          <Button
            variant='ghost'
            title={isCollapsed ? 'Cerrar Sesión' : ''}
            onClick={handleLogoutClick}
            className={cn(
              'w-full justify-start px-4 h-auto py-2 text-base text-red-600 hover:bg-red-100 hover:text-red-700 hover:rounded-lg',
              isCollapsed && 'justify-center px-2'
            )}
          >
            <AiOutlineLogout className='h-5 w-5 shrink-0' />
            {!isCollapsed && <span className='truncate'>Cerrar sesión</span>}
          </Button>
        </div>

        <div className='border-t border-gray-300' />

        <div className={cn('pt-2')}>
          <GuardedButton
            href='/dashboard/perfil'
            variant='ghost'
            className={cn(
              'w-full h-auto justify-start py-2 group',
              // Aplicamos las clases de layout DIRECTAMENTE al botón
              // solo cuando NO está colapsado, para imitar a los otros botones.
              !isCollapsed && 'hover:bg-gray-200 flex items-center gap-3 px-2',
              isCollapsed && 'justify-center px-2'
            )}
          >
            {isCollapsed ? (
              <Avatar className='h-8 w-8 shrink-0'>
                <AvatarFallback className='bg-primary-blue text-white text-sm'>
                  {user ? getInitials(user.name, user.apellido) : ''}
                </AvatarFallback>
              </Avatar>
            ) : (
              // Eliminamos el <div> intermedio y usamos un Fragmento de React.
              // Ahora el Avatar y el div de texto son hijos directos del botón.
              <>
                <Avatar className='h-8 w-8 shrink-0'>
                  <AvatarFallback className='bg-primary-blue text-white text-sm'>
                    {user ? getInitials(user.name, user.apellido) : ''}
                  </AvatarFallback>
                </Avatar>
                <div className='min-w-0 flex-1 text-left'>
                  <p className='truncate text-sm font-medium text-gray-800 group-hover:text-black'>
                    {user
                      ? `${user.name} ${user.apellido || ''}`.trim()
                      : 'Usuario'}
                  </p>
                  <p className='truncate text-xs text-gray-600'>
                    {user?.email || 'email@ejemplo.com'}
                  </p>
                </div>
              </>
            )}
          </GuardedButton>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <aside
        className={cn(
          'hidden h-full flex-col bg-white text-black transition-all duration-300 ease-in-out md:flex',
          isDesktopCollapsed ? 'w-20 items-center' : 'w-64'
        )}
      >
        <div className='flex h-16 shrink-0 items-center border-b gap-x-4 px-4'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 shrink-0 text-black hover:bg-gray-200'
            onClick={toggleDesktopCollapse}
          >
            <GiHamburgerMenu className='h-4 w-4' />
          </Button>
          {!isDesktopCollapsed && (
            <GuardedButton
              href='/dashboard'
              className='relative h-[48px] w-[120px]' // Contenedor con posición relativa
            >
              <Image
                src='/logo de universitas legal.svg'
                alt='Universitas Legal Logo'
                fill
                className='object-contain'
                priority
              />
            </GuardedButton>
          )}
        </div>
        <SidebarContent isCollapsed={isDesktopCollapsed} />
        <SidebarFooter isCollapsed={isDesktopCollapsed} />
      </aside>
    );
  }

  return (
    <Menu
      isOpen={isMobileMenuOpen}
      onStateChange={(state) => setMobileMenuOpen(state.isOpen)}
      customBurgerIcon={false}
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
    >
      <div className='flex flex-col h-screen bg-white'>
        <div className='flex h-16 shrink-0 items-center justify-center border-b'>
          <GuardedButton
            href='/dashboard'
            onClick={() => setMobileMenuOpen(false)}
            className='relative h-[48px] w-[120px]' // Contenedor con posición relativa
          >
            <Image
              src='/logo de universitas legal.svg'
              alt='Universitas Legal Logo'
              fill
              className='object-contain'
              priority
            />
          </GuardedButton>
        </div>
        <SidebarContent isCollapsed={false} />
        <SidebarFooter isCollapsed={false} />
      </div>
    </Menu>
  );
}
