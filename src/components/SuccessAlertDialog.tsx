// src/components/SuccessAlertDialog.tsx
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Definimos las propiedades que nuestro componente aceptará
interface SuccessAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText?: string;
  onConfirm: () => void;
}

export function SuccessAlertDialog({
  isOpen,
  onClose,
  title,
  description,
  buttonText = 'Entendido',
  onConfirm,
}: SuccessAlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction
          onClick={onConfirm}
          className='bg-[#001A70] text-white hover:bg-[#001A70]/90'
        >
          {buttonText}
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
