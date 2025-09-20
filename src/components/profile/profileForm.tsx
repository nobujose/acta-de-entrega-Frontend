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
import { toast } from 'sonner';

// Esquema de validación para los campos del perfil
const profileSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido.'),
  apellido: z.string().min(1, 'El apellido es requerido.'),
  telefono: z.string().min(1, 'El teléfono es requerido.'),
  institucion: z.string().min(1, 'La institución es requerida.'),
  cargo: z.string().min(1, 'El cargo es requerido.'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setAuth } = useAuthStore();

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
      console.log('Iniciando la carga de datos del perfil...'); // Para depurar
      setIsLoading(true);
      try {
        const response = await apiClient.get('/user/profile');
        console.log('Datos recibidos del backend:', response.data); // Para depurar
        form.reset(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del perfil:', error);
        toast.error('No se pudieron cargar los datos del perfil.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      const response = await apiClient.put('/user/profile', data);
      toast.success(response.data.message);
      setIsEditing(false);

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
        toast.error(error.response.data.message);
      } else {
        toast.error('Ocurrió un error inesperado al guardar.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !form.formState.isDirty) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-lg font-medium text-[#001A70]'>Editar Perfil</h3>
        <p className='text-sm text-muted-foreground'>
          Actualiza tu información personal y profesional.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
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
  );
}
