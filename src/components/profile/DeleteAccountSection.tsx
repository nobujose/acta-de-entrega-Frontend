// src/components/profile/DeleteAccountSection.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import axios from 'axios'; // 1. Importamos axios

export function DeleteAccountSection() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [isFirstConfirmOpen, setIsFirstConfirmOpen] = useState(false);
  const [isFinalConfirmOpen, setIsFinalConfirmOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 2. Creamos un estado para el mensaje de error
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const finalConfirmationPhrase = 'eliminar mi cuenta de actas';

  const handleFinalDelete = async () => {
    setIsLoading(true);
    setErrorMessage(null); // Limpiamos errores previos
    try {
      const response = await deleteAccount(password);
      localStorage.setItem('flashMessage', response.message);
      logout();
      router.push('/login');
    } catch (error) {
      // 3. Corregimos el catch
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
      // No cerramos el popup final en caso de error, para que el usuario pueda ver el mensaje
    }
  };

  return (
    <div className='space-y-4 rounded-lg border border-red-500 p-4'>
      <div>
        <h3 className='text-lg font-medium text-red-600'>Eliminar cuenta</h3>
        <p className='text-sm text-muted-foreground mt-2'>
          Esta acción es permanente y no se puede deshacer. Toda tu información
          y actas asociadas serán eliminadas de nuestra plataforma.
        </p>
      </div>
      <Button
        variant='destructive'
        onClick={() => setIsFirstConfirmOpen(true)}
        className='bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto whitespace-normal h-auto text-center '
      >
        Sí, entiendo, proceder a eliminar mi cuenta
      </Button>

      {/* Primer Popup de Confirmación */}
      <AlertDialog
        open={isFirstConfirmOpen}
        onOpenChange={setIsFirstConfirmOpen}
      >
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción es irreversible. Se eliminarán todos tus datos de
              forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
            <DialogDescription>
              Para continuar, por favor, escribe la frase exacta{' '}
              <strong className='text-foreground'>
                {finalConfirmationPhrase}
              </strong>{' '}
              y tu contraseña actual.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            {/* 4. Mostramos el mensaje de error aquí */}
            {errorMessage && (
              <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
            )}

            <div className='space-y-2'>
              <Label htmlFor='confirmationText'>Frase de confirmación</Label>
              <Input
                id='confirmationText'
                name='confirmationText'
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Contraseña actual</Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant='destructive'
            className='w-full bg-red-600 hover:bg-red-700 text-white'
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
