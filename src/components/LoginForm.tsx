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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '@/services/authService';
import { useAuthStore } from '@/stores/useAuthStore';

// El esquema de validación no cambia
const formSchema = z.object({
  email: z.string().email({
    message: 'Por favor, ingresa un correo electrónico válido.',
  }),
  password: z.string().min(1, {
    message: 'La contraseña es requerida.',
  }),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // Nuevos estados para manejar la carga y los errores de la API
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  // Lógica de envío actualizada para llamar al backend
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await loginUser(values);
      console.log('Login exitoso:', response);

      // Usamos setAuth para guardar el token y los datos del usuario globalmente
      setAuth(response.token, response.user);

      // Redirigimos al dashboard
      router.replace('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full max-w-sm'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-[#001A70]'>Actas de Entrega</h1>
        <p className='text-gray-500'>Inicia sesión para continuar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Mostramos el error de la API si existe */}
          {apiError && (
            <div
              className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
              role='alert'
            >
              <span className='block sm:inline'>{apiError}</span>
            </div>
          )}

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ingresa tu correo'
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Ingresa tu contraseña'
                      {...field}
                      disabled={isLoading}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='text-right text-sm'>
            <Link
              href='/recuperar-contrasena'
              className='font-semibold text-[#001A70] hover:underline'
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Button
            type='submit'
            className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
          </Button>
        </form>
      </Form>
      <div className='text-center mt-6 text-sm'>
        <span className='text-gray-600'>¿No tienes cuenta? </span>
        <Link
          href='/registro'
          className='font-bold text-[#001A70] hover:underline'
        >
          Regístrate AQUÍ
        </Link>
      </div>
    </div>
  );
}
