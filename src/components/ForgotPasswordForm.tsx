// src/components/ForgotPasswordForm.tsx
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Esquemas de validación para cada paso
const step1Schema = z.object({
  email: z.string().email({ message: 'Debe ser un correo válido.' }),
});

const step2Schema = z.object({
  otp: z.string().min(6, { message: 'El código debe tener 6 dígitos.' }),
});

const step3Schema = z
  .object({
    password: z.string().min(8, { message: 'Mínimo 8 caracteres.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(''); // Guardar el email para usarlo en los siguientes pasos

  // -> Usamos un esquema dinámico dependiendo del paso actual
  const currentSchema =
    step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Definimos un tipo que es una unión de los posibles datos del formulario
  type FormData =
    | z.infer<typeof step1Schema>
    | z.infer<typeof step2Schema>
    | z.infer<typeof step3Schema>;

  const onSubmit = async (data: FormData) => {
    if (step === 1 && 'email' in data) {
      // --- LÓGICA PASO 1: ENVIAR CORREO ---
      try {
        // Aquí llamarías a tu endpoint de backend para "forgot-password"
        // await apiClient.post('/auth/forgot-password', { email: data.email });
        console.log('Enviando OTP a:', data.email);
        setEmail(data.email); // Guardamos el email
        setStep(2); // Avanzamos al siguiente paso
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        form.setError('email', { message: 'Este correo no está registrado.' });
      }
    } else if (step === 2 && 'otp' in data) {
      // --- LÓGICA PASO 2: VERIFICAR CÓDIGO ---
      try {
        // Aquí llamarías a tu endpoint para "verify-otp"
        // await apiClient.post('/auth/verify-otp', { email, otp: data.otp });
        console.log('Verificando OTP:', data.otp);
        setStep(3);
      } catch (error) {
        console.error('Error al verificar el OTP:', error);
        form.setError('otp', {
          message: 'El código es incorrecto o ha expirado.',
        });
      }
    } else if (step === 3 && 'password' in data) {
      // --- LÓGICA PASO 3: RESTABLECER CONTRASEÑA ---
      try {
        // Aquí llamarías a tu endpoint para "reset-password"
        // await apiClient.post('/auth/reset-password', { email, newPassword: data.password });
        console.log('Contraseña actualizada para:', email);
        alert('¡Contraseña actualizada con éxito!');
        router.push('/login');
      } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        alert('Ocurrió un error al actualizar la contraseña.');
      }
    }
  };

  return (
    <div className='w-full max-w-md'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Recuperar contraseña
        </h1>
        <p className='text-gray-500'>
          {step === 1 && 'Ingresa el correo electrónico asociado a tu cuenta.'}
          {step === 2 && `Hemos enviado un código a ${email}`}
          {step === 3 && 'Tu nueva contraseña debe ser segura.'}
        </p>
      </div>

      {/* Indicador de Pasos */}
      <div className='flex items-center justify-center space-x-8 mb-8'>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`text-center transition-opacity duration-300 ${step >= s ? 'opacity-100' : 'opacity-50'}`}
          >
            <div
              className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step >= s ? 'bg-[#001A70] text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {s}
            </div>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {step === 1 && (
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
          )}
          {step === 2 && (
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Verificación</FormLabel>
                  <FormControl>
                    <Input placeholder='123456' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Mínimo 8 caracteres'
                        {...field}
                      />
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
                      <Input
                        type='password'
                        placeholder='Confirma tu nueva contraseña'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button
            type='submit'
            className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
          >
            {step === 1 && 'Enviar'}
            {step === 2 && 'Verificar'}
            {step === 3 && 'Actualizar contraseña'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
