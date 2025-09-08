'use client';

// Imports existentes
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
import { useState, useEffect } from 'react'; // <-- Se añade useEffect
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '@/services/authService';

// --- NUEVO: Se importa el AlertDialog para el pop-up ---
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // --- NUEVO: Estado para controlar el pop-up de confirmación de correo ---
  const [showEmailVerifiedPopup, setShowEmailVerifiedPopup] = useState(false);

  // --- NUEVO: useEffect para revisar la URL cuando la página carga ---
  useEffect(() => {
    // Usamos la API del navegador para leer los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    // Verificamos si el parámetro 'email_verified' existe y es 'true'
    if (params.get('email_verified') === 'true') {
      // Si es así, cambiamos el estado para mostrar el pop-up
      setShowEmailVerifiedPopup(true);

      // (Opcional) Limpiamos la URL para que el pop-up no reaparezca si el usuario recarga la página
      router.replace('/login', { scroll: false });
    }
  }, [router]); // Se añade router como dependencia

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await loginUser(values);
      console.log('Login exitoso:', response);
      localStorage.setItem('authToken', response.token);
      router.push('/dashboard');
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
    <>
      {' '}
      {/* Se envuelve todo en un Fragment para poder añadir el AlertDialog */}
      <div className='w-full max-w-sm'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-[#001A70]'>
            Actas de Entrega
          </h1>
          <p className='text-gray-500'>Inicia sesión para continuar</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
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
      {/* --- NUEVO: AlertDialog para mostrar el mensaje de confirmación --- */}
      <AlertDialog
        open={showEmailVerifiedPopup}
        onOpenChange={setShowEmailVerifiedPopup}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Correo Confirmado!</AlertDialogTitle>
            <AlertDialogDescription>
              Tu correo electrónico ha sido verificado exitosamente. Ya puedes
              iniciar sesión.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            onClick={() => setShowEmailVerifiedPopup(false)}
            className='bg-[#001A70] hover:bg-[#001A70]/90'
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
