// src/components/LegalPopup.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LegalPopupProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  children: React.ReactNode; // Para pasar el contenido del texto
}

export function LegalPopup({
  isOpen,
  onOpenChange,
  title,
  children,
}: LegalPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>{title}</DialogTitle>
        </DialogHeader>
        <div className='max-h-[60vh] overflow-y-auto pr-4'>{children}</div>
        <DialogClose asChild>
          <Button variant='outline' className='mt-4'>
            Cerrar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
