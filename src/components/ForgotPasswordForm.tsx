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
import { Eye, EyeOff } from 'lucide-react';
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from '@/services/authService';

// --- ESQUEMAS DE VALIDACIÓN PARA CADA PASO ---
const step1Schema = z.object({
  email: z.string().email({ message: 'Debe ser un correo válido.' }),
});
const step2Schema = z.object({
  otp: z
    .string()
    .min(6, {
      message:
        'intrude el codigo que se a enviado al correo del paso anterior.',
    }),
});
const step3Schema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
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
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

// -> Se crea un esquema completo para inicializar el formulario
const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', otp: '', password: '', confirmPassword: '' },
  });

  const handleStep1Submit = async () => {
    setIsLoading(true);
    setApiError(null);
    const isValid = await form.trigger('email');
    if (isValid) {
      try {
        const emailValue = form.getValues('email');
        await forgotPassword(emailValue);
        setEmail(emailValue);
        setStep(2);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError('Ocurrió un error inesperado.');
        }
      }
    }
    setIsLoading(false);
  };

  const handleStep2Submit = async () => {
    setIsLoading(true);
    setApiError(null);
    const isValid = await form.trigger('otp');
    if (isValid) {
      try {
        const otpValue = form.getValues('otp');
        const response = await verifyOtp(email, otpValue);
        setResetToken(response.resetToken);
        setStep(3);
      } catch (error) {
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError('Ocurrió un error inesperado.');
        }
      }
    }
    setIsLoading(false);
  };

  // ▼▼▼ CORRECCIÓN ▼▼▼
  // La función ahora pasa un objeto con ambas contraseñas al servicio.
  const onFinalSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await resetPassword(
        {
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        },
        resetToken
      );
      alert('¡Contraseña actualizada con éxito!');
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          {step === 1 && 'Recuperar contraseña'}
          {step === 2 && 'Verificar código'}
          {step === 3 && 'Establecer nueva contraseña'}
        </h1>
        <p className='text-gray-500 mt-2'>
          {step === 1 && 'Ingresa el correo electrónico asociado a tu cuenta.'}
          {step === 2 && (
            <>
              Hemos enviado un código a{' '}
              <span className='font-bold'>{email}</span>
            </>
          )}
          {step === 3 && 'Tu nueva contraseña debe ser segura.'}
        </p>
      </div>

      <div className='flex items-center justify-center space-x-8 mb-8'>
        {[
          { num: 1, label: 'Enviar correo' },
          { num: 2, label: 'Código' },
          { num: 3, label: 'Nueva Contraseña' },
        ].map(({ num, label }) => (
          <div
            key={num}
            className={`text-center transition-opacity duration-300 ${
              step >= num ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div
              className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                step >= num
                  ? 'bg-[#001A70] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {num}
            </div>
            <p className='mt-2 text-xs'>{label}</p>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinalSubmit)} className='space-y-6'>
          {apiError && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
              {apiError}
            </div>
          )}

          {step === 1 && (
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
          )}
          {step === 2 && (
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Verificación</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='123456'
                      {...field}
                      disabled={isLoading}
                    />
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
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Mínimo 8 caracteres'
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
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
                          placeholder='Confirma tu nueva contraseña'
                          {...field}
                          disabled={isLoading}
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400'
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <Button
              type='button'
              onClick={handleStep1Submit}
              className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Enviar'}
            </Button>
          )}
          {step === 2 && (
            <Button
              type='button'
              onClick={handleStep2Submit}
              className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Verificar'}
            </Button>
          )}
          {step === 3 && (
            <Button
              type='submit'
              className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Actualizar contraseña'}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
