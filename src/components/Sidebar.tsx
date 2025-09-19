// src/components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
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
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { slide as Menu } from 'react-burger-menu';
import { useSidebarStore } from '@/stores/useSidebarStore';

const SidebarContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Inicio', icon: CgHome },
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

  return (
    <div className='flex-1 overflow-y-auto p-2'>
      <nav className='space-y-1 py-2'>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            title={isCollapsed ? link.label : ''}
            className={cn(
              'flex items-center gap-3 py-2 w-full transition-all duration-200 rounded-md',
              isCollapsed ? 'justify-center px-2' : 'px-4',
              pathname === link.href
                ? 'bg-body-dashboard text-black font-semibold'
                : 'text-gray-700 hover:bg-gray-200'
            )}
          >
            <link.icon className='h-5 w-5 shrink-0' />
            {!isCollapsed && <span className='truncate'>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Componente principal que aplica la lógica responsiva
export default function AppSidebar() {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { isMobileMenuOpen, setMobileMenuOpen } = useSidebarStore();
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
      title: '¿Estás seguro que quieres cerrar sesión?',
      onConfirm: async () => {
        try {
          await apiClient.post('/auth/logout');
        } catch (error) {
          console.error('No se pudo notificar el logout al servidor:', error);
        }
        logout();
        router.push('/login');
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
    <div className='p-2'>
      <div className='border-t border-gray-400' />
      <div className='py-2'>
        <Link
          href={aboutLink.href}
          title={isCollapsed ? aboutLink.label : ''}
          className={cn(
            'flex items-center gap-3 py-2 w-full transition-all duration-200 rounded-md',
            isCollapsed ? 'justify-center px-2' : 'px-4',
            pathname === aboutLink.href
              ? 'bg-body-dashboard text-black font-semibold'
              : 'text-gray-700 hover:bg-gray-200'
          )}
        >
          <aboutLink.icon className='h-5 w-5 shrink-0' />
          {!isCollapsed && <span className='truncate'>{aboutLink.label}</span>}
        </Link>
        <Button
          variant='ghost'
          title={isCollapsed ? 'Cerrar Sesión' : ''}
          onClick={handleLogoutClick}
          className={cn(
            'flex items-center gap-3 py-2 w-full transition-all duration-200 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-md',
            isCollapsed ? 'px-2' : 'px-4 justify-start'
          )}
        >
          <AiOutlineLogout className='h-5 w-5 shrink-0' />
          {!isCollapsed && <span className='truncate'>Cerrar sesión</span>}
        </Button>
      </div>
      <div className='border-t border-gray-400' />
      <Link
        href='/dashboard/perfil'
        className={cn(
          'flex items-center gap-3 rounded-md px-3 py-2 mt-2 transition-colors',
          isCollapsed && 'justify-center',
          !isCollapsed && 'hover:bg-gray-200 cursor-pointer group'
        )}
      >
        <Avatar className='h-8 w-8 shrink-0'>
          <AvatarFallback className='bg-primary-blue text-white text-sm'>
            {user ? getInitials(user.name, user.apellido) : ''}
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium text-gray-800 group-hover:text-black'>
              {user ? `${user.name} ${user.apellido || ''}`.trim() : 'Usuario'}
            </p>
            <p className='truncate text-xs text-gray-600'>
              {user?.email || 'email@ejemplo.com'}
            </p>
          </div>
        )}
      </Link>
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
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          >
            <GiHamburgerMenu className='h-4 w-4' />
          </Button>
          {!isDesktopCollapsed && (
            <Link
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
            </Link>
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
          <Link
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
          </Link>
        </div>
        <SidebarContent isCollapsed={false} />
        <SidebarFooter isCollapsed={false} />
      </div>
    </Menu>
  );
}
