// src/components/Sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAuthStore } from '@/stores/useAuthStore';
import { useModalStore } from '@/stores/useModalStore';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { logoutUser } from '@/services/authService';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// --- CAMBIO 1: Importamos los componentes necesarios para la accesibilidad ---
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { GuardedButton } from './GuardedButton';

// Utils & Icons
import { cn } from '@/lib/utils';
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

// Estructura de datos para los enlaces
const mainNavLinks = [
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
  { href: '/dashboard/faq', label: 'Preguntas frecuentes', icon: FiHelpCircle },
  {
    href: '/dashboard/asistenteia',
    label: 'Asistente virtual',
    icon: LiaRobotSolid,
  },
];

const footerNavLinks = [
  { href: '/dashboard/acerca-de', label: 'Acerca de', icon: BiInfoCircle },
];

// Componente de enlace reutilizable (sin cambios)
interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isCollapsed: boolean;
  onClick?: (href: string) => void;
}

const SidebarLink = ({
  href,
  label,
  icon: Icon,
  isCollapsed,
  onClick,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <GuardedButton
      href={href}
      onClick={() => onClick?.(href)}
      variant='ghost'
      title={isCollapsed ? label : ''}
      className={cn(
        'w-full justify-start px-4 h-auto py-2 text-base text-gray-700 hover:bg-gray-200 hover:rounded-lg',
        isCollapsed && 'justify-center px-2',
        isActive && 'bg-body-dashboard text-black font-semibold'
      )}
    >
      <Icon className='h-5 w-5 shrink-0' />
      {!isCollapsed && <span className='ml-1 truncate'>{label}</span>}
    </GuardedButton>
  );
};
// Componente "headless" para el contenido del sidebar
// Recibe props para manejar el colapso y los clics en enlaces
const SidebarContent = ({
  isCollapsed = false,
  onLinkClick,
}: {
  isCollapsed?: boolean;
  onLinkClick?: (href: string) => void;
}) => {
  const { user, logout } = useAuthStore();
  const { open: openModal } = useModalStore();
  const router = useRouter();

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

  const getInitials = (name: string = '', lastName: string = '') =>
    `${name[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <div className='flex h-full flex-col bg-white'>
      {/* Main Navigation */}
      <nav className='flex-1 space-y-1 overflow-y-auto p-2 pt-2'>
        {mainNavLinks.map((link) => (
          <SidebarLink
            key={link.href}
            {...link}
            isCollapsed={isCollapsed}
            onClick={onLinkClick}
          />
        ))}
      </nav>

      {/* Footer Section */}
      <div className='mt-auto p-2'>
        <div className='border-t border-gray-300' />
        <div className='space-y-1 py-2'>
          {footerNavLinks.map((link) => (
            <SidebarLink
              key={link.href}
              {...link}
              isCollapsed={isCollapsed}
              onClick={onLinkClick}
            />
          ))}
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
            {!isCollapsed && (
              <span className='ml-1 truncate'>Cerrar sesión</span>
            )}
          </Button>
        </div>

        <div className='border-t border-gray-300' />

        <div className='pt-2'>
          <GuardedButton
            href='/dashboard/perfil'
            onClick={() => onLinkClick?.('/dashboard/perfil')}
            variant='ghost'
            className={cn(
              'w-full h-auto justify-start p-2 text-left',
              'hover:bg-gray-200 rounded-lg group',
              isCollapsed && 'justify-center'
            )}
          >
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarFallback className='bg-primary-blue text-white text-sm'>
                {user ? getInitials(user.name, user.apellido) : ''}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className='ml-1 min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-gray-800 group-hover:text-black'>
                  {user
                    ? `${user.name} ${user.apellido || ''}`.trim()
                    : 'Usuario'}
                </p>
                <p className='truncate text-xs text-gray-600'>
                  {user?.email || 'email@ejemplo.com'}
                </p>
              </div>
            )}
          </GuardedButton>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (Orquestador) ---
export default function AppSidebar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const {
    isMobileMenuOpen,
    setMobileMenuOpen,
    isDesktopCollapsed,
    toggleDesktopCollapse,
  } = useSidebarStore();

  const router = useRouter(); // Necesitamos el router aquí

  // --- INICIO DE LA NUEVA LÓGICA ---

  // 1. Estado para guardar la ruta a la que queremos navegar
  const [pendingNavPath, setPendingNavPath] = useState<string | null>(null);

  // 2. useEffect que vigila cuando el menú se cierra para navegar
  useEffect(() => {
    // Si hay una ruta pendiente Y el menú ya se cerró...
    if (pendingNavPath && !isMobileMenuOpen) {
      // ...ejecutamos la navegación.
      router.push(pendingNavPath);
      // ...y limpiamos la ruta pendiente para no volver a navegar.
      setPendingNavPath(null);
    }
  }, [isMobileMenuOpen, pendingNavPath, router]);

  // 3. El nuevo manejador que inicia el proceso de cierre y navegación
  const handleMobileNavigation = (href: string) => {
    // Si ya estamos en la página, solo cerramos el menú.
    if (window.location.pathname === href) {
      setMobileMenuOpen(false);
      return;
    }
    // Si no, guardamos la ruta y ordenamos cerrar el menú.
    setPendingNavPath(href);
    setMobileMenuOpen(false);
  };

  // --- FIN DE LA NUEVA LÓGICA ---

  if (isDesktop) {
    return (
      <aside
        className={cn(
          'hidden h-full flex-col bg-white text-black transition-all duration-300 ease-in-out md:flex',
          isDesktopCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* --- CAMBIO 3: Centramos los elementos del header cuando está colapsado --- */}
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b px-2',
            isDesktopCollapsed ? 'justify-center' : 'gap-x-5'
          )}
        >
          <Button
            variant='ghost'
            onClick={toggleDesktopCollapse}
            // Eliminamos size="icon" y las clases de tamaño fijo para tener control total
            className={cn(
              'h-auto shrink-0 text-black hover:bg-gray-200 py-2',
              // Cuando está colapsado, tiene el mismo padding que los íconos de abajo (px-2)
              isDesktopCollapsed && 'p-2',
              // Cuando está expandido, tiene el mismo padding que los íconos de abajo (px-4)
              !isDesktopCollapsed && 'px-4'
            )}
          >
            <GiHamburgerMenu className='h-4 w-4' />
          </Button>
          {!isDesktopCollapsed && (
            <GuardedButton
              href='/dashboard'
              className='relative h-[48px] w-[120px]'
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
        {/* Usamos el componente "headless" para el contenido */}
        <div className='flex-grow overflow-y-auto'>
          <SidebarContent isCollapsed={isDesktopCollapsed} />
        </div>
      </aside>
    );
  }

  // Lógica móvil con Shadcn Sheet
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      {/* El SheetTrigger vive en el Header, por lo que aquí no se necesita */}
      <SheetContent
        side='left'
        className={cn(
          'flex flex-col p-0 w-64 bg-white',
          'will-change-transform'
        )}
      >
        {/* --- CAMBIO 4: Solución al error de accesibilidad --- */}
        {/* Añadimos un título y descripción ocultos para los lectores de pantalla */}
        <SheetHeader className='sr-only'>
          <SheetTitle>Menú de Navegación</SheetTitle>
          <SheetDescription>
            Lista de enlaces para navegar por las secciones de la aplicación.
          </SheetDescription>
        </SheetHeader>

        {/* --- CAMBIO 5: Creamos un header específico para el menú móvil --- */}
        <div className='flex h-16 shrink-0 items-center justify-center border-b'>
          <GuardedButton
            href='/dashboard'
            onClick={() => handleMobileNavigation('/dashboard')}
            className='relative h-[48px] w-[120px]'
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

        {/* Usamos el mismo componente "headless" para el contenido, asegurando consistencia */}
        <div className='flex-grow overflow-y-auto'>
          <SidebarContent
            isCollapsed={false}
            onLinkClick={handleMobileNavigation}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
