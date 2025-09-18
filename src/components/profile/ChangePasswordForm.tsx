// src/components/profile/ChangePasswordForm.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Importamos useRouter para la redirección
import apiClient from '@/lib/axios';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { SuccessAlertDialog } from '../SuccessAlertDialog'; // 2. Importamos nuestra alerta reutilizable

// El schema de validación con la nueva regla
const formSchema = z
  .object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida.'),
    newPassword: z
      .string()
      .min(8, {
        message: 'La nueva contraseña debe tener al menos 8 caracteres.',
      })
      .regex(/[a-z]/, {
        message: 'Debe contener al menos una letra minúscula.',
      })
      .regex(/[A-Z]/, {
        message: 'Debe contener al menos una letra mayúscula.',
      })
      .regex(/[0-9]/, { message: 'Debe contener al menos un número.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Debe contener al menos un símbolo especial.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las nuevas contraseñas no coinciden.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'La nueva contraseña no puede ser igual a la actual.',
    path: ['newPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

export function ChangePasswordForm() {
  const router = useRouter(); // 3. Inicializamos el router
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 4. Creamos un estado para controlar la visibilidad del popup
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await apiClient.put('/user/password/change', data);
      // 5. En lugar de mostrar un mensaje de texto, activamos el popup
      setShowSuccessDialog(true);
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='space-y-4 max-w-sm'>
        <h3 className='text-lg font-medium'>Cambiar Contraseña</h3>
        <p className='text-sm text-muted-foreground'>
          Asegúrate de que tu nueva contraseña sea segura y diferente a las
          anteriores.
        </p>

        {/* Eliminamos el successMessage porque ahora lo maneja el popup */}
        {errorMessage && (
          <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            {/* ... (El JSX de los campos del formulario no cambia) ... */}
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña Actual</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute inset-y-0 right-0 h-full px-3'
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute inset-y-0 right-0 h-full px-3'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='absolute inset-y-0 right-0 h-full px-3'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='bg-[#001A70] hover:bg-[#001A70]/90 text-white'
            >
              {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </form>
        </Form>
      </div>

      {/* 6. Añadimos el componente de alerta al final del JSX */}
      <SuccessAlertDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title='¡Contraseña Actualizada!'
        description='Tu contraseña ha sido cambiada exitosamente. Serás redirigido al menú principal.'
        onConfirm={() => router.push('/dashboard')} // Redirige al inicio del dashboard
      />
    </>
  );
}
