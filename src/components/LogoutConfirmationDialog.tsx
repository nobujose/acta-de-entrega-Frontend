'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AiOutlineLogout } from 'react-icons/ai';
import { useModalStore } from '@/stores/useModalStore';

export function LogoutConfirmationDialog() {
  // Obtenemos el estado y las funciones de nuestro store
  const { isOpen, type, payload, close } = useModalStore();

  // El diálogo solo debe ser visible si es del tipo 'logoutConfirmation'
  const isModalOpen = isOpen && type === 'logoutConfirmation';

  // Si no hay una función de confirmación, no renderizamos nada
  if (!payload.onConfirm) {
    return null;
  }

  return (
    <AlertDialog open={isModalOpen} onOpenChange={close}>
      <AlertDialogContent className='max-w-sm text-center data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]'>
        <AlertDialogHeader className='flex flex-col items-center'>
          <div className='mb-4 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center'>
            <AiOutlineLogout className='h-8 w-8 text-red-600' />
          </div>
          <AlertDialogTitle className='text-2xl font-bold'>
            {payload.title || '¿Ya te vas?'}
          </AlertDialogTitle>
          {payload.description && (
            <AlertDialogDescription className='text-base text-gray-600 text-center'>
              {payload.description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-2 sm:justify-center'>
          <AlertDialogCancel asChild>
            <Button
              variant='outline'
              className='flex-1 bg-gray-100 hover:bg-gray-200 border-gray-300 font-bold'
            >
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className='flex-1 bg-red-600 hover:bg-red-700 font-bold text-white'
              onClick={() => {
                payload.onConfirm?.(); // Ejecuta la acción de logout
                close();
              }}
            >
              Cerrar sesión
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
