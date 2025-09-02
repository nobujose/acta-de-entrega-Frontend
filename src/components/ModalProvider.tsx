// src/components/ModalProvider.tsx
'use client';

import { useModalStore } from '@/stores/useModalStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function ModalProvider() {
  const { isOpen, close, type, payload } = useModalStore();

  if (!type) {
    return null;
  }

  let modalContent = null;
  switch (type) {
    case 'logoutConfirmation':
      modalContent = (
        // ▼▼▼ CAMBIO REALIZADO AQUÍ ▼▼▼
        <DialogContent className='bg-white max-w-xs'>
          <DialogHeader>
            <DialogTitle>{payload.title}</DialogTitle>
            {payload.description && (
              <DialogDescription>{payload.description}</DialogDescription>
            )}
          </DialogHeader>
          {payload.content}
          <DialogFooter>
            <Button variant='outline' onClick={close}>
              No
            </Button>
            <Button
              className='bg-red-600 hover:bg-red-700 text-white'
              onClick={() => {
                payload.onConfirm?.();
                close();
              }}
            >
              Sí
            </Button>
          </DialogFooter>
        </DialogContent>
      );
      break;
    default:
      modalContent = null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {modalContent}
    </Dialog>
  );
}
