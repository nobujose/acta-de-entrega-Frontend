'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHeader } from '@/context/HeaderContext';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// EDITADO: Se cambió el nombre de la función del servicio
import { createActaEntrante } from '@/services/actasService';
// EDITADO: Se cambió el nombre del esquema de validación
import { actaEntranteSchema } from '@/lib/schemas';

// EDITADO: El tipo FormData ahora se infiere del nuevo esquema
type FormData = z.infer<typeof actaEntranteSchema>;

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
      'motivoEntrega',
    ],
  },
  {
    id: 2,
    title: 'Intervinientes en el Acta',
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
      'nombreServidorSaliente',
      'cedulaServidorSaliente',
      'designacionServidorSaliente',
    ],
  },
  {
    id: 3,
    title:
      'Anexo I: Estado de las cuentas que reflejen la SITUACIÓN PRESUPUESTARIA, cuando sea aplicable.',
    subtitle:
      '(Artículo 11.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
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
    id: 4,
    title:
      'Anexo I: Estado de las cuentas que reflejen la SITUACIÓN FINANCIERA Y PATRIMONIAL, cuando sea aplicable.',
    subtitle:
      '(Artículo 11.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'disponeReporteProcesosContrataciones',
      'disponeReporteFideicomisoPrestaciones',
      'disponeReporteBonosVacacionales',
      'disponeCuadroResumenCargos',
      'disponeCuadroResumenValidadoRRHH',
      'disponeReporteNominas',
      'disponeInventarioBienes',
    ],
  },
  {
    id: 5,
    title:
      'Anexo II.  Mención del número de cargos existentes, con señalamiento de si son empleados u obreros, fijos o contratados, así como el número de jubilados y pensionados, de ser el caso.',
    subtitle:
      '(Artículo 11.2 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'disponeEjecucionPlanOperativo',
      'incluyeCausasIncumplimientoMetas',
      'disponePlanOperativoAnual',
      'disponeClasificacionArchivo',
      'incluyeUbicacionFisicaArchivo',
    ],
  },
  {
    id: 6,
    title: 'Anexo III.  Inventario de bienes muebles e inmuebles.',
    subtitle:
      '(Artículo 11.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
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
  {
    id: 7,
    title:
      'Anexo IV. Situación de la ejecución del plan operativo de conformidad con los objetivos propuestos y las metas fijadas en el presupuesto correspondiente.',
    subtitle:
      '(Artículo 11.4 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
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
  {
    id: 8,
    title: 'Anexo V. Índice general del archivo.',
    subtitle:
      '(Artículo 11.5 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
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
  {
    id: 9,
    title: 'Anexo VI.',
    subtitle:
      '(Artículo 11.6 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'anexo6',
      'anexos',
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
  {
    id: 10,
    title: 'Anexos Específicos',
    subtitle: 'Seleccione una opción en el paso anterior',
    fields: [],
  },
  {
    id: 11,
    title: 'Finalización y Envío',
    subtitle: 'Último paso antes de generar su acta.',
    fields: ['autorizaEnvioCorreoAlternativo', 'correoAlternativo'],
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

type DynamicContent = {
  [key: string]: DynamicStep;
};

const dynamicStepContent: DynamicContent = {
  'UNIDADES ADMINISTRADORAS': {
    type: 'questions',
    title: 'Anexo VII. UNIDADES ADMINISTRADORAS',
    subtitle:
      '(Artículo 53 Reglamento Nº 1 de la Ley Orgánica de la Administración Financiera del Sector Público Sobre el Sistema Presupuestario.)',
    questions: [
      {
        name: 'disponeRelacionMontosFondosAsignados',
        label:
          '¿Dispone Usted, del documento Relación de los montos de los fondos asignados?',
      },
      {
        name: 'disponeSaldoEfectivoFondos',
        label:
          '¿Dispone Usted, del documento Saldo en efectivo de dichos fondos?',
      },
      {
        name: 'disponeRelacionBienesAsignados',
        label:
          '¿Dispone Usted, del documento Relación de los bienes asignados?',
      },
      {
        name: 'disponeRelacionBienesAsignadosUnidadBienes',
        label:
          '¿Dispone Usted, del documento Relación de los Bienes asignados emitida por la Unidad de Bienes?',
      },
      {
        name: 'disponeEstadosBancariosConciliados',
        label:
          '¿Dispone Usted, del documento Estados bancarios actualizados y conciliados a la fecha de entrega?',
      },
      {
        name: 'disponeListaComprobantesGastos',
        label: '¿Dispone Usted, del documento lista de comprobantes de gastos?',
      },
      {
        name: 'disponeChequesEmitidosPendientesCobro',
        label:
          '¿Dispone Usted, del documento Cheques emitidos pendientes de cobro?',
      },
      {
        name: 'disponeListadoTransferenciaBancaria',
        label:
          '¿Dispone Usted, del documento listado o reporte de Transferencia Bancaria?',
      },
      {
        name: 'disponeCaucionFuncionario',
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
        name: 'disponeCuadroDemostrativoRecaudado',
        label:
          '¿Dispone Usted, del documento cuadro demostrativo del detalle de lo liquidado y recaudado por los rubros respectivos, y de los derechos pendientes de recaudación de años anteriores?',
      },
    ],
  },
  'ÓRGANOS DE CONTROL FISCAL': {
    type: 'questions',
    title: 'Anexo IX. ÓRGANOS DE CONTROL FISCAL',
    subtitle:
      '(Artículo 14 Resolución CGR N.º 01-000162 de fecha 27-07-2009 y el Título III Artículos 53 y 54 de la Ley Orgánica de la Contraloría General de la República y del Sistema Nacional de Control Fiscal, con indicación del estado en que se encuentran.)',
    questions: [
      {
        name: 'disponeRelacionExpedientesAbiertos',
        label:
          '¿Dispone Usted, del documento relación de los expedientes abiertos con ocasión del ejercicio de la potestad de investigación, así como de los procedimientos administrativos para la determinación de responsabilidades?',
      },
    ],
  },
  'MINISTERIO DE FINANZAS': {
    type: 'questions',
    title: 'Anexo X. MINISTERIO DE FINANZAS',
    subtitle: 'Base: Artículo 14 Resolución CGR N.º 01-000162',
    questions: [
      {
        name: 'disponeSituacionTesoroNacional',
        label: '¿Dispone Usted, del documento Situación del Tesoro Nacional?',
      },
      {
        name: 'disponeInfoEjecucionPresupuestoNacional',
        label:
          '¿Dispone Usted, del documento información de la ejecución del presupuesto nacional de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'disponeMontoDeudaPublicaNacional',
        label:
          '¿Dispone Usted, del documento Monto de la deuda pública nacional interna y externa?',
      },
      {
        name: 'disponeSituacionCuentasNacion',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas de la Nación?',
      },
    ],
  },

  'GOBERNACIONES, OFICinas O DEPENDENCIAS DE HACIENDA ESTADAL': {
    type: 'questions',
    title:
      'Anexo XI. GOBERNACIONES, OFICINAS O DEPENDENCIAS DE HACIENDA ESTADAL',
    subtitle: '(Artículo 16 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    questions: [
      {
        name: 'disponeSituacionTesoroEstadal',
        label: '¿Dispone Usted, del documento Situación del Tesoro Estadal?',
      },
      {
        name: 'disponeInfoEjecucionPresupuestoEstadal',
        label:
          '¿Dispone Usted, del documento Información de la ejecución del presupuesto estadal de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'disponeSituacionCuentasEstado',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas del respectivo estado?',
      },
    ],
  },
  'ALCALDÍAS, DIRECCIÓN DE HACIENDA DISTRITAL O MUNICIPAL': {
    type: 'questions',
    title: 'Anexo XII. ALCALDÍAS, DIRECCIÓN DE HACIENDA DISTRITAL O MUNICIPAL',
    subtitle: '(Artículo 17 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    questions: [
      {
        name: 'disponeSituacionTesoroDistritalMunicipal',
        label:
          '¿Dispone Usted, del documento Situación del Tesoro Distrital o Municipal?',
      },
      {
        name: 'disponeInfoEjecucionPresupuestoDistritalMunicipal',
        label:
          '¿Dispone Usted, del documento Información de la ejecución del presupuesto distrital o municipal de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'disponeSituacionCuentasDistritalesMunicipales',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas distritales o municipales?',
      },
      {
        name: 'disponeInventarioTerrenosEjidos',
        label:
          '¿Dispone Usted, del documento Inventario detallado de los terrenos ejidos y de los terrenos propios distritales o municipales?',
      },
      {
        name: 'disponeRelacionIngresosVentaTerrenos',
        label:
          '¿Dispone Usted, del documento Relación de Ingresos producto de las ventas de terrenos ejidos o terrenos propios distritales o municipales?',
      },
    ],
  },
  'RELACIÓN DE INFORMES DE AUDITORÍAS': {
    type: 'textarea',
    title: 'Anexo XIII. RELACIÓN DE INFORMES DE AUDITORÍAS',
    subtitle:
      'DE LAS ACCIONES EMPRENDIDAS POR EL SERVIDOR SALIENTE COMO CONSECUENCIA DE LAS OBSERVACIONES FORMULADAS POR LA UNIDAD DE AUTIRORÍA INTERNA DE LA UNIDAD ORGANIZATIVA QUE ENTREGA, PRODUCTO DE LAS ÚLTIMAS ACTUACIONES DE ESTAS.',
    fieldName: 'accionesAuditoria',
  },

  'DEFICIENCIAS, ERRORES U OMISIONES DEL ACTA DE ENTREGA QUE SE ADVIRTIERON, ASÍ COMO CUALESQUIERA OTRAS SITUACIONES ESPECIALES QUE CONVENGA SEÑALAR EN EL MOMENTO DEL ACTO DE ENTREGA Y RECEPCIÓN':
    {
      type: 'textarea',
      title:
        'Anexo XIV. INDICAR LAS DEFICIENCIAS, ERRORES U OMISIONES  DEL ACTA DE ENTREGA QUE SE ADVIRTIERON, ASÍ COMO CUALESQUIERA OTRAS SITUACIONES ESPECIALES QUE CONVENGA SEÑALAR EN EL MOMENTO DEL ACTO DE ENTREGA Y RECEPCIÓN DE LA ÓRGANO, ENTIDAD, DIRECCIÓN, COORDINACIÓN EN RESGUARDO DE LA DEBIDA DELIMITACIÓN DE RESPONSABILIDADES.',
      subtitle:
        '(Artículo 20 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
      fieldName: 'deficienciasActa',
    },
};

type DynamicStepKey = keyof typeof dynamicStepContent;

// EDITADO: Se cambió el nombre del componente
export function ActaEntranteForm() {
  const router = useRouter();
  const { setTitle } = useHeader();
  const [currentStep, setCurrentStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    // EDITADO: Se cambió el título de la página
    setTitle('Acta de Entrega de Servidor Público Saliente');
  }, [setTitle]);

  const form = useForm<FormData>({
    mode: 'onChange',
    // EDITADO: Se usa el nuevo esquema de Zod
    resolver: zodResolver(actaEntranteSchema),

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
      nombreServidorEntrante: '',
      cedulaServidorEntrante: '',
      profesionServidorEntrante: '',
      designacionServidorEntrante: '',
      nombreAuditor: '',
      cedulaAuditor: '',
      profesionAuditor: '',
      nombreTestigo1: '',
      cedulaTestigo1: '',
      profesionTestigo1: '',
      nombreTestigo2: '',
      cedulaTestigo2: '',
      profesionTestigo2: '',
      nombreServidorSaliente: '',
      cedulaServidorSaliente: '',
      designacionServidorSaliente: '',
    },
  });

  const { getValues, watch } = form;

  const selectedAnexo = watch('anexos') as DynamicStepKey;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setApiError(null);

    try {
      // EDITADO: Se llama a la nueva función del servicio
      const response = await createActaEntrante(data);

      console.log('Respuesta del servidor:', response);
      alert(`Acta creada con éxito!\nNúmero de Acta: ${response.numeroActa}`);
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
  };

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await form.trigger(fieldsToValidate as (keyof FormData)[]);
    if (isValid) {
      if (currentStep === 8 && getValues('anexos') === 'NO APLICA') {
        setCurrentStep(10);
      } else if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const FormFieldWithExtras = ({
    name,
    label,
    subtitle,
    placeholder,
    type = 'text',
  }: {
    name: keyof FormData;
    label: string;
    subtitle?: string;
    placeholder?: string;
    type?: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {subtitle && (
            <FormDescription className='italic'>{subtitle}</FormDescription>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
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
              <FormItem className='flex items-center space-x-2 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='NO APLICA' />
                </FormControl>
                <FormLabel className='font-normal'>No Aplica</FormLabel>
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
        <CardTitle className='text-[24px]'>
          {currentStep === 9 && dynamicStepContent[selectedAnexo]
            ? dynamicStepContent[selectedAnexo].title
            : steps[currentStep].title}
        </CardTitle>
        <ShadcnCardDescription className='whitespace-pre-line italic'>
          {currentStep === 9 && dynamicStepContent[selectedAnexo]
            ? dynamicStepContent[selectedAnexo].subtitle
            : steps[currentStep].subtitle}
        </ShadcnCardDescription>
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

            {currentStep === 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
                <FormFieldWithExtras
                  name='email'
                  label='Dirección de correo electrónico'
                  placeholder='Ej: ejemplo@correo.com'
                />
                <FormFieldWithExtras
                  name='rifOrgano'
                  label='RIF del órgano, entidad, oficina o dependencia de la Administración Pública.'
                  placeholder='Ej: G-00000000-0'
                />
                <FormFieldWithExtras
                  name='denominacionCargoEntrega'
                  label='Denominación del cargo'
                  subtitle='Artículo 10.2 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                  placeholder='Ej: Presidencia, Dirección, Coordinación'
                />
                <FormFieldWithExtras
                  name='nombreOrgano'
                  label='Nombre del órgano, entidad, oficina o dependencia de la Administración Pública.'
                  subtitle='Artículo 10.2 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                  placeholder='Ej: Instituto Nacional de Transporte Terrestre (INTT)'
                />
                <FormFieldWithExtras
                  name='ciudadSuscripcion'
                  label='Ciudad donde se suscribe el acta.'
                  subtitle='Artículo 10.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                  placeholder='Ej: Barquisimeto'
                />
                <FormFieldWithExtras
                  name='estadoSuscripcion'
                  label='Estado donde se suscribe el acta.'
                  subtitle='Artículo 10.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                  placeholder='Ej: Lara'
                />
                <FormFieldWithExtras
                  name='horaSuscripcion'
                  label='Hora de suscripción del acta.'
                  subtitle='Artículo 10.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                  type='time'
                />
                <FormFieldWithExtras
                  name='fechaSuscripcion'
                  label='Fecha de la suscripción.'
                  subtitle='Artículo 10.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                  type='date'
                />
                <div className='md:col-span-2'>
                  <FormFieldWithExtras
                    name='direccionOrgano'
                    label='Dirección exacta y completa de la ubicación de órgano, entidad, oficina o dependencia que se entrega'
                    subtitle='Artículo 10.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Avenida 00 entre calle 00 y 00, Edf. Central, Piso 2, despacho de la presidencia.'
                  />
                </div>
                <div className='md:col-span-2'>
                  <FormField
                    control={form.control}
                    name='motivoEntrega'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Motivo de la entrega del órgano, entidad, oficina o
                          dependencia de la Administración Pública
                        </FormLabel>
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
                          <SelectContent
                            position='popper'
                            className='bg-white z-50 max-h-60 overflow-y-auto'
                          >
                            <SelectItem value='Renuncia'>Renuncia</SelectItem>
                            <SelectItem value='Jubilacion'>
                              Jubilación
                            </SelectItem>
                            <SelectItem value='Muerte'>Muerte</SelectItem>
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
                            <SelectItem value='Suspension'>
                              Suspensión
                            </SelectItem>
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
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Servidor Público Entrante
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormFieldWithExtras
                    name='nombreServidorEntrante'
                    label='Nombre'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Pedro Jose Rodríguez Hernández'
                  />
                  <FormFieldWithExtras
                    name='cedulaServidorEntrante'
                    label='Cédula'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: V-00.000.000'
                  />
                  <FormFieldWithExtras
                    name='profesionServidorEntrante'
                    label='Profesión'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Contador, Ingeniero, Abogado'
                  />
                  <FormFieldWithExtras
                    name='designacionServidorEntrante'
                    label='Datos de designación'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Resolución N° 000/00 de fecha 00-00-0000 publicado en Gaceta N° 0000 de fecha 00-00-000'
                  />
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Auditor(a)
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormFieldWithExtras
                    name='nombreAuditor'
                    label='Nombre'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Pedro Jose Rodríguez Hernández'
                  />
                  <FormFieldWithExtras
                    name='cedulaAuditor'
                    label='Cédula'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: V-00.000.000'
                  />
                  <FormFieldWithExtras
                    name='profesionAuditor'
                    label='Profesión'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Contador, Ingeniero, Abogado'
                  />
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Testigos
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                  <div className='space-y-4 p-4 border rounded-md'>
                    <p className='font-medium'>Testigo N° 1</p>
                    <FormFieldWithExtras
                      name='nombreTestigo1'
                      label='Nombre'
                      subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                      placeholder='Ej: Pedro Jose Rodríguez Hernández'
                    />
                    <FormFieldWithExtras
                      name='cedulaTestigo1'
                      label='Cédula'
                      subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                      placeholder='Ej: V-00.000.000'
                    />
                    <FormFieldWithExtras
                      name='profesionTestigo1'
                      label='Profesión'
                      subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                      placeholder='Ej: Contador, Ingeniero, Abogado'
                    />
                  </div>
                  <div className='space-y-4 p-4 border rounded-md'>
                    <p className='font-medium'>Testigo N° 2</p>
                    <FormFieldWithExtras
                      name='nombreTestigo2'
                      label='Nombre'
                      subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                      placeholder='Ej: Pedro Jose Rodríguez Hernández'
                    />
                    <FormFieldWithExtras
                      name='cedulaTestigo2'
                      label='Cédula'
                      subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                      placeholder='Ej: V-00.000.000'
                    />
                    <FormFieldWithExtras
                      name='profesionTestigo2'
                      label='Profesión'
                      subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                      placeholder='Ej: Contador, Ingeniero, Abogado'
                    />
                  </div>
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Servidor Público Saliente
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormFieldWithExtras
                    name='nombreServidorSaliente'
                    label='Nombre'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Pedro Jose Rodríguez Hernández'
                  />
                  <FormFieldWithExtras
                    name='cedulaServidorSaliente'
                    label='Cédula'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: V-00.000.000'
                  />
                  <FormFieldWithExtras
                    name='designacionServidorSaliente'
                    label='Datos de designación'
                    subtitle='Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009'
                    placeholder='Ej: Resolución N° 000/00 de fecha 00-00-0000 publicado en Gaceta N° 0000 de fecha 00-00-000'
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEstadoSituacionPresupuestaria'
                  label='¿Dispone Usted, del documento Estado de Situación Presupuestaria muestra todos los momentos presupuestarios y sus detalles. Incluye: Presupuesto Original, Modificaciones, Presupuesto Modificado, Compromisos, Causado, Pagado, Por Pagar y Presupuesto Disponible a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionGastosComprometidosNoCausados'
                  label='¿Dispone Usted, del documento Relación de Gastos Comprometidos, no causados a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionGastosComprometidosCausadosNoPagados'
                  label='¿Dispone Usted, del documento Relación de Gastos Comprometidos, causados y no pagados a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoPresupuestarioPorPartidas'
                  label='¿Dispone Usted, del documento Estado Presupuestario del Ejercicio vigente por partidas?'
                />
                <SiNoQuestion
                  name='disponeEstadoPresupuestarioDetalleCuentas'
                  label='¿Dispone Usted, del documento Estado Presupuestario del Ejercicio con los detalles de sus cuentas?'
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEstadosFinancieros'
                  label='¿Dispone Usted, del documento Estados Financieros a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeBalanceComprobacion'
                  label='¿Dispone Usted, del documento Balance de Comprobación a la fecha de elaboración de los Estados Financieros y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoSituacionFinanciera'
                  label='¿Dispone Usted, del documento Estado de Situación Financiera / Balance General y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoRendimientoFinanciero'
                  label='¿Dispone Usted, del documento Estado de Rendimiento Financiero / Estado de Ganancia y Pérdidas y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoMovimientosPatrimonio'
                  label='¿Dispone Usted, del documento Estado de Movimientos de las Cuentas de Patrimonio y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasPorCobrar'
                  label='¿Dispone Usted, del documento Una Relación de Cuentas por Cobrar a la fecha del Acta de Entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasPorPagar'
                  label='¿Dispone Usted, del documento Relación de Cuentas por Pagar a la fecha del Acta de Entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasFondosTerceros'
                  label='¿Dispone Usted, del documento Relación de las Cuentas de los Fondos de Terceros?'
                />
                <SiNoQuestion
                  name='disponeSituacionFondosAnticipo'
                  label='¿Dispone Usted, del documento Situación de los Fondos en Anticipo?'
                />
                <SiNoQuestion
                  name='disponeSituacionCajaChica'
                  label='¿Dispone Usted, del documento Situación de la Caja Chica?'
                />
                <SiNoQuestion
                  name='disponeActaArqueoCajasChicas'
                  label='¿Dispone Usted, del documento Acta de arqueo de las Cajas Chicas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeListadoRegistroAuxiliarProveedores'
                  label='¿Dispone Usted, del documento Listado del Registro Auxiliar de Proveedores?'
                />
                <SiNoQuestion
                  name='disponeReportesLibrosContables'
                  label='¿Dispone Usted, del documento Reportes de Libros Contables (Diario y mayores analíticos) a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReportesCuentasBancarias'
                  label='¿Dispone Usted, del documento Reportes de las Cuentas Bancarias (Movimientos a la fecha del cese de funciones)?'
                />
                <SiNoQuestion
                  name='disponeReportesConciliacionesBancarias'
                  label='¿Dispone Usted, del documento Reportes de las Conciliaciones Bancarias a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReportesRetenciones'
                  label='¿Dispone Usted, del documento Reportes de Retenciones de pagos pendientes por enterar correspondientes a ISLR, IVA y Retenciones por Contratos (obras, bienes y servicios) a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReporteProcesosContrataciones'
                  label='¿Dispone Usted, del documento Reporte de los Procesos de Contrataciones Públicas a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReporteFideicomisoPrestaciones'
                  label='¿Dispone Usted, del documento Reporte del Fideicomiso de Prestaciones Sociales a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReporteBonosVacacionales'
                  label='¿Dispone Usted, del documento Reporte de Bonos Vacacionales a la fecha del cese de funciones?'
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeCuadroResumenCargos'
                  label='¿Dispone Usted, del documento cuadro resumen indicando el número de cargos existentes, clasificados en empleados, obreros, fijos o contratados?'
                />
                <SiNoQuestion
                  name='disponeCuadroResumenValidadoRRHH'
                  label='¿Dispone Usted, del documento cuadro resumen validado por la Oficina de Recursos Humanos?'
                />
                <SiNoQuestion
                  name='disponeReporteNominas'
                  label='¿Dispone Usted, del documento Reporte de Nóminas a la fecha del cese de funciones?'
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeInventarioBienes'
                  label='¿Dispone Usted, del documento Inventario de Bienes e Inmuebles esta elaborado a la fecha de entrega. Debe contener: comprobación física, condición de los bienes, responsable patrimonial, responsable por uso, fecha de verificación, número del acta de verificación, código, descripción, marca, modelo, número del serial, estado de conservación, ubicación y valor de mercado de los bienes?'
                />
              </div>
            )}

            {currentStep === 6 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEjecucionPlanOperativo'
                  label='¿Dispone Usted, del documento Ejecución del Plan Operativo a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='incluyeCausasIncumplimientoMetas'
                  label='¿Usted incluye las causas que originaron el incumplimiento de algunas metas en la ejecución del Plan Operativo?'
                />
                <SiNoQuestion
                  name='disponePlanOperativoAnual'
                  label='¿Dispone Usted, del documento Plan Operativo Anual?'
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeClasificacionArchivo'
                  label='¿Dispone Usted, del documento clasificación del archivo?'
                />
                <SiNoQuestion
                  name='incluyeUbicacionFisicaArchivo'
                  label='¿Usted incluye la ubicación física del archivo?'
                />
              </div>
            )}

            {currentStep === 8 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='anexo6'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Cualquier otra información o documentación que se
                        considere necesaria
                      </FormLabel>
                      <ShadcnCardDescription className='text-xs'>
                        Puede aportar datos adicionales que puedan influir en la
                        evaluación. La fecha de corte es crucial para establecer
                        un límite temporal para la información.
                      </ShadcnCardDescription>
                      <FormControl>
                        <Textarea
                          placeholder='Describa aquí la información adicional...'
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
                    <FormItem className='pt-2'>
                      <FormLabel>ANEXOS ADICIONALES</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione un anexo para detallar o indique si no aplica...' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='bg-white z-50 max-h-60 overflow-y-auto'>
                          {Object.keys(dynamicStepContent).map((key) => (
                            <SelectItem
                              key={key}
                              value={key}
                              className='whitespace-normal h-auto'
                            >
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
            )}

            {currentStep === 9 && (
              <div>
                {selectedAnexo && dynamicStepContent[selectedAnexo] ? (
                  (() => {
                    const content = dynamicStepContent[selectedAnexo];
                    switch (content.type) {
                      case 'questions':
                        return (
                          <div className='space-y-4'>
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
                                    placeholder={`Describa aquí la información sobre "${content.title}"...`}
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
                      Por favor, seleccione un tipo de anexo en el paso anterior
                      para continuar.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 10 && (
              <div className='space-y-8'>
                <div className='text-center p-6 mt-8 bg-gray-50 rounded-lg border border-dashed'>
                  <CheckCircle2 className='mx-auto h-12 w-12 text-green-500' />
                  <h3 className='mt-4 text-xl font-semibold text-gray-800'>
                    ¡Ha completado el formulario!
                  </h3>
                  <p className='mt-2 text-sm text-gray-600'>
                    Ha llenado exitosamente el acta de entrega. Por favor,
                    revise los datos en los pasos anteriores usando el botón
                    Anterior.
                    <br />
                    Una vez que esté seguro, presione Crear Acta para generar el
                    documento final.
                  </p>
                </div>
              </div>
            )}

            <div className='flex items-center justify-between pt-8'>
              <div className='w-1/3'>
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
              </div>

              <div className='flex w-1/3 justify-center'>
                <div className='bg-icon-gray-bg px-4 py-2 rounded-lg shadow-sm'>
                  <p className='text-sm font-bold text-gray-700'>
                    Paso {currentStep + 1} de {steps.length}
                  </p>
                </div>
              </div>

              <div className='flex w-1/3 justify-end'>
                {currentStep < steps.length - 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={nextStep}
                    disabled={isLoading}
                  >
                    Siguiente
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    type='submit'
                    className='bg-primary-blue hover:bg-primary-blue-dark text-white'
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creando Acta...' : 'Crear Acta'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
