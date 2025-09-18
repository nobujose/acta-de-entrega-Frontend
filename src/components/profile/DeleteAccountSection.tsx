// src/components/profile/DeleteAccountSection.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// ▼▼▼ 1. IMPORTAMOS la función 'buttonVariants' ▼▼▼
import { Button } from '@/components/ui/button';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { deleteAccount } from '@/services/authService';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { toast } from 'sonner';

export function DeleteAccountSection() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isFirstConfirmOpen, setIsFirstConfirmOpen] = useState(false);
  const [isFinalConfirmOpen, setIsFinalConfirmOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const finalConfirmationPhrase = 'eliminar mi cuenta de actas';

  // ▼▼▼ REEMPLAZA ESTA FUNCIÓN ▼▼▼
  const handleFinalDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteAccount(password);

      // Mostramos un mensaje de éxito. Usaremos un alert simple para asegurar
      // que el usuario lo vea antes de que ocurra la redirección.
      localStorage.setItem('flashMessage', response.message);

      // 2. Deslogueamos al usuario y lo redirigimos
      logout();
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Ocurrió un error inesperado.');
      }
      setIsLoading(false); // Solo paramos la carga si hay un error
    }
    // No necesitamos un 'finally' porque el componente se desmontará tras el logout.
  };
  // ▲▲▲ FIN DE LA FUNCIÓN MODIFICADA ▲▲▲

  return (
    <div className='space-y-4 rounded-lg border border-red-500 p-4'>
      <div>
        <h3 className='text-lg font-medium text-red-600'>Eliminar Cuenta</h3>
        <p className='text-sm text-muted-foreground mt-2'>
          Esta acción es permanente y no se puede deshacer. Toda tu información
          y actas asociadas serán eliminadas de nuestra plataforma.
        </p>
      </div>
      <Button
        variant='destructive'
        onClick={() => setIsFirstConfirmOpen(true)}
        className='bg-red-600 hover:bg-red-700 text-white'
      >
        Sí, entiendo, proceder a eliminar mi cuenta
      </Button>

      {/* Primer Popup de Confirmación */}
      <AlertDialog
        open={isFirstConfirmOpen}
        onOpenChange={setIsFirstConfirmOpen}
      >
        <AlertDialogContent className='bg-white '>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. Se eliminarán todos tus datos de
              forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            {/* ▼▼▼ 2. CORREGIMOS EL BOTÓN AQUÍ ▼▼▼ */}
            <AlertDialogAction
              className='bg-red-600 hover:bg-red-700 text-white'
              onClick={() => {
                setIsFirstConfirmOpen(false);
                setIsFinalConfirmOpen(true);
              }}
            >
              Continuar con la eliminación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Segundo Popup de Confirmación Final */}
      <Dialog open={isFinalConfirmOpen} onOpenChange={setIsFinalConfirmOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Confirmación Final</DialogTitle>
            {/* ▼▼▼ AQUÍ ESTÁ EL CAMBIO PARA PONER LA FRASE EN NEGRITA ▼▼▼ */}
            <DialogDescription>
              Para continuar, por favor, escribe la frase exacta{' '}
              <strong className='text-foreground'>
                {finalConfirmationPhrase}
              </strong>{' '}
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='confirmationText'>Frase de confirmación</Label>
              <Input
                id='confirmationText'
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Contraseña actual</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant='destructive'
            className='w-full  bg-red-600 hover:bg-red-700 text-white'
            onClick={handleFinalDelete}
            disabled={
              isLoading ||
              confirmationText.toLowerCase() !== finalConfirmationPhrase ||
              !password
            }
          >
            {isLoading ? 'Eliminando...' : 'Eliminar Cuenta Permanentemente'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
