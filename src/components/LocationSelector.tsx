'use client';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { FormField } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import type { Control, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { actaMaximaAutoridadSchema } from '@/lib/schemas';

// Datos de estados y ciudades de Venezuela
const venezuelaData = {
  Amazonas: [
    'La Esmeralda',
    'San Fernando de Atabapo',
    'Puerto Ayacucho',
    'Isla de Ratón',
  ],
  Anzoátegui: [
    'Anaco',
    'Aragua de Barcelona',
    'Lechería',
    'Puerto Píritu',
    'Valle de Guanape',
    'Pariaguán',
    'Guanta',
    'Puerto La Cruz',
    'Onoto',
    'San Mateo',
    'Clarines',
    'Píritu',
    'San José de Guanipa',
    'Boca de Uchire',
    'Santa Ana',
    'Barcelona',
    'El Tigre',
    'El Chaparro',
    'El Pueblo de Queregua',
  ],
  Apure: [
    'Achaguas',
    'Biruaca',
    'Bruzual',
    'El Amparo',
    'El Nula',
    'Elorza',
    'Guasdualito',
    'Mantecal',
    'Puerto Páez',
    'San Fernando de Apure',
    'San Juan de Payara',
  ],
  Aragua: [
    'Barbacoas',
    'Cagua',
    'Camatagua',
    'Choroní',
    'Colonia Tovar',
    'El Consejo',
    'La Victoria',
    'Las Tejerías',
    'Magdaleno',
    'Maracay',
    'Ocumare de la Costa',
    'Palo Negro',
    'San Casimiro',
    'San Mateo',
    'San Sebastián',
    'Santa Cruz de Aragua',
    'Tocorón',
    'Turmero',
    'Villa de Cura',
    'Zuata',
  ],
  Barinas: [
    'Alberto Arvelo Torrealba',
    'Barinas',
    'Barinitas',
    'Barrancas',
    'Calderas',
    'Capitanejo',
    'Ciudad Bolivia',
    'El Cantón',
    'Las Veguitas',
    'Libertad',
    'Sabaneta',
    'Santa Bárbara de Barinas',
    'Socopó',
  ],
  Bolívar: [
    'Caicara del Orinoco',
    'Canaima',
    'Ciudad Bolívar',
    'Ciudad Piar',
    'El Callao',
    'El Dorado',
    'El Manteco',
    'El Palmar',
    'Guasipati',
    'Guri',
    'La Paragua',
    'Matanzas',
    'Puerto Ordaz',
    'San Félix',
    'Santa Elena de Uairén',
    'Tumeremo',
    'Unare',
    'Upata',
  ],
  Carabobo: [
    'Bejuma',
    'Belén',
    'Canoabo',
    'Central Tacarigua',
    'Chirgua',
    'Ciudad Alianza',
    'El Palito',
    'Guacara',
    'Guigue',
    'Las Trincheras',
    'Los Guayos',
    'Mariara',
    'Miranda',
    'Montalbán',
    'Morón',
    'Naguanagua',
    'Puerto Cabello',
    'San Joaquín',
    'Tocuyito',
    'Urama',
    'Valencia',
    'Vigirima',
  ],
  Cojedes: [
    'Aguirre',
    'Acarigua',
    'Apartaderos Cojedes',
    'Arismendi',
    'Bárbula',
    'Campo Carabobo',
    'El Baúl',
    'El Pao Cojedes',
    'Lagunitas',
    'Las Vegas',
    'Libertad de Cojedes',
    'Macapo',
    'Manrique',
    'San Carlos',
    'Tinaquillo',
  ],
  'Delta Amacuro': ['Tucupita'],
  'Distrito Capital': ['Caracas'],
  Falcón: [
    'Adícora',
    'Boca de Aroa',
    'Cabure',
    'Capadare',
    'Capatárida',
    'Chichiriviche',
    'Coro',
    'Cumarebo',
    'Dabajuro',
    'Judibana',
    'La Cruz de Taratara',
    'La Vela de Coro',
    'Los Taques',
    'Mapararí',
    'Mene de Mauroa',
    'Mirimire',
    'Pedregal',
    'Píritu Falcón',
    'Pueblo Nuevo Falcón',
    'Puerto Cumarebo',
    'Punta Cardón',
    'San Juan de los Cayos',
    'San Luis',
    'Santa Ana de Coro',
    'Santa Cruz de Bucaral',
    'Tocopero',
    'Tocuyo de la Costa',
    'Tucacas',
    'Yaracal',
  ],
  Guárico: [
    'Altagracia de Orituco',
    'Cabruta',
    'Calabozo',
    'Camaguán',
    'Chaguaramas',
    'El Socorro',
    'El Sombrero',
    'Las Mercedes de los Llanos',
    'Lezama',
    'Ortiz',
    'San José de Guaribe',
    'San Juan de los Morros',
    'Santa María de Ipire',
    'Tucupido',
    'Valle de la Pascua',
    'Zaraza',
  ],
  Lara: [
    'Aguada Grande',
    'Agua Viva',
    'Atarigua',
    'Barquisimeto',
    'Bobare',
    'Cabudare',
    'Carora',
    'Cubiro',
    'Cují',
    'Duaca',
    'El Manzano',
    'El Tocuyo',
    'Guaríco',
    'Humocaro Alto',
    'Humocaro Bajo',
    'La Miel',
    'Moroturo',
    'Quíbor',
    'Río Claro',
    'Sanare',
    'Santa Inés',
    'Sarare',
    'Siquisique',
    'Tintorero',
  ],
  Mérida: [
    'Apartaderos',
    'Arapuey',
    'Bailadores',
    'Caja Seca',
    'Canaguá',
    'Capurí',
    'Chachopo',
    'Chiguará',
    'Ejido',
    'El Vigía',
    'La Azulita',
    'La Playa',
    'Lagunillas',
    'Mérida',
    'Mesa de Bolívar',
    'Mucuchíes',
    'Mucujepe',
    'Mucurubá',
    'Nueva Bolivia',
    'Palmarito',
    'Pueblo Llano',
    'Santa Cruz de Mora',
    'Santa Elena de Arenales',
    'Santo Domingo',
    'Tabay',
    'Timotes',
    'Torondoy',
    'Tovar',
    'Tucaní',
    'Zea',
  ],
  Miranda: [
    'Araguita',
    'Carrizal',
    'Caucagua',
    'Chacao',
    'Charallave',
    'Chirimena',
    'Chuspa',
    'Cúa',
    'Cupira',
    'Curiepe',
    'El Cafetal',
    'El Clavo',
    'El Guapo',
    'El Jarillo',
    'Filas de Mariche',
    'Guarenas',
    'Guatire',
    'Higuerote',
    'La Dolorita',
    'Los Anaucos',
    'Los Teques',
    'Mamporal',
    'Ocumare del Tuy',
    'Panaquire',
    'Paracotos',
    'Petare',
    'Río Chico',
    'San Antonio de los Altos',
    'San Diego de los Altos',
    'San Fernando del Guapo',
    'San Francisco de Yare',
    'San José de Barlovento',
    'San José de Río Chico',
    'San Pedro de los Altos',
    'Santa Lucía',
    'Santa Teresa del Tuy',
    'Tacarigua de la Laguna',
    'Tacarigua de Mamporal',
    'Tácata',
    'Turumo',
  ],
  Monagas: [
    'Aguasay',
    'Aragua de Maturín',
    'Barrancas del Orinoco',
    'Caicara de Maturín',
    'Caripe',
    'Caripito',
    'Chaguaramal',
    'Chaguaramas Monagas',
    'Cumanacoa',
    'Guanaguana',
    'Maturín',
    'Miraflores',
    'Punta de Mata',
    'Quiriquire',
    'San Antonio de Maturín',
    'San Vicente de Monagas',
    'Santa Bárbara de Monagas',
    'Temblador',
    'Teresén',
    'Uracoa',
  ],
  'Nueva Esparta': [
    'Altagracia',
    'Boca de Pozo',
    'Boca de Río',
    'El Espinal',
    'El Valle del Espíritu Santo',
    'El Yaque',
    'Juangriego',
    'La Asunción',
    'La Guardia',
    'Pampatar',
    'Porlamar',
    'Punta de Piedras',
    'San Juan Bautista',
    'Santa Ana del Norte',
  ],
  Portuguesa: [
    'Acarigua',
    'Agua Blanca',
    'Araure',
    'Biscucuy',
    'Boconoíto',
    'Campo Elías',
    'Chabasquén',
    'Guanare',
    'Guanarito',
    'La Aparición',
    'La Misión',
    'Mesa de Cavacas',
    'Ospino',
    'Papelón',
    'Payara',
    'Píritu de Portuguesa',
    'San Rafael de Onoto',
    'Santa Rosalía',
    'Turén',
  ],
  Sucre: [
    'Altos de Sucre',
    'Araya',
    'Cariaco',
    'Carúpano',
    'Casanay',
    'Cumaná',
    'Cumanacoa',
    'El Morro de Puerto Santo',
    'El Pilar',
    'El Rincón',
    'Guaca',
    'Guiria',
    'Irapa',
    'La Toma',
    'Mariguitar',
    'Río Caribe',
    'San Antonio del Golfo',
    'San José de Aerocuar',
    'San Vicente de Sucre',
    'Santa Fe de Sucre',
    'Tunapuy',
    'Yaguaraparo',
    'Yoco',
  ],
  Táchira: [
    'Abejales',
    'Borotá',
    'Bramón',
    'Capacho',
    'Colón',
    'Coloncito',
    'Cordero',
    'El Cobre',
    'El Piñal',
    'Independencia',
    'Jáuregui',
    'La Fría',
    'La Grita',
    'La Pedrera',
    'La Tendida',
    'Las Delicias',
    'Las Hernández',
    'Lobatera',
    'Michelena',
    'Palmira',
    'Pregonero',
    'Queniquea',
    'Rubio',
    'San Antonio del Táchira',
    'San Cristóbal',
    'San José de Bolívar',
    'San Josecito',
    'San Juan de Colón',
    'San Pedro del Río',
    'Santa Ana del Táchira',
    'Seboruco',
    'Táriba',
    'Ureña',
    'Umuquena',
  ],
  Trujillo: [
    'Batatal',
    'Betijoque',
    'Boconó',
    'Carache',
    'Chejendé',
    'Cuicas',
    'El Dividive',
    'El Jaguito',
    'Escuque',
    'Isnotú',
    'Jajó',
    'La Cejita',
    'La Mesa de Esnujaque',
    'La Puerta',
    'Mendoza Fría',
    'Meseta de Chimpire',
    'Monay',
    'Motatán',
    'Pampán',
    'Pampanito',
    'Sabana de Mendoza',
    'Santa Ana de Trujillo',
    'Tostós',
    'Trujillo',
    'Valera',
  ],
  Vargas: [
    'Caraballeda',
    'Carayaca',
    'Catia La Mar',
    'La Guaira',
    'Macuto',
    'Maiquetía',
    'Naiguatá',
  ],
  Yaracuy: [
    'Aroa',
    'Boraure',
    'Campo Elías de Yaracuy',
    'Chivacoa',
    'Cocorote',
    'Farriar',
    'Guama',
    'Marín',
    'Nirgua',
    'Sabana de Parra',
    'Salom',
    'San Felipe',
    'San Pablo de Yaracuy',
    'Urachiche',
    'Yaritagua',
    'Yumare',
  ],
  Zulia: [
    'Bachaquero',
    'Bobures',
    'Cabimas',
    'Campo Mara',
    'Campo Rojo',
    'Carrasquero',
    'Casigua',
    'Ciudad Ojeda',
    'El Batey',
    'El Carmelo',
    'El Chivo',
    'El Guayabo',
    'El Moján',
    'El Venado',
    'Encontrados',
    'Gibraltar',
    'Isla de Toas',
    'La Concepción del Zulia',
    'La Paz',
    'La Sierrita',
    'Lagunillas del Zulia',
    'Las Piedras de Perijá',
    'Los Cortijos',
    'Machiques',
    'Maracaibo',
    'Mene Grande',
    'Palmarejo',
    'Paraguaipoa',
    'Potrerito',
    'Pueblo Nuevo del Zulia',
    'Puertos de Altagracia',
    'Punta Gorda',
    'Sabaneta de Palma',
    'San Carlos del Zulia',
    'San Francisco',
    'San José de Perijá',
    'San Rafael de El Moján',
    'San Timoteo',
    'Santa Bárbara del Zulia',
    'Santa Cruz de Mara',
    'Santa Cruz del Zulia',
    'Santa Rita',
    'Sinamaica',
    'Tamare',
    'Tía Juana',
    'Villa del Rosario',
  ],
};

const estados = Object.keys(venezuelaData);

type FormData = z.infer<typeof actaMaximaAutoridadSchema>;

interface LocationSelectorProps {
  control: Control<FormData>;
  form: UseFormReturn<FormData>;
}

export function LocationSelector({ control, form }: LocationSelectorProps) {
  const { watch, setValue } = form;
  const selectedEstado = watch('estadoSuscripcion');

  // Obtiene las ciudades del estado seleccionado
  const ciudades = selectedEstado
    ? venezuelaData[selectedEstado as keyof typeof venezuelaData]
    : [];

  // Reinicia el valor de la ciudad cuando el estado cambia
  useEffect(() => {
    setValue('ciudadSuscripcion', '');
  }, [selectedEstado, setValue]);

  return (
    <>
      <FormField
        name='estadoSuscripcion'
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado donde se suscribe</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Seleccione un estado' />
                </SelectTrigger>
              </FormControl>
              <SelectContent
                position='popper'
                className='bg-white z-50 max-h-60 overflow-y-auto'
              >
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name='ciudadSuscripcion'
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ciudad donde se suscribe</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={!selectedEstado} // Se deshabilita si no hay estado
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Seleccione una ciudad' />
                </SelectTrigger>
              </FormControl>
              <SelectContent
                position='popper'
                className='bg-white z-50 max-h-60 overflow-y-auto'
              >
                {ciudades.map((ciudad) => (
                  <SelectItem key={ciudad} value={ciudad}>
                    {ciudad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
