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
  CardDescription as ShadcnCardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHeader } from '@/context/HeaderContext';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Asegúrate de tener esta función en tu actasService.ts
import { createActaSalientePaga } from '@/services/actasService';

// --- Esquema de Validación Completo con Zod ---
const formSchema = z.object({
  // --- Datos Generales ---
  email: z
    .string()
    .min(1, 'Campo Requerido')
    .email({ message: 'Debe ser un correo válido.' }),
  rifOrgano: z.string().min(1, 'El RIF es requerido.'),
  denominacionCargoEntrega: z
    .string()
    .min(1, 'La denominación del cargo es requerida.'),
  nombreOrgano: z.string().min(1, 'El nombre del órgano es requerido.'),
  ciudadSuscripcion: z.string().min(1, 'La ciudad es requerida.'),
  estadoSuscripcion: z.string().min(1, 'El estado es requerido.'),
  horaSuscripcion: z.string().min(1, 'La hora es requerida.'),
  fechaSuscripcion: z.string().min(1, 'La fecha es requerida.'),
  direccionOrgano: z.string().min(1, 'La dirección es requerida.'),
  motivoEntrega: z.string().min(1, 'Debe seleccionar un motivo.'),

  // --- Servidores Públicos (Nombres corregidos para Saliente) ---
  nombreServidorSaliente: z.string().min(1, 'Este campo es requerido.'),
  cedulaServidorSaliente: z.string().min(1, 'Este campo es requerido.'),
  designacionServidorSaliente: z.string().min(1, 'Este campo es requerido.'),
  nombreServidorRecibe: z.string().min(1, 'Este campo es requerido.'),
  cedulaServidorRecibe: z.string().min(1, 'Este campo es requerido.'),
  designacionServidorRecibe: z.string().min(1, 'Este campo es requerido.'),

  // --- Anexos (SI/NO) ---
  estadoSituacionPresupuestaria: z.string().optional(),
  relacionGastosComprometidosNoCausados: z.string().optional(),
  relacionGastosCausadosNoPagados: z.string().optional(),
  estadoPresupuestarioPorPartidas: z.string().optional(),
  estadoPresupuestarioDetalleCuentas: z.string().optional(),
  estadosFinancieros: z.string().optional(),
  balanceComprobacion: z.string().optional(),
  estadoSituacionFinanciera: z.string().optional(),
  estadoRendimientoFinanciero: z.string().optional(),
  estadoMovimientosPatrimonio: z.string().optional(),
  relacionCuentasPorCobrar: z.string().optional(),
  relacionCuentasPorPagar: z.string().optional(),
  relacionCuentasFondosTerceros: z.string().optional(),
  situacionFondosAnticipo: z.string().optional(),
  situacionCajaChica: z.string().optional(),
  actaArqueoCajasChicas: z.string().optional(),
  listadoRegistroAuxiliarProveedores: z.string().optional(),
  reportesLibrosContables: z.string().optional(),
  reportesCuentasBancarias: z.string().optional(),
  reportesConciliacionesBancarias: z.string().optional(),
  reportesRetenciones: z.string().optional(),
  reporteProcesosContrataciones: z.string().optional(),
  reporteFideicomisoPrestaciones: z.string().optional(),
  reporteBonosVacacionales: z.string().optional(),
  cuadroResumenCargos: z.string().optional(),
  cuadroResumenValidadoRRHH: z.string().optional(),
  reporteNominas: z.string().optional(),
  inventarioBienes: z.string().optional(),
  ejecucionPlanOperativo: z.string().optional(),
  causasIncumplimientoMetas: z.string().optional(),
  planOperativoAnual: z.string().optional(),
  clasificacionArchivo: z.string().optional(),
  ubicacionFisicaArchivo: z.string().optional(),
  anexo6: z.string().optional(),
  anexos: z.string().optional(),
  relacionMontosFondosAsignados: z.string().optional(),
  saldoEfectivoFondos: z.string().optional(),
  relacionBienesAsignados: z.string().optional(),
  relacionBienesAsignadosUnidadBienes: z.string().optional(),
  estadosBancariosConciliados: z.string().optional(),
  listaComprobantesGastos: z.string().optional(),
  chequesEmitidosPendientesCobro: z.string().optional(),
  listadoTransferenciaBancaria: z.string().optional(),
  caucionFuncionario: z.string().optional(),
  cuadroDemostrativoRecaudado: z.string().optional(),
  relacionExpedientesAbiertos: z.string().optional(),
  situacionTesoroNacional: z.string().optional(),
  infoEjecucionPresupuestoNacional: z.string().optional(),
  montoDeudaPublicaNacional: z.string().optional(),
  situacionCuentasNacion: z.string().optional(),
  situacionTesoroEstadal: z.string().optional(),
  infoEjecucionPresupuestoEstadal: z.string().optional(),
  situacionCuentasEstado: z.string().optional(),
  situacionTesoroDistritalMunicipal: z.string().optional(),
  infoEjecucionPresupuestoDistritalMunicipal: z.string().optional(),
  situacionCuentasDistritalesMunicipales: z.string().optional(),
  inventarioTerrenosEjidos: z.string().optional(),
  relacionIngresosVentaTerrenos: z.string().optional(),
  accionesAuditoria: z.string().optional(),
  deficienciasActa: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: 1,
    title: 'Datos Generales del Acta',
    subtitle: 'Información básica del acta y el órgano.',
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
      'motivoEntrega',
    ],
  },
  {
    id: 2,
    title: 'Participantes en el Acta',
    subtitle: 'Identificación de los servidores públicos involucrados.',
    fields: [
      'nombreServidorSaliente',
      'cedulaServidorSaliente',
      'designacionServidorSaliente',
      'nombreServidorRecibe',
      'cedulaServidorRecibe',
      'designacionServidorRecibe',
    ],
  },
  {
    id: 3,
    title: 'Anexo I: Situación Presupuestaria',
    subtitle: '(Artículo 11.1 Resolución CGR N.º 01-000162)',
    fields: [],
  },
  {
    id: 4,
    title: 'Anexo I: Situación Financiera y Patrimonial',
    subtitle: '(Artículo 11.1 Resolución CGR N.º 01-000162)',
    fields: [],
  },
  {
    id: 5,
    title: 'Anexo II: Cargos y Personal',
    subtitle: '(Artículo 11.2 Resolución CGR N.º 01-000162)',
    fields: [],
  },
  {
    id: 6,
    title: 'Anexo III: Inventario de Bienes',
    subtitle: '(Artículo 11.3 Resolución CGR N.º 01-000162)',
    fields: [],
  },
  {
    id: 7,
    title: 'Anexo IV: Ejecución del Plan Operativo',
    subtitle: '(Artículo 11.4 Resolución CGR N.º 01-000162)',
    fields: [],
  },
  {
    id: 8,
    title: 'Anexo V: Índice General del Archivo',
    subtitle: '(Artículo 11.5 Resolución CGR N.º 01-000162)',
    fields: [],
  },
  {
    id: 9,
    title: 'Anexo VI y Anexos Adicionales',
    subtitle: '(Artículo 11.6 Resolución CGR N.º 01-000162)',
    fields: ['anexo6', 'anexos'],
  },
  {
    id: 10,
    title: 'Detalle de Anexos Específicos',
    subtitle: 'Complete la información para el anexo seleccionado.',
    fields: [],
  },
  {
    id: 11,
    title: 'Finalización y Envío',
    subtitle: 'Último paso antes de generar su acta.',
    fields: [],
  },
];

type QuestionsStep = {
  type: 'questions';
  title: string;
  subtitle: string;
  questions: { name: string; label: string }[];
};
type TextareaStep = {
  type: 'textarea';
  title: string;
  subtitle: string;
  fieldName: keyof FormData;
};
type DynamicStep = QuestionsStep | TextareaStep;
type DynamicContent = { [key: string]: DynamicStep };

const dynamicStepContent: DynamicContent = {
  'UNIDADES ADMINISTRADORAS': {
    type: 'questions',
    title: 'Anexo VII. UNIDADES ADMINISTRADORAS',
    subtitle:
      '(Artículo 53 Reglamento Nº 1 de la Ley Orgánica de la Administración Financiera del Sector Público Sobre el Sistema Presupuestario.)',
    questions: [
      {
        name: 'relacionMontosFondosAsignados',
        label:
          '¿Dispone Usted, del documento Relación de los montos de los fondos asignados?',
      },
      {
        name: 'saldoEfectivoFondos',
        label:
          '¿Dispone Usted, del documento Saldo en efectivo de dichos fondos?',
      },
      {
        name: 'relacionBienesAsignados',
        label:
          '¿Dispone Usted, del documento Relación de los bienes asignados?',
      },
      {
        name: 'relacionBienesAsignadosUnidadBienes',
        label:
          '¿Dispone Usted, del documento Relación de los Bienes asignados emitida por la Unidad de Bienes?',
      },
      {
        name: 'estadosBancariosConciliados',
        label:
          '¿Dispone Usted, del documento Estados bancarios actualizados y conciliados a la fecha de entrega?',
      },
      {
        name: 'listaComprobantesGastos',
        label: '¿Dispone Usted, del documento lista de comprobantes de gastos?',
      },
      {
        name: 'chequesEmitidosPendientesCobro',
        label:
          '¿Dispone Usted, del documento Cheques emitidos pendientes de cobro?',
      },
      {
        name: 'listadoTransferenciaBancaria',
        label:
          '¿Dispone Usted, del documento listado o reporte de Transferencia Bancaria?',
      },
      {
        name: 'caucionFuncionario',
        label:
          '¿Dispone Usted, del documento Caución del funcionario encargado de la Administración de los Recursos Financieros a la fecha del cese de funciones?',
      },
    ],
  },
  'ÓRGANOS O ENTIDADES QUE MANEJAN RAMOS ESPECÍFICOS': {
    type: 'questions',
    title: 'Anexo VIII. ÓRGANOS O ENTIDADES QUE MANEJAN RAMOS ESPECÍFICOS',
    subtitle: '(Artículo 13 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    questions: [
      {
        name: 'cuadroDemostrativoRecaudado',
        label:
          '¿Dispone Usted, del documento cuadro demostrativo del detalle de lo liquidado y recaudado por los rubros respectivos, y de los derechos pendientes de recaudación de años anteriores?',
      },
    ],
  },
  'ÓRGANOS DE CONTROL FISCAL': {
    type: 'questions',
    title: 'Anexo IX. ÓRGANOS DE CONTROL FISCAL',
    subtitle:
      '(Artículo 14 Resolución CGR N.º 01-000162 y Título III Artículos 53 y 54 de la Ley Orgánica de la Contraloría General de la República)',
    questions: [
      {
        name: 'relacionExpedientesAbiertos',
        label:
          '¿Dispone Usted, del documento relación de los expedientes abiertos con ocasión del ejercicio de la potestad de investigación?',
      },
    ],
  },
  'MINISTERIO DE FINANZAS': {
    type: 'questions',
    title: 'Anexo X. MINISTERIO DE FINANZAS',
    subtitle: 'Base: Artículo 14 Resolución CGR N.º 01-000162',
    questions: [
      {
        name: 'situacionTesoroNacional',
        label: '¿Dispone Usted, del documento Situación del Tesoro Nacional?',
      },
      {
        name: 'infoEjecucionPresupuestoNacional',
        label:
          '¿Dispone Usted, del documento información de la ejecución del presupuesto nacional?',
      },
      {
        name: 'montoDeudaPublicaNacional',
        label:
          '¿Dispone Usted, del documento Monto de la deuda pública nacional interna y externa?',
      },
      {
        name: 'situacionCuentasNacion',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas de la Nación?',
      },
    ],
  },
  'GOBERNACIONES, OFICINAS O DEPENDENCIAS DE HACIENDA ESTADAL': {
    type: 'questions',
    title:
      'Anexo XI. GOBERNACIONES, OFICINAS O DEPENDENCIAS DE HACIENDA ESTADAL',
    subtitle: '(Artículo 16 Resolución CGR N.º 01-000162)',
    questions: [
      {
        name: 'situacionTesoroEstadal',
        label: '¿Dispone Usted, del documento Situación del Tesoro Estadal?',
      },
      {
        name: 'infoEjecucionPresupuestoEstadal',
        label:
          '¿Dispone Usted, del documento Información de la ejecución del presupuesto estadal?',
      },
      {
        name: 'situacionCuentasEstado',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas del respectivo estado?',
      },
    ],
  },
  'ALCALDÍAS, DIRECCIÓN DE HACIENDA DISTRITAL O MUNICIPAL': {
    type: 'questions',
    title: 'Anexo XII. ALCALDÍAS, DIRECCIÓN DE HACIENDA DISTRITAL O MUNICIPAL',
    subtitle: '(Artículo 17 Resolución CGR N.º 01-000162)',
    questions: [
      {
        name: 'situacionTesoroDistritalMunicipal',
        label:
          '¿Dispone Usted, del documento Situación del Tesoro Distrital o Municipal?',
      },
      {
        name: 'infoEjecucionPresupuestoDistritalMunicipal',
        label:
          '¿Dispone Usted, del documento Información de la ejecución del presupuesto distrital o municipal?',
      },
      {
        name: 'situacionCuentasDistritalesMunicipales',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas distritales o municipales?',
      },
      {
        name: 'inventarioTerrenosEjidos',
        label:
          '¿Dispone Usted, del documento Inventario detallado de los terrenos ejidos y propios?',
      },
      {
        name: 'relacionIngresosVentaTerrenos',
        label:
          '¿Dispone Usted, del documento Relación de Ingresos producto de las ventas de terrenos?',
      },
    ],
  },
  'RELACIÓN DE INFORMES DE AUDITORÍAS': {
    type: 'textarea',
    title: 'Anexo XIII. RELACIÓN DE INFORMES DE AUDITORÍAS',
    subtitle:
      'Acciones emprendidas por el servidor saliente como consecuencia de las observaciones de la Unidad de Auditoría Interna.',
    fieldName: 'accionesAuditoria',
  },
  'DEFICIENCIAS, ERRORES U OMISIONES DEL ACTA DE ENTREGA': {
    type: 'textarea',
    title: 'Anexo XIV. DEFICIENCIAS, ERRORES U OMISIONES',
    subtitle: '(Artículo 20 Resolución CGR N.º 01-000162)',
    fieldName: 'deficienciasActa',
  },
};

type DynamicStepKey = keyof typeof dynamicStepContent;

export function ActaSalienteForm() {
  const router = useRouter();
  const { setTitle } = useHeader();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setTitle('Acta de Entrega Saliente (PRO)');
  }, [setTitle]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      rifOrgano: '',
      denominacionCargoEntrega: '',
      nombreOrgano: '',
      ciudadSuscripcion: '',
      estadoSuscripcion: '',
      horaSuscripcion: '',
      fechaSuscripcion: '',
      direccionOrgano: '',
      motivoEntrega: '',
      nombreServidorSaliente: '',
      cedulaServidorSaliente: '',
      designacionServidorSaliente: '',
      nombreServidorRecibe: '',
      cedulaServidorRecibe: '',
      designacionServidorRecibe: '',
      estadoSituacionPresupuestaria: 'NO',
      relacionGastosComprometidosNoCausados: 'NO',
      relacionGastosCausadosNoPagados: 'NO',
      estadoPresupuestarioPorPartidas: 'NO',
      estadoPresupuestarioDetalleCuentas: 'NO',
      estadosFinancieros: 'NO',
      balanceComprobacion: 'NO',
      estadoSituacionFinanciera: 'NO',
      estadoRendimientoFinanciero: 'NO',
      estadoMovimientosPatrimonio: 'NO',
      relacionCuentasPorCobrar: 'NO',
      relacionCuentasPorPagar: 'NO',
      relacionCuentasFondosTerceros: 'NO',
      situacionFondosAnticipo: 'NO',
      situacionCajaChica: 'NO',
      actaArqueoCajasChicas: 'NO',
      listadoRegistroAuxiliarProveedores: 'NO',
      reportesLibrosContables: 'NO',
      reportesCuentasBancarias: 'NO',
      reportesConciliacionesBancarias: 'NO',
      reportesRetenciones: 'NO',
      reporteProcesosContrataciones: 'NO',
      reporteFideicomisoPrestaciones: 'NO',
      reporteBonosVacacionales: 'NO',
      cuadroResumenCargos: 'NO',
      cuadroResumenValidadoRRHH: 'NO',
      reporteNominas: 'NO',
      inventarioBienes: 'NO',
      ejecucionPlanOperativo: 'NO',
      causasIncumplimientoMetas: 'NO',
      planOperativoAnual: 'NO',
      clasificacionArchivo: 'NO',
      ubicacionFisicaArchivo: 'NO',
      anexo6: '',
      anexos: '',
    },
  });

  const { watch } = form;
  const selectedAnexo = watch('anexos') as DynamicStepKey;

  // En tu archivo del componente FormSaliente

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setApiError(null);

    // --- ¡AQUÍ ESTÁ LA MAGIA! ---
    // 1. Creamos una copia de los datos del formulario para no modificar el original.
    const dataToSend = { ...data };

    // 2. Renombramos los campos del "servidor que recibe" a lo que el backend espera.
    dataToSend.nombreServidorSaliente = data.nombreServidorRecibe;
    dataToSend.cedulaServidorSaliente = data.cedulaServidorRecibe;
    dataToSend.designacionServidorSaliente = data.designacionServidorRecibe;

    // (Opcional) Eliminamos los campos antiguos si no quieres que se envíen.
    //delete dataToSend.nombreServidorRecibe;
    //delete dataToSend.cedulaServidorRecibe;
    //delete dataToSend.designacionServidorRecibe;
    // ------------------------------------

    try {
      // 3. Enviamos los datos ya ajustados al backend.
      const response = await createActaSalientePaga(dataToSend);

      alert(
        `¡Acta Saliente (PRO) creada con éxito!\nNúmero de Acta: ${response.numeroActa}`
      );
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await form.trigger(fieldsToValidate as (keyof FormData)[]);
    if (isValid) {
      if (currentStep === 8 && form.getValues('anexos') === 'NO APLICA') {
        setCurrentStep(10);
      } else if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep === 10 && form.getValues('anexos') === 'NO APLICA') {
      setCurrentStep(8);
    } else if (currentStep > 0) {
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
              value={field.value || 'NO'}
              className='flex items-center space-x-4'
              disabled={isLoading}
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
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>
          {currentStep === 9 && dynamicStepContent[selectedAnexo]
            ? dynamicStepContent[selectedAnexo].title
            : steps[currentStep].title}
        </CardTitle>
        <ShadcnCardDescription className='whitespace-pre-line'>
          {currentStep === 9 && dynamicStepContent[selectedAnexo]
            ? dynamicStepContent[selectedAnexo].subtitle
            : steps[currentStep].subtitle}
        </ShadcnCardDescription>
        <div className='pt-4'>
          <p className='text-sm font-medium'>
            Paso {currentStep + 1} de {steps.length}:
          </p>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className='mt-2'
          />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {apiError && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error al Crear el Acta</AlertTitle>
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='ejemplo@correo.com'
                          {...field}
                          disabled={isLoading}
                        />
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
                        <Input
                          placeholder='G-00000000-0'
                          {...field}
                          disabled={isLoading}
                        />
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
                      <FormLabel>Denominación del cargo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Presidencia, Dirección...'
                          {...field}
                          disabled={isLoading}
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
                      <FormLabel>Nombre del órgano</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Instituto Nacional de...'
                          {...field}
                          disabled={isLoading}
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
                      <FormLabel>Ciudad donde se suscribe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Barquisimeto'
                          {...field}
                          disabled={isLoading}
                        />
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
                      <FormLabel>Estado donde se suscribe</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Lara'
                          {...field}
                          disabled={isLoading}
                        />
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
                      <FormLabel>Hora de suscripción</FormLabel>
                      <FormControl>
                        <Input type='time' {...field} disabled={isLoading} />
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
                      <FormLabel>Fecha de suscripción</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='md:col-span-2'>
                  <FormField
                    control={form.control}
                    name='direccionOrgano'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dirección exacta y completa</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Avenida 00...'
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='md:col-span-2'>
                  <FormField
                    control={form.control}
                    name='motivoEntrega'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo de la entrega</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Seleccione un motivo' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='Renuncia'>Renuncia</SelectItem>
                            <SelectItem value='Jubilacion'>
                              Jubilación
                            </SelectItem>
                            <SelectItem value='Destitucion'>
                              Destitución
                            </SelectItem>
                            <SelectItem value='Expiracion del periodo'>
                              Expiración del período
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-semibold border-b pb-2'>
                    Servidor Público que Entrega (Saliente)
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
                    <FormField
                      control={form.control}
                      name='nombreServidorSaliente'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
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
                          <FormLabel>Cédula</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
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
                          <FormLabel>Datos de Designación</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold border-b pb-2'>
                    Servidor Público que Recibe
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
                    <FormField
                      control={form.control}
                      name='nombreServidorRecibe'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='cedulaServidorRecibe'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cédula</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='designacionServidorRecibe'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Datos de Designación</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ display: currentStep === 2 ? 'block' : 'none' }}
              className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'
            >
              <SiNoQuestion
                name='estadoSituacionPresupuestaria'
                label='¿Dispone del Estado de Situación Presupuestaria?'
              />
              <SiNoQuestion
                name='relacionGastosComprometidosNoCausados'
                label='¿Dispone de la Relación de Gastos Comprometidos, no causados?'
              />
              <SiNoQuestion
                name='relacionGastosCausadosNoPagados'
                label='¿Dispone de la Relación de Gastos Comprometidos, causados y no pagados?'
              />
              <SiNoQuestion
                name='estadoPresupuestarioPorPartidas'
                label='¿Dispone del Estado Presupuestario del Ejercicio vigente por partidas?'
              />
              <SiNoQuestion
                name='estadoPresupuestarioDetalleCuentas'
                label='¿Dispone del Estado Presupuestario del Ejercicio con detalle de cuentas?'
              />
            </div>

            <div
              style={{ display: currentStep === 3 ? 'block' : 'none' }}
              className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'
            >
              <SiNoQuestion
                name='estadosFinancieros'
                label='¿Dispone de los Estados Financieros a la fecha de entrega?'
              />
              <SiNoQuestion
                name='balanceComprobacion'
                label='¿Dispone del Balance de Comprobación y sus notas explicativas?'
              />
              <SiNoQuestion
                name='estadoSituacionFinanciera'
                label='¿Dispone del Estado de Situación Financiera / Balance General?'
              />
              <SiNoQuestion
                name='estadoRendimientoFinanciero'
                label='¿Dispone del Estado de Rendimiento Financiero / Ganancias y Pérdidas?'
              />
              <SiNoQuestion
                name='estadoMovimientosPatrimonio'
                label='¿Dispone del Estado de Movimientos de las Cuentas de Patrimonio?'
              />
              <SiNoQuestion
                name='relacionCuentasPorCobrar'
                label='¿Dispone de una Relación de Cuentas por Cobrar?'
              />
              <SiNoQuestion
                name='relacionCuentasPorPagar'
                label='¿Dispone de una Relación de Cuentas por Pagar?'
              />
              <SiNoQuestion
                name='relacionCuentasFondosTerceros'
                label='¿Dispone de una Relación de las Cuentas de los Fondos de Terceros?'
              />
              <SiNoQuestion
                name='situacionFondosAnticipo'
                label='¿Dispone de la Situación de los Fondos en Anticipo?'
              />
              <SiNoQuestion
                name='situacionCajaChica'
                label='¿Dispone de la Situación de la Caja Chica?'
              />
              <SiNoQuestion
                name='actaArqueoCajasChicas'
                label='¿Dispone del Acta de arqueo de las Cajas Chicas?'
              />
              <SiNoQuestion
                name='listadoRegistroAuxiliarProveedores'
                label='¿Dispone del Listado del Registro Auxiliar de Proveedores?'
              />
              <SiNoQuestion
                name='reportesLibrosContables'
                label='¿Dispone de Reportes de Libros Contables (Diario y mayores analíticos)?'
              />
              <SiNoQuestion
                name='reportesCuentasBancarias'
                label='¿Dispone de Reportes de las Cuentas Bancarias?'
              />
              <SiNoQuestion
                name='reportesConciliacionesBancarias'
                label='¿Dispone de Reportes de las Conciliaciones Bancarias?'
              />
              <SiNoQuestion
                name='reportesRetenciones'
                label='¿Dispone de Reportes de Retenciones pendientes por enterar?'
              />
              <SiNoQuestion
                name='reporteProcesosContrataciones'
                label='¿Dispone del Reporte de los Procesos de Contrataciones Públicas?'
              />
              <SiNoQuestion
                name='reporteFideicomisoPrestaciones'
                label='¿Dispone del Reporte del Fideicomiso de Prestaciones Sociales?'
              />
              <SiNoQuestion
                name='reporteBonosVacacionales'
                label='¿Dispone del Reporte de Bonos Vacacionales?'
              />
            </div>

            <div
              style={{ display: currentStep === 4 ? 'block' : 'none' }}
              className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'
            >
              <SiNoQuestion
                name='cuadroResumenCargos'
                label='¿Dispone del cuadro resumen indicando el número de cargos existentes (empleados, obreros, etc.)?'
              />
              <SiNoQuestion
                name='cuadroResumenValidadoRRHH'
                label='¿Dispone del cuadro resumen validado por la Oficina de Recursos Humanos?'
              />
              <SiNoQuestion
                name='reporteNominas'
                label='¿Dispone del Reporte de Nóminas a la fecha del cese de funciones?'
              />
            </div>

            <div
              style={{ display: currentStep === 5 ? 'block' : 'none' }}
              className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'
            >
              <SiNoQuestion
                name='inventarioBienes'
                label='¿Dispone del Inventario de Bienes Muebles e Inmuebles elaborado a la fecha de entrega?'
              />
            </div>

            <div
              style={{ display: currentStep === 6 ? 'block' : 'none' }}
              className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'
            >
              <SiNoQuestion
                name='ejecucionPlanOperativo'
                label='¿Dispone del documento de Ejecución del Plan Operativo a la fecha de entrega?'
              />
              <SiNoQuestion
                name='causasIncumplimientoMetas'
                label='¿Incluye las causas que originaron el incumplimiento de metas en el Plan Operativo?'
              />
              <SiNoQuestion
                name='planOperativoAnual'
                label='¿Dispone del Plan Operativo Anual?'
              />
            </div>

            <div
              style={{ display: currentStep === 7 ? 'block' : 'none' }}
              className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'
            >
              <SiNoQuestion
                name='clasificacionArchivo'
                label='¿Incluye la clasificación del archivo?'
              />
              <SiNoQuestion
                name='ubicacionFisicaArchivo'
                label='¿Incluye la ubicación física del archivo?'
              />
            </div>

            <div
              style={{ display: currentStep === 8 ? 'block' : 'none' }}
              className='space-y-6'
            >
              <FormField
                control={form.control}
                name='anexo6'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anexo VI: Información adicional</FormLabel>
                    <ShadcnCardDescription className='text-xs'>
                      Aporte datos adicionales que puedan influir en la
                      evaluación.
                    </ShadcnCardDescription>
                    <FormControl>
                      <Textarea
                        placeholder='Describa aquí...'
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='anexos'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anexos Adicionales</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccione un anexo...' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(dynamicStepContent).map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                        <SelectItem value='NO APLICA'>NO APLICA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div style={{ display: currentStep === 9 ? 'block' : 'none' }}>
              {selectedAnexo && dynamicStepContent[selectedAnexo] ? (
                (() => {
                  const content = dynamicStepContent[selectedAnexo];
                  switch (content.type) {
                    case 'questions':
                      return (
                        <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-4'>
                          {content.questions.map((q) => (
                            <SiNoQuestion
                              key={q.name}
                              name={q.name as keyof FormData}
                              label={q.label}
                            />
                          ))}
                        </div>
                      );
                    case 'textarea':
                      return (
                        <FormField
                          control={form.control}
                          name={content.fieldName}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder={`Describa aquí...`}
                                  {...field}
                                  rows={8}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    default:
                      return null;
                  }
                })()
              ) : (
                <div className='text-center text-gray-500 py-8'>
                  <p>
                    Por favor, seleccione un tipo de anexo en el paso anterior.
                  </p>
                </div>
              )}
            </div>

            <div
              style={{ display: currentStep === 10 ? 'block' : 'none' }}
              className='space-y-8'
            >
              <div className='text-center p-6 mt-8 bg-gray-50 rounded-lg border border-dashed'>
                <CheckCircle2 className='mx-auto h-12 w-12 text-green-500' />
                <h3 className='mt-4 text-xl font-semibold'>
                  ¡Formulario Completo!
                </h3>
                <p className='mt-2 text-sm text-gray-600'>
                  Revise los datos en los pasos anteriores. Una vez seguro,
                  presione Crear Acta para generar el documento final.
                </p>
              </div>
            </div>

            <div className='flex justify-between pt-8'>
              {currentStep > 0 && (
                <Button
                  type='button'
                  variant='outline'
                  onClick={prevStep}
                  disabled={isLoading}
                >
                  Anterior
                </Button>
              )}
              <div className='flex-grow' />
              {currentStep < steps.length - 1 && (
                <Button type='button' onClick={nextStep} disabled={isLoading}>
                  Siguiente
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type='submit'
                  className='bg-[#001A70] hover:bg-[#001A70]/90 text-white'
                  disabled={isLoading}
                >
                  {isLoading ? 'Creando Acta...' : 'Crear Acta (PRO)'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
