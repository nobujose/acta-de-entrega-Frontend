'use client';

import { useFormContext } from 'react-hook-form';
import type { FieldValues, Path } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

type Option = 'SI' | 'NO' | 'NO APLICA';

interface SiNoQuestionProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  isLoading?: boolean;
  options?: Option[]; // Prop para opciones personalizadas
  onValueChange?: (value: string) => void; // Callback para lógica extra
}

export function SiNoQuestion<T extends FieldValues>({
  name,
  label,
  isLoading = false,
  options = ['SI', 'NO', 'NO APLICA'], // Valor por defecto
  onValueChange,
}: SiNoQuestionProps<T>) {
  const { control } = useFormContext<T>();

  const unselectedStyle =
    'bg-white text-black border-gray-300 shadow-md hover:bg-gray-100';
  const selectedStyle =
    'bg-slate-200 text-slate-900 border-gray-400 shadow-inner hover:bg-slate-200';

  // Mapeo para mostrar el texto correctamente
  const displayTexts: { [key in Option]: string } = {
    SI: 'Sí',
    NO: 'No',
    'NO APLICA': 'No Aplica',
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-3 p-4 border rounded-md'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='flex items-center space-x-4'>
              {options.map((option) => (
                <Button
                  key={option}
                  type='button'
                  variant='outline'
                  onClick={() => {
                    field.onChange(option); // Actualiza el formulario
                    if (onValueChange) onValueChange(option); // Ejecuta la acción extra
                  }}
                  disabled={isLoading}
                  className={cn(
                    field.value === option ? selectedStyle : unselectedStyle
                  )}
                >
                  {displayTexts[option]}
                </Button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
