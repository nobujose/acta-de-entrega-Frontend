// src/components/GuardedButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormDirtyStore } from '@/stores/useFormDirtyStore';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';
import { Button, type buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';

// 1. Definimos las nuevas props. Heredan todas las de un botón normal
//    y le añadimos la prop 'href' que necesitamos.
interface GuardedButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

export function GuardedButton({
  href,
  onClick,
  children,
  variant = 'link',
  ...props
}: GuardedButtonProps) {
  const router = useRouter();
  const { isDirty, setIsDirty } = useFormDirtyStore();
  const [showDialog, setShowDialog] = useState(false);
  const [intendedHref, setIntendedHref] = useState('');

  // 2. La lógica de click ahora decide si navegar o mostrar el diálogo.
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDirty) {
      e.preventDefault(); // Detenemos cualquier acción por defecto
      setIntendedHref(href);
      setShowDialog(true);
    } else {
      // Si el formulario no tiene cambios, navegamos directamente.
      router.push(href);
    }

    // Si el botón tiene otra función onClick, la ejecutamos.
    if (onClick) {
      onClick(e);
    }
  };

  const handleConfirm = () => {
    setIsDirty(false); // Reseteamos el estado
    setShowDialog(false);
    router.push(intendedHref);
  };

  const handleCancel = () => {
    setShowDialog(false);
    setIntendedHref('');
  };

  // 3. El componente ahora renderiza un <Button> de Shadcn,
  //    pasándole todas las props y nuestro manejador de click.
  return (
    <>
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>
      <UnsavedChangesDialog
        isOpen={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
