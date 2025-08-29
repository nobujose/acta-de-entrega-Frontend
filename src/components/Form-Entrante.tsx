// src/components/Form-Entrante.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- Esquema de Validación Zod con mensajes personalizados y todos los campos ---
const formSchema = z.object({
  // --- Paso 1: Datos Generales ---
  email: z
    .string()
    .min(1, 'Campo Requerido')
    .email({ message: 'Debe ser un correo válido.' }),
  rifOrgano: z.string().min(1, 'Campo Requerido'),
  denominacionCargoEntrega: z.string().min(1, 'Campo Requerido'),
  nombreOrgano: z.string().min(1, 'Campo Requerido'),
  ciudadSuscripcion: z.string().min(1, 'Campo Requerido'),
  estadoSuscripcion: z.string().min(1, 'Campo Requerido'),
  horaSuscripcion: z.string().min(1, 'Campo Requerido'),
  fechaSuscripcion: z.string().min(1, 'Campo Requerido'),
  direccionOrgano: z.string().min(1, 'Campo Requerido'),

  // --- Paso 2: Participantes ---
  nombreServidorEntrante: z.string().min(1, 'Campo Requerido'),
  cedulaServidorEntrante: z.string().min(1, 'Campo Requerido'),
  profesionServidorEntrante: z.string().min(1, 'Campo Requerido'),
  designacionServidorEntrante: z.string().min(1, 'Campo Requerido'),
  nombreAuditor: z.string().min(1, 'Campo Requerido'),
  cedulaAuditor: z.string().min(1, 'Campo Requerido'),
  profesionAuditor: z.string().min(1, 'Campo Requerido'),
  nombreTestigo1: z.string().min(1, 'Campo Requerido'),
  cedulaTestigo1: z.string().min(1, 'Campo Requerido'),
  profesionTestigo1: z.string().min(1, 'Campo Requerido'),
  nombreTestigo2: z.string().min(1, 'Campo Requerido'),
  cedulaTestigo2: z.string().min(1, 'Campo Requerido'),
  profesionTestigo2: z.string().min(1, 'Campo Requerido'),

  // --- Paso 3: Detalles de la Entrega ---
  motivoEntrega: z.string().min(1, 'Debe seleccionar un motivo.'),
  nombreServidorSaliente: z.string().min(1, 'Campo Requerido'),
  cedulaServidorSaliente: z.string().min(1, 'Campo Requerido'),
  designacionServidorSaliente: z.string().min(1, 'Campo Requerido'),

  // --- Anexos (Todos los campos del documento) ---
  disponeEstadoSituacionPresupuestaria: z.string().optional(),
  disponeRelacionGastosComprometidosNoCausados: z.string().optional(),
  disponeRelacionGastosComprometidosCausadosNoPagados: z.string().optional(),
  disponeEstadoPresupuestarioPorPartidas: z.string().optional(),
  disponeEstadoPresupuestarioDetalleCuentas: z.string().optional(),
  disponeEstadosFinancieros: z.string().optional(),
  disponeBalanceComprobacion: z.string().optional(),
  disponeEstadoSituacionFinanciera: z.string().optional(),
  disponeEstadoRendimientoFinanciero: z.string().optional(),
  disponeEstadoMovimientosPatrimonio: z.string().optional(),
  disponeRelacionCuentasPorCobrar: z.string().optional(),
  disponeRelacionCuentasPorPagar: z.string().optional(),
  disponeRelacionCuentasFondosTerceros: z.string().optional(),
  disponeSituacionFondosAnticipo: z.string().optional(),
  disponeSituacionCajaChica: z.string().optional(),
  disponeActaArqueoCajasChicas: z.string().optional(),
  disponeListadoRegistroAuxiliarProveedores: z.string().optional(),
  disponeReportesLibrosContables: z.string().optional(),
  disponeReportesCuentasBancarias: z.string().optional(),
  disponeReportesConciliacionesBancarias: z.string().optional(),
  disponeReportesRetenciones: z.string().optional(),
  disponeCuadroResumenCargos: z.string().optional(),
  disponeCuadroResumenValidadoRRHH: z.string().optional(),
  disponeReporteNominas: z.string().optional(),
  disponeInventarioBienes: z.string().optional(),
  disponeEjecucionPlanOperativo: z.string().optional(),
  incluyeCausasIncumplimientoMetas: z.string().optional(),
  disponePlanOperativoAnual: z.string().optional(),
  incluyeClasificacionArchivo: z.string().optional(),
  incluyeUbicacionFicaArchivo: z.string().optional(),
  disponeRelacionMontosFondosAsignados: z.string().optional(),
  disponeSaldoEfectivoFondos: z.string().optional(),
  disponeRelacionBienesAsignados: z.string().optional(),
  disponeRelacionBienesAsignadosUnidadBienes: z.string().optional(),
  disponeEstadosBancariosConciliados: z.string().optional(),
  disponeListaComprobantesGastos: z.string().optional(),
  disponeChequesEmitidosPendientesCobro: z.string().optional(),
  disponeListadoTransferenciaBancaria: z.string().optional(),
  disponeCaucionFuncionario: z.string().optional(),
  disponeCuadroDemostrativoRecaudado: z.string().optional(),
  disponeRelacionExpedientesAbiertos: z.string().optional(),
  disponeSituacionTesoroNacional: z.string().optional(),
  disponeInfoEjecucionPresupuestoNacional: z.string().optional(),
  disponeMontoDeudaPublicaNacional: z.string().optional(),
  disponeSituacionCuentasNacion: z.string().optional(),
  disponeSituacionTesoroEstadal: z.string().optional(),
  disponeInfoEjecucionPresupuestoEstadal: z.string().optional(),
  disponeSituacionCuentasEstado: z.string().optional(),
  disponeSituacionTesoroDistritalMunicipal: z.string().optional(),
  disponeInfoEjecucionPresupuestoDistritalMunicipal: z.string().optional(),
  disponeSituacionCuentasDistritalesMunicipales: z.string().optional(),
  disponeInventarioTerrenosEjidos: z.string().optional(),
  disponeRelacionIngresosVentaTerrenos: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Estructura de pasos mejorada para incluir todos los anexos
const steps = [
  {
    id: 1,
    title: 'Datos Generales del Acta',
    fields: [
      'email',
      'rifOrgano',
      'denominacionCargoEntrega',
      'nombreOrgano',
      'ciudadSuscripcion',
      'estadoSuscripcion',
      'horaSuscripcion',
      'fechaSuscripcion',
      'direccionOrgano',
    ],
  },
  {
    id: 2,
    title: 'Identificación de Participantes',
    fields: [
      'nombreServidorEntrante',
      'cedulaServidorEntrante',
      'profesionServidorEntrante',
      'designacionServidorEntrante',
      'nombreAuditor',
      'cedulaAuditor',
      'profesionAuditor',
      'nombreTestigo1',
      'cedulaTestigo1',
      'profesionTestigo1',
      'nombreTestigo2',
      'cedulaTestigo2',
      'profesionTestigo2',
    ],
  },
  {
    id: 3,
    title: 'Detalles de la Entrega',
    fields: [
      'motivoEntrega',
      'nombreServidorSaliente',
      'cedulaServidorSaliente',
      'designacionServidorSaliente',
    ],
  },
  {
    id: 4,
    title: 'Anexos: Situación Presupuestaria y Financiera',
    fields: [
      'disponeEstadoSituacionPresupuestaria',
      'disponeRelacionGastosComprometidosNoCausados',
      'disponeRelacionGastosComprometidosCausadosNoPagados',
      'disponeEstadoPresupuestarioPorPartidas',
      'disponeEstadoPresupuestarioDetalleCuentas',
      'disponeEstadosFinancieros',
      'disponeBalanceComprobacion',
      'disponeEstadoSituacionFinanciera',
      'disponeEstadoRendimientoFinanciero',
      'disponeEstadoMovimientosPatrimonio',
    ],
  },
  {
    id: 5,
    title: 'Anexos: Cuentas, Fondos y Contabilidad',
    fields: [
      'disponeRelacionCuentasPorCobrar',
      'disponeRelacionCuentasPorPagar',
      'disponeRelacionCuentasFondosTerceros',
      'disponeSituacionFondosAnticipo',
      'disponeSituacionCajaChica',
      'disponeActaArqueoCajasChicas',
      'disponeListadoRegistroAuxiliarProveedores',
      'disponeReportesLibrosContables',
      'disponeReportesCuentasBancarias',
      'disponeReportesConciliacionesBancarias',
      'disponeReportesRetenciones',
    ],
  },
  {
    id: 6,
    title: 'Anexos: RRHH, Bienes y Planificación',
    fields: [
      'disponeCuadroResumenCargos',
      'disponeCuadroResumenValidadoRRHH',
      'disponeReporteNominas',
      'disponeInventarioBienes',
      'disponeEjecucionPlanOperativo',
      'incluyeCausasIncumplimientoMetas',
      'disponePlanOperativoAnual',
      'incluyeClasificacionArchivo',
      'incluyeUbicacionFicaArchivo',
    ],
  },
  {
    id: 7,
    title: 'Anexos: Tesorería y Hacienda',
    fields: [
      'disponeRelacionMontosFondosAsignados',
      'disponeSaldoEfectivoFondos',
      'disponeRelacionBienesAsignados',
      'disponeRelacionBienesAsignadosUnidadBienes',
      'disponeEstadosBancariosConciliados',
      'disponeListaComprobantesGastos',
      'disponeChequesEmitidosPendientesCobro',
      'disponeListadoTransferenciaBancaria',
      'disponeCaucionFuncionario',
      'disponeCuadroDemostrativoRecaudado',
      'disponeRelacionExpedientesAbiertos',
    ],
  },
  {
    id: 8,
    title: 'Anexos: Hacienda Pública (Nacional, Estadal y Municipal)',
    fields: [
      'disponeSituacionTesoroNacional',
      'disponeInfoEjecucionPresupuestoNacional',
      'disponeMontoDeudaPublicaNacional',
      'disponeSituacionCuentasNacion',
      'disponeSituacionTesoroEstadal',
      'disponeInfoEjecucionPresupuestoEstadal',
      'disponeSituacionCuentasEstado',
      'disponeSituacionTesoroDistritalMunicipal',
      'disponeInfoEjecucionPresupuestoDistritalMunicipal',
      'disponeSituacionCuentasDistritalesMunicipales',
      'disponeInventarioTerrenosEjidos',
      'disponeRelacionIngresosVentaTerrenos',
    ],
  },
];

export function ActaEntranteForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    console.log('Datos del formulario a enviar:', data);
    alert('Acta de Entrante creada exitosamente!');
    router.push('/dashboard');
  };

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await form.trigger(fieldsToValidate as (keyof FormData)[]);
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const SiNoQuestion = ({
    name,
    label,
  }: {
    name: keyof FormData;
    label: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-3 p-4 border rounded-md'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex items-center space-x-4'
            >
              <FormItem className='flex items-center space-x-2 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='SI' />
                </FormControl>
                <FormLabel className='font-normal'>Sí</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-2 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='NO' />
                </FormControl>
                <FormLabel className='font-normal'>No</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Formulario: Acta de Entrega Entrante</CardTitle>
        <CardDescription>
          Por favor, complete todos los campos requeridos en cada paso.
        </CardDescription>
        <div className='pt-4'>
          <p className='text-sm font-medium'>
            Paso {currentStep + 1} de {steps.length}: {steps[currentStep].title}
          </p>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className='mt-2'
          />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {currentStep === 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección de correo electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder='ejemplo@correo.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='rifOrgano'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RIF del órgano</FormLabel>
                      <FormControl>
                        <Input placeholder='G-00000000-0' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='denominacionCargoEntrega'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1. Denominación del cargo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Presidencia, Dirección...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='nombreOrgano'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Nombre del órgano</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Instituto Nacional de...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='ciudadSuscripcion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Ciudad donde se suscribe</FormLabel>
                      <FormControl>
                        <Input placeholder='Barquisimeto' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='estadoSuscripcion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. Estado donde se suscribe</FormLabel>
                      <FormControl>
                        <Input placeholder='Lara' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='horaSuscripcion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. Hora de suscripción</FormLabel>
                      <FormControl>
                        <Input type='time' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='fechaSuscripcion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>6. Fecha de suscripción</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='direccionOrgano'
                  render={({ field }) => (
                    <FormItem className='md:col-span-2'>
                      <FormLabel>7. Dirección exacta y completa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Avenida 00 entre calle 00 y 00...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Servidor Público Entrante
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='nombreServidorEntrante'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>8. Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='cedulaServidorEntrante'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>9. Cédula</FormLabel>
                        <FormControl>
                          <Input placeholder='V-00.000.000' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='profesionServidorEntrante'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>10. Profesión</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='designacionServidorEntrante'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>11. Datos de designación</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Auditor(a)
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormField
                    control={form.control}
                    name='nombreAuditor'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>12. Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='cedulaAuditor'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>13. Cédula</FormLabel>
                        <FormControl>
                          <Input placeholder='V-00.000.000' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='profesionAuditor'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>14. Profesión</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Testigos
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                  <div className='space-y-4 p-4 border rounded-md'>
                    <p className='font-medium'>Testigo N° 1</p>
                    <FormField
                      control={form.control}
                      name='nombreTestigo1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>15. Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='cedulaTestigo1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>16. Cédula</FormLabel>
                          <FormControl>
                            <Input placeholder='V-00.000.000' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='profesionTestigo1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>17. Profesión</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='space-y-4 p-4 border rounded-md'>
                    <p className='font-medium'>Testigo N° 2</p>
                    <FormField
                      control={form.control}
                      name='nombreTestigo2'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>18. Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='cedulaTestigo2'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>19. Cédula</FormLabel>
                          <FormControl>
                            <Input placeholder='V-00.000.000' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='profesionTestigo2'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>20. Profesión</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='motivoEntrega'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>21. Motivo de la entrega</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione un motivo' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='Renuncia'>Renuncia</SelectItem>
                          <SelectItem value='Jubilacion'>Jubilación</SelectItem>
                          <SelectItem value='Incapacidad absoluta'>
                            Incapacidad absoluta
                          </SelectItem>
                          <SelectItem value='Destitucion'>
                            Destitución
                          </SelectItem>
                          <SelectItem value='Supresion del cargo'>
                            Supresión del cargo
                          </SelectItem>
                          <SelectItem value='Expiracion del periodo'>
                            Expiración del período
                          </SelectItem>
                          <SelectItem value='Ascenso'>Ascenso</SelectItem>
                          <SelectItem value='Traslado'>Traslado</SelectItem>
                          <SelectItem value='Rotacion'>Rotación</SelectItem>
                          <SelectItem value='Comision de servicio'>
                            Comisión de servicio
                          </SelectItem>
                          <SelectItem value='Licencia'>Licencia</SelectItem>
                          <SelectItem value='Suspension'>Suspensión</SelectItem>
                          <SelectItem value='Inhabilitacion'>
                            Inhabilitación
                          </SelectItem>
                          <SelectItem value='Revocatoria del mandato'>
                            Revocatoria del mandato
                          </SelectItem>
                          <SelectItem value='Declaracion de abandono del cargo'>
                            Declaración de abandono del cargo
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h3 className='text-lg font-semibold border-b pb-2'>
                  Servidor Público Saliente
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormField
                    control={form.control}
                    name='nombreServidorSaliente'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>22. Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='cedulaServidorSaliente'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>23. Cédula</FormLabel>
                        <FormControl>
                          <Input placeholder='V-00.000.000' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='designacionServidorSaliente'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>24. Datos de designación</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEstadoSituacionPresupuestaria'
                  label='¿Dispone del Estado de Situación Presupuestaria?'
                />
                <SiNoQuestion
                  name='disponeRelacionGastosComprometidosNoCausados'
                  label='¿Dispone de la Relación de Gastos Comprometidos, no causados?'
                />
                <SiNoQuestion
                  name='disponeRelacionGastosComprometidosCausadosNoPagados'
                  label='¿Dispone de la Relación de Gastos Comprometidos, causados y no pagados?'
                />
                <SiNoQuestion
                  name='disponeEstadoPresupuestarioPorPartidas'
                  label='¿Dispone del Estado Presupuestario del Ejercicio vigente por partidas?'
                />
                <SiNoQuestion
                  name='disponeEstadoPresupuestarioDetalleCuentas'
                  label='¿Dispone del Estado Presupuestario del Ejercicio con detalles de sus cuentas?'
                />
                <SiNoQuestion
                  name='disponeEstadosFinancieros'
                  label='¿Dispone de los Estados Financieros a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeBalanceComprobacion'
                  label='¿Dispone del Balance de Comprobación y sus notas explicativas?'
                />
                <SiNoQuestion
                  name='disponeEstadoSituacionFinanciera'
                  label='¿Dispone del Estado de Situación Financiera / Balance General?'
                />
                <SiNoQuestion
                  name='disponeEstadoRendimientoFinanciero'
                  label='¿Dispone del Estado de Rendimiento Financiero / Ganancia y Pérdidas?'
                />
                <SiNoQuestion
                  name='disponeEstadoMovimientosPatrimonio'
                  label='¿Dispone del Estado de Movimientos de las Cuentas de Patrimonio?'
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeRelacionCuentasPorCobrar'
                  label='¿Dispone de la Relación de Cuentas por Cobrar?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasPorPagar'
                  label='¿Dispone de la Relación de Cuentas por Pagar?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasFondosTerceros'
                  label='¿Dispone de la Relación de Cuentas de Fondos de Terceros?'
                />
                <SiNoQuestion
                  name='disponeSituacionFondosAnticipo'
                  label='¿Dispone de la Situación de los Fondos en Anticipo?'
                />
                <SiNoQuestion
                  name='disponeSituacionCajaChica'
                  label='¿Dispone de la Situación de la Caja Chica?'
                />
                <SiNoQuestion
                  name='disponeActaArqueoCajasChicas'
                  label='¿Dispone del Acta de arqueo de las Cajas Chicas?'
                />
                <SiNoQuestion
                  name='disponeListadoRegistroAuxiliarProveedores'
                  label='¿Dispone del Listado del Registro Auxiliar de Proveedores?'
                />
                <SiNoQuestion
                  name='disponeReportesLibrosContables'
                  label='¿Dispone de Reportes de Libros Contables (Diario y mayores)?'
                />
                <SiNoQuestion
                  name='disponeReportesCuentasBancarias'
                  label='¿Dispone de Reportes de las Cuentas Bancarias?'
                />
                <SiNoQuestion
                  name='disponeReportesConciliacionesBancarias'
                  label='¿Dispone de Reportes de las Conciliaciones Bancarias?'
                />
                <SiNoQuestion
                  name='disponeReportesRetenciones'
                  label='¿Dispone de Reportes de Retenciones (ISLR, IVA, etc.)?'
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeCuadroResumenCargos'
                  label='¿Dispone de cuadro resumen de cargos existentes?'
                />
                <SiNoQuestion
                  name='disponeCuadroResumenValidadoRRHH'
                  label='¿Dispone de cuadro resumen validado por RRHH?'
                />
                <SiNoQuestion
                  name='disponeReporteNominas'
                  label='¿Dispone de Reporte de Nóminas?'
                />
                <SiNoQuestion
                  name='disponeInventarioBienes'
                  label='¿Dispone de Inventario de Bienes Muebles e Inmuebles?'
                />
                <SiNoQuestion
                  name='disponeEjecucionPlanOperativo'
                  label='¿Dispone de la Ejecución del Plan Operativo?'
                />
                <SiNoQuestion
                  name='incluyeCausasIncumplimientoMetas'
                  label='¿Incluye las causas que originaron el incumplimiento de metas?'
                />
                <SiNoQuestion
                  name='disponePlanOperativoAnual'
                  label='¿Dispone del Plan Operativo Anual?'
                />
                <SiNoQuestion
                  name='incluyeClasificacionArchivo'
                  label='¿Incluye la clasificación del archivo?'
                />
                <SiNoQuestion
                  name='incluyeUbicacionFicaArchivo'
                  label='¿Incluye la ubicación física del archivo?'
                />
              </div>
            )}

            {currentStep === 6 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeRelacionMontosFondosAsignados'
                  label='¿Dispone de la Relación de los montos de fondos asignados?'
                />
                <SiNoQuestion
                  name='disponeSaldoEfectivoFondos'
                  label='¿Dispone del Saldo en efectivo de dichos fondos?'
                />
                <SiNoQuestion
                  name='disponeRelacionBienesAsignados'
                  label='¿Dispone de la Relación de los bienes asignados?'
                />
                <SiNoQuestion
                  name='disponeRelacionBienesAsignadosUnidadBienes'
                  label='¿Dispone de la Relación de Bienes emitida por la Unidad de Bienes?'
                />
                <SiNoQuestion
                  name='disponeEstadosBancariosConciliados'
                  label='¿Dispone de Estados bancarios actualizados y conciliados?'
                />
                <SiNoQuestion
                  name='disponeListaComprobantesGastos'
                  label='¿Dispone de la lista de comprobantes de gastos?'
                />
                <SiNoQuestion
                  name='disponeChequesEmitidosPendientesCobro'
                  label='¿Dispone de Cheques emitidos pendientes de cobro?'
                />
                <SiNoQuestion
                  name='disponeListadoTransferenciaBancaria'
                  label='¿Dispone de listado o reporte de Transferencia Bancaria?'
                />
                <SiNoQuestion
                  name='disponeCaucionFuncionario'
                  label='¿Dispone de la Caución del funcionario encargado?'
                />
                <SiNoQuestion
                  name='disponeCuadroDemostrativoRecaudado'
                  label='¿Dispone de cuadro demostrativo del detalle de lo liquidado y recaudado?'
                />
                <SiNoQuestion
                  name='disponeRelacionExpedientesAbiertos'
                  label='¿Dispone de la relación de expedientes abiertos?'
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeSituacionTesoroNacional'
                  label='¿Dispone de la Situación del Tesoro Nacional?'
                />
                <SiNoQuestion
                  name='disponeInfoEjecucionPresupuestoNacional'
                  label='¿Dispone de información de la ejecución del presupuesto nacional?'
                />
                <SiNoQuestion
                  name='disponeMontoDeudaPublicaNacional'
                  label='¿Dispone del Monto de la deuda pública nacional?'
                />
                <SiNoQuestion
                  name='disponeSituacionCuentasNacion'
                  label='¿Dispone de la Situación de las cuentas de la Nación?'
                />
                <SiNoQuestion
                  name='disponeSituacionTesoroEstadal'
                  label='¿Dispone de la Situación del Tesoro Estadal?'
                />
                <SiNoQuestion
                  name='disponeInfoEjecucionPresupuestoEstadal'
                  label='¿Dispone de información de la ejecución del presupuesto estadal?'
                />
                <SiNoQuestion
                  name='disponeSituacionCuentasEstado'
                  label='¿Dispone de la Situación de las cuentas del respectivo estado?'
                />
                <SiNoQuestion
                  name='disponeSituacionTesoroDistritalMunicipal'
                  label='¿Dispone de la Situación del Tesoro Distrital o Municipal?'
                />
                <SiNoQuestion
                  name='disponeInfoEjecucionPresupuestoDistritalMunicipal'
                  label='¿Dispone de info. de la ejecución del presupuesto distrital o municipal?'
                />
                <SiNoQuestion
                  name='disponeSituacionCuentasDistritalesMunicipales'
                  label='¿Dispone de la Situación de las cuentas distritales o municipales?'
                />
                <SiNoQuestion
                  name='disponeInventarioTerrenosEjidos'
                  label='¿Dispone de Inventario detallado de los terrenos ejidos y propios?'
                />
                <SiNoQuestion
                  name='disponeRelacionIngresosVentaTerrenos'
                  label='¿Dispone de Relación de Ingresos producto de las ventas de terrenos?'
                />
              </div>
            )}

            <div className='flex justify-between pt-8'>
              {currentStep > 0 && (
                <Button type='button' variant='outline' onClick={prevStep}>
                  Anterior
                </Button>
              )}
              <div className='flex-grow' />
              {currentStep < steps.length - 1 && (
                <Button type='button' onClick={nextStep}>
                  Siguiente
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type='submit'
                  className='bg-primary-blue hover:bg-primary-blue-dark'
                >
                  Finalizar y Guardar Acta
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
