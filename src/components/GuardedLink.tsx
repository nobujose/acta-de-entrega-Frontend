'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormDirtyStore } from '@/stores/useFormDirtyStore';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';

interface GuardedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function GuardedLink({ children, href, ...props }: GuardedLinkProps) {
  const router = useRouter();
  const { isDirty, setIsDirty } = useFormDirtyStore();
  const [showDialog, setShowDialog] = useState(false);
  const [intendedHref, setIntendedHref] = useState<string>('');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDirty) {
      e.preventDefault(); // Detenemos la navegación
      setIntendedHref(href.toString());
      setShowDialog(true);
    }
    // Si no está "sucio", el Link funciona normalmente.
  };

  const handleConfirm = () => {
    setIsDirty(false); // Desbloqueamos la navegación
    setShowDialog(false);
    router.push(intendedHref);
  };

  const handleCancel = () => {
    setShowDialog(false);
    setIntendedHref('');
  };

  return (
    <>
      <Link href={href} {...props} onClick={handleClick}>
        {children}
      </Link>
      <UnsavedChangesDialog
        isOpen={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
