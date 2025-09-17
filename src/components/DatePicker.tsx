'use client';

import React, { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { FaCalendarAlt } from 'react-icons/fa';
import { cn } from '@/lib/utils';

// Registramos el idioma español para el calendario
registerLocale('es', es);

interface CustomDatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const CustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <button
      type='button'
      className={cn(
        'w-full max-w-sm h-9 justify-start text-left font-normal flex items-center px-3 py-2 text-sm rounded-md border border-input bg-transparent shadow-sm',
        !value && 'text-gray-500'
      )}
      onClick={onClick}
      ref={ref}
    >
      <FaCalendarAlt className='mr-2 h-4 w-4' />
      {value || 'Seleccione una fecha'}
    </button>
  ));
  CustomInput.displayName = 'CustomInput';

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      locale='es'
      dateFormat="d 'de' MMMM 'de' yyyy"
      customInput={<CustomInput />}
      portalId='datepicker-portal'
    />
  );
}
