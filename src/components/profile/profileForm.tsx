// src/components/profile/EditProfileForm.tsx
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
import { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { SuccessAlertDialog } from '../SuccessAlertDialog';
import { useRouter } from 'next/navigation';

// Esquema de validación para los campos del perfil
const profileSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(50, 'El nombre no puede exceder 50 caracteres.')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/,
      'El nombre debe ser una sola palabra y solo contener letras.'
    ),
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres.')
    .max(50, 'El apellido no puede exceder 50 caracteres.')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/,
      'El apellido debe ser una sola palabra y solo contener letras.'
    ),
  telefono: z
    .string()
    .regex(/^\d{11}$/, 'El teléfono debe tener 11 dígitos (ej. 04141234567).'),
  institucion: z.string().min(1, 'La institución es requerida.'),
  cargo: z.string().min(1, 'El cargo es requerido.'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  //const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      institucion: '',
      cargo: '',
    },
  });

  // Efecto para cargar los datos del usuario al iniciar
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get('/user/profile');
        form.reset(response.data);
      } catch {
        setErrorMessage('No se pudieron cargar los datos del perfil.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await apiClient.put('/user/profile', data);
      setIsEditing(false);

      // En lugar de setSuccessMessage, activamos el popup
      setShowSuccessDialog(true);

      if (user) {
        const updatedUser = {
          ...user,
          name: data.nombre,
          apellido: data.apellido,
        };
        const token = localStorage.getItem('authToken');
        if (token) setAuth(token, updatedUser);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado al guardar.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !form.formState.isDirty) {
    return <p>Cargando perfil...</p>;
  }

  // ▼▼▼ 3. AJUSTAMOS LA ESTRUCTURA DEL RETURN ▼▼▼
  return (
    <>
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-medium text-[#001A70]'>Editar Perfil</h3>
          <p className='text-sm text-muted-foreground'>
            Actualiza tu información personal y profesional.
          </p>
        </div>

        {/* Eliminamos la línea que mostraba el successMessage */}
        {errorMessage && (
          <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            {/* ▼▼▼ CAMPOS ORGANIZADOS EN UNA GRILLA ▼▼▼ */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2'>
              <FormField
                name='nombre'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='apellido'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='telefono'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='institucion'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institución</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='cargo'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Cargo</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ▼▼▼ BOTONES ALINEADOS A LA DERECHA ▼▼▼ */}
            <div className='flex justify-end gap-2 pt-4'>
              {isEditing ? (
                <>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => {
                      setIsEditing(false);
                      form.reset();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type='submit'
                    disabled={!form.formState.isDirty || isLoading}
                    className='bg-[#001A70] hover:bg-[#001A70]/90 text-white'
                  >
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </>
              ) : (
                <Button
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className='bg-[#001A70] hover:bg-[#001A70]/90 text-white'
                >
                  Editar
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>

      {/* El popup ahora está fuera del div principal, por lo que siempre está disponible */}
      <SuccessAlertDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        title='¡Perfil Actualizado!'
        description='Tu información ha sido guardada exitosamente. Serás redirigido al menú principal.'
        onConfirm={() => router.push('/dashboard')}
      />
    </>
  );
}
