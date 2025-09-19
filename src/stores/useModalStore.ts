// src/stores/useModalStore.ts
import { create } from 'zustand';
import { ReactNode } from 'react';

// Definimos los tipos de modales que puede haber
export type ModalType = 'logoutConfirmation' | 'userProfileOptions';

interface ModalPayload {
  title: string;
  description?: React.ReactNode;
  content?: ReactNode;
  onConfirm: () => void;
}

interface ModalStore {
  type: ModalType | null;
  payload: Partial<ModalPayload>;
  isOpen: boolean;
  open: (type: ModalType, payload: Partial<ModalPayload>) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  payload: {},
  isOpen: false,
  open: (type, payload) => set({ isOpen: true, type, payload }),
  close: () => set({ isOpen: false, type: null, payload: {} }),
}));
