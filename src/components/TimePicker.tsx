'use client';

import React, { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { FaClock } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

registerLocale('es', es);

interface CustomTimePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {
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
      <FaClock className='mr-2 h-4 w-4' />
      {value || 'Seleccione una hora'}
    </button>
  ));
  CustomInput.displayName = 'CustomInput';

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      locale='es'
      // --- Props para configurar el selector de hora ---
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption='Hora'
      dateFormat='h:mm aa'
      timeFormat='h:mm aa'
      // --- Fin de las Props ---
      customInput={<CustomInput />}
      portalId='timepicker-portal'
    />
  );
}
