// src/components/ModalProvider.tsx
'use client';

import { useModalStore } from '@/stores/useModalStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils'; // Importar la utilidad cn
// ▼▼▼ 1. IMPORTAMOS LO QUE NECESITAREMOS ▼▼▼
import { useRouter } from 'next/navigation';
import { KeyRound, UserCog, Trash2 } from 'lucide-react';
export function ModalProvider() {
  const { isOpen, close, type, payload } = useModalStore();
  const router = useRouter(); // Para la navegación

  if (!type) {
    return null;
  }

  let modalContent = null;
  switch (type) {
    case 'logoutConfirmation':
      modalContent = (
        <DialogContent
          className={cn(
            'bg-white w-[300px] p-4',
            // Clases explícitas para la animación de apertura desde el CENTRO:
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            // Clases explícitas para la animación de cierre hacia el CENTRO:
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]'
          )}
        >
          <DialogHeader className='mb-4'>
            {' '}
            {/* Agregado margen inferior para separar título del footer */}
            <DialogTitle className='text-base font-semibold text-gray-800'>
              {payload.title}
            </DialogTitle>
            {payload.description && (
              <DialogDescription>{payload.description}</DialogDescription>
            )}
          </DialogHeader>
          {payload.content}
          <DialogFooter className='pt-2 gap-2'>
            <Button
              variant='outline'
              onClick={close}
              className='flex-1 hover:bg-gray-300'
            >
              {' '}
              {/* Para que los botones se expandan */}
              No
            </Button>
            <Button
              className='bg-red-600 hover:bg-red-700 text-white flex-1' // Para que los botones se expandan
              onClick={() => {
                payload.onConfirm?.();
                close();
              }}
            >
              Sí
            </Button>
          </DialogFooter>
        </DialogContent>
      );
      break;
    // ▼▼▼ 2. AÑADIMOS EL CASO PARA NUESTRO NUEVO POPUP ▼▼▼
    case 'userProfileOptions':
      modalContent = (
        <DialogContent className='bg-white max-w-sm'>
          <DialogHeader>
            <DialogTitle>Opciones de Perfil</DialogTitle>
            <DialogDescription>
              Selecciona la acción que deseas realizar.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col space-y-2 py-4'>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => {
                // Redirigimos a la página de perfil con el parámetro ?tab=edit
                router.push('/dashboard/perfil?tab=edit');
                close();
              }}
            >
              <UserCog className='mr-2 h-4 w-4' />
              Editar Usuario
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={() => {
                // Redirigimos a la página de perfil con el parámetro ?tab=password
                router.push('/dashboard/perfil?tab=password');
                close();
              }}
            >
              <KeyRound className='mr-2 h-4 w-4' />
              Cambiar Clave
            </Button>
            <Button
              variant='outline'
              className='w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50'
              onClick={() => {
                // Redirigimos a la página de perfil con el parámetro ?tab=delete
                router.push('/dashboard/perfil?tab=delete');
                close();
              }}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Eliminar Usuario
            </Button>
          </div>
        </DialogContent>
      );
      break;

    default:
      modalContent = null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {modalContent}
    </Dialog>
  );
}
