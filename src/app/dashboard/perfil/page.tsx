// src/app/dashboard/perfil/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 1. Importamos los componentes que mostrará cada pestaña
import { EditProfileForm } from '@/components/profile/profileForm';
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm';
import { DeleteAccountSection } from '@/components/profile/DeleteAccountSection';

// Definimos los tipos para nuestras pestañas
type ProfileTab = 'edit' | 'password' | 'delete';

export default function PerfilPage() {
  const { setTitle } = useHeader();
  // 2. Creamos un estado para saber qué pestaña está activa
  const [activeTab, setActiveTab] = useState<ProfileTab>('edit');

  useEffect(() => {
    setTitle('Gestión de Perfil');
  }, [setTitle]);

  // 3. Función para renderizar el componente correcto según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'edit':
        return <EditProfileForm />;
      case 'password':
        return <ChangePasswordForm />;
      case 'delete':
        return <DeleteAccountSection />;
      default:
        return <EditProfileForm />;
    }
  };

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      {/* Botones que actúan como pestañas */}
      <div className='p-1 bg-gray-200 rounded-lg flex flex-col sm:flex-row items-center gap-1'>
        <Button
          variant='ghost'
          onClick={() => setActiveTab('edit')}
          className={cn(
            'w-full sm:flex-1 transition-all', // Ocupa todo el ancho en móvil
            activeTab === 'edit'
              ? 'bg-white shadow text-[#001A70] font-semibold'
              : 'hover:bg-gray-300'
          )}
        >
          Editar perfil
        </Button>
        <Button
          variant='ghost'
          onClick={() => setActiveTab('password')}
          className={cn(
            'w-full sm:flex-1 transition-all',
            activeTab === 'password'
              ? 'bg-white shadow text-[#001A70] font-semibold'
              : 'hover:bg-gray-300'
          )}
        >
          Cambiar contraseña
        </Button>
        <Button
          variant='ghost'
          onClick={() => setActiveTab('delete')}
          className={cn(
            'w-full sm:flex-1 transition-all',
            activeTab === 'delete'
              ? 'bg-white shadow text-red-600 font-semibold'
              : 'hover:bg-gray-300'
          )}
        >
          Eliminar cuenta
        </Button>
      </div>

      {/* Contenedor donde se muestra el contenido de la pestaña activa */}
      <div className='bg-white p-6 rounded-lg shadow-md min-h-[20rem]'>
        {renderContent()}
      </div>
    </div>
  );
}
