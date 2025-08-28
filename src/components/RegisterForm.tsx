// src/components/RegisterForm.tsx
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { registerUser } from '@/services/authService'; // -> 1. Importamos la nueva función

// (El esquema de validación no cambia)
const formSchema = z
  .object({
    email: z.string().email({ message: 'Debe ser un correo válido.' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
    confirmPassword: z.string(),
    nombre: z.string().min(1, { message: 'El nombre es requerido.' }),
    apellido: z.string().min(1, { message: 'El apellido es requerido.' }),
    telefono: z.string().min(1, { message: 'El teléfono es requerido.' }),
    institucion: z.string().min(1, { message: 'La institución es requerida.' }),
    cargo: z.string().min(1, { message: 'El cargo es requerido.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  // -> 2. Nuevos estados para manejar la carga y los errores
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nombre: '',
      apellido: '',
      telefono: '',
      institucion: '',
      cargo: '',
    },
  });

  const handleNextStep = async () => {
    const isStep1Valid = await form.trigger([
      'email',
      'password',
      'confirmPassword',
    ]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  // -> 3. Lógica de envío final actualizada para llamar al backend
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setApiError(null);

    try {
      // Mapeamos los nombres del formulario a los que espera el backend
      const dataToSend = {
        email: values.email,
        password: values.password,
        name: values.nombre, // 'nombre' se convierte en 'name'
        apellido: values.apellido,
        telefono: values.telefono,
        institucion: values.institucion,
        cargo: values.cargo,
      };

      await registerUser(dataToSend);
      setShowSuccessDialog(true); // Mostramos el pop-up de éxito
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Ocurrió un error inesperado durante el registro.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='w-full max-w-md'>
        {/* ... (código del formulario sin cambios, solo se añaden los estados de carga y error) ... */}
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className='flex items-center text-gray-600 hover:text-gray-800 mb-4'
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Volver
          </button>
        )}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            {step === 1 ? 'Crea tu cuenta' : 'Completa tus datos'}
          </h1>
          <p className='text-gray-500'>
            Por favor, introduce tus datos para continuar.
          </p>
        </div>

        <div className='flex items-center justify-center space-x-8 mb-8'>
          <div
            className={`text-center transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'opacity-50'}`}
          >
            <div
              className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step === 1 ? 'bg-[#001A70] text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              1
            </div>
            <p
              className={`mt-2 text-sm font-semibold ${step === 1 ? 'text-[#001A70]' : 'text-gray-500'}`}
            >
              Credenciales
            </p>
          </div>
          <div
            className={`text-center transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'opacity-50'}`}
          >
            <div
              className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step === 2 ? 'bg-[#001A70] text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              2
            </div>
            <p
              className={`mt-2 text-sm font-semibold ${step === 2 ? 'text-[#001A70]' : 'text-gray-500'}`}
            >
              Datos personales
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* -> 4. Mostramos el error de la API si existe */}
            {apiError && (
              <div
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                role='alert'
              >
                <span className='block sm:inline'>{apiError}</span>
              </div>
            )}

            <div className={step === 1 ? 'block' : 'hidden'}>
              <div className='space-y-4'>
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
                            placeholder='Mínimo 8 caracteres'
                            {...field}
                            disabled={isLoading}
                          />
                          <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute inset-y-0 right-0 pr-3 flex items-center'
                          >
                            <EyeOff
                              className={`h-5 w-5 ${showPassword ? 'text-gray-400' : 'hidden'}`}
                            />
                            <Eye
                              className={`h-5 w-5 ${showPassword ? 'hidden' : 'text-gray-400'}`}
                            />
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
                      <FormLabel>Confirmar Contraseña</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Repite tu contraseña'
                            {...field}
                            disabled={isLoading}
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className='absolute inset-y-0 right-0 pr-3 flex items-center'
                          >
                            <EyeOff
                              className={`h-5 w-5 ${showConfirmPassword ? 'text-gray-400' : 'hidden'}`}
                            />
                            <Eye
                              className={`h-5 w-5 ${showConfirmPassword ? 'hidden' : 'text-gray-400'}`}
                            />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className={step === 2 ? 'block' : 'hidden'}>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='nombre'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ingresa tu nombre'
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
                    name='apellido'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Ingresa tu apellido'
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='telefono'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ingresa tu número'
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
                  name='institucion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institución</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ingresa tu institución'
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
                  name='cargo'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Ingresa tu cargo'
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='text-sm bg-gray-50 p-4 rounded-lg text-center text-gray-600'>
              Al crear una cuenta, aceptas los{' '}
              <Link
                href='/terminos'
                className='font-semibold text-[#001A70] hover:underline'
              >
                Términos y Condiciones
              </Link>{' '}
              y la{' '}
              <Link
                href='/privacidad'
                className='font-semibold text-[#001A70] hover:underline'
              >
                Política de Privacidad
              </Link>
              .
            </div>

            {step === 1 ? (
              <Button
                type='button'
                onClick={handleNextStep}
                className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type='submit'
                className='w-full bg-[#001A70] hover:bg-[#001A70]/90 text-white text-lg py-6'
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Button>
            )}
          </form>
        </Form>
        <div className='text-center mt-6 text-sm'>
          <span className='text-gray-600'>¿Ya tienes una cuenta? </span>
          <Link
            href='/login'
            className='font-bold text-[#001A70] hover:underline'
          >
            Inicia sesión
          </Link>
        </div>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Registro Exitoso!</AlertDialogTitle>
            <AlertDialogDescription>
              Hemos enviado un correo para que valides tu cuenta. Por favor,
              revisa tu bandeja de entrada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={() => router.push('/login')}
            className='bg-[#001A70] hover:bg-[#001A70]/90'
          >
            Entendido
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
