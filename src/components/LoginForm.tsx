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
import { Eye, EyeOff } from 'lucide-react'; // Necesitarás instalar lucide-react

// 1. Define el esquema de validación
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  // 2. Define la lógica de envío
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aquí llamarías a tu API. Por ahora, simulamos un éxito.
    router.push('/dashboard'); // Redirige al dashboard al iniciar sesión
  }

  return (
    <div className='w-full max-w-sm'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-[#001A70]'>Actas de Entrega</h1>
        <p className='text-gray-500'>Inicia sesión para continuar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder='Ingresa tu correo' {...field} />
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
          >
            Iniciar Sesión
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
