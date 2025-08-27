// src/app/(auth)/registro/page.tsx
import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className='min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className='w-full max-w-lg bg-white p-6 sm:p-10 rounded-xl shadow-md'>
        <RegisterForm />
      </div>
    </div>
  );
}
