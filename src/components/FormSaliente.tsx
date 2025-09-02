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
import { CheckCircle2 } from 'lucide-react';

// --- Esquema de Validación Completo con Zod ---
const formSchema = z
  .object({
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

    // --- Servidores Públicos y Testigos ---
    nombreServidorEntrante: z.string().min(1, 'Este campo es requerido.'),
    cedulaServidorEntrante: z.string().min(1, 'Este campo es requerido.'),
    designacionServidorEntrante: z.string().min(1, 'Este campo es requerido.'),
    nombreServidorRecibe: z.string().min(1, 'Este campo es requerido.'),
    cedulaServidorRecibe: z.string().min(1, 'Este campo es requerido.'),
    designacionServidorRecibe: z.string().min(1, 'Este campo es requerido.'),

    // --- Anexos (SI/NO) ---
    // Paso 3
    estadoSituacionPresupuestaria: z.string().optional(),
    relacionGastosComprometidosNoCausados: z.string().optional(),
    relacionGastosCausadosNoPagados: z.string().optional(),
    estadoPresupuestarioPorPartidas: z.string().optional(),
    estadoPresupuestarioDetalleCuentas: z.string().optional(),
    //Paso 4
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
    // Paso 5
    cuadroResumenCargos: z.string().optional(),
    cuadroResumenValidadoRRHH: z.string().optional(),
    reporteNominas: z.string().optional(),
    // Paso 6
    inventarioBienes: z.string().optional(),
    // Paso 7
    ejecucionPlanOperativo: z.string().optional(),
    causasIncumplimientoMetas: z.string().optional(),
    planOperativoAnual: z.string().optional(),
    // Paso 8
    clasificacionArchivo: z.string().optional(),
    ubicacionFisicaArchivo: z.string().optional(),
    // Paso 9
    anexo6: z.string().min(1, 'Este campo es requerido.'),
    anexos: z.string().min(1, 'Este campo es requerido.'),
    // Paso 10
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
    // Paso 11
    autorizaEnvioCorreoAlternativo: z.string().optional(),
    correoAlternativo: z.string().optional(),
  })
  .refine(
    (data) => {
      // Si el usuario autoriza el envío, el correo alternativo es obligatorio
      if (data.autorizaEnvioCorreoAlternativo === 'SI') {
        return (
          !!data.correoAlternativo &&
          z.string().email().safeParse(data.correoAlternativo).success
        );
      }
      return true;
    },
    {
      message: 'El correo alternativo es requerido y debe ser válido.',
      path: ['correoAlternativo'], // Ruta del campo al que se aplica el error
    }
  );

type FormData = z.infer<typeof formSchema>;

const steps = [
  {
    id: 1,
    title: 'Datos Generales del Acta',
    subtitle:
      '(Artículo 10.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009, Artículo 10.2 Resolución CGR N.º 01-000162 de fecha 27-07-2009, \n Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009, Artículo 10.4 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
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
    subtitle:
      '(Artículo 10 .3 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'nombreServidorEntrante',
      'cedulaServidorEntrante',
      'designacionServidorEntrante',
      'nombreServidorRecibe',
      'cedulaServidorRecibe',
      'designacionServidorRecibe',
    ],
  },
  {
    id: 3,
    title:
      'Anexo I: Estado de las cuentas que reflejen la SITUACIÓN PRESUPUESTARIA, cuando sea aplicable.',
    subtitle:
      '(Artículo 11.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'estadoSituacionPresupuestaria',
      'relacionGastosComprometidosNoCausados',
      'relacionGastosCausadosNoPagados',
      'estadoPresupuestarioPorPartidas',
      'estadoPresupuestarioDetalleCuentas',
    ],
  },
  {
    id: 4,
    title:
      'Anexo I: Estado de las cuentas que reflejen la SITUACIÓN FINANCIERA Y PATRIMONIAL, cuando sea aplicable.',
    subtitle:
      '(Artículo 11.1 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'estadosFinancieros',
      'balanceComprobacion',
      'estadoSituacionFinanciera',
      'estadoRendimientoFinanciero',
      'estadoMovimientosPatrimonio',
      'relacionCuentasPorCobrar',
      'relacionCuentasPorPagar',
      'relacionCuentasFondosTerceros',
      'situacionFondosAnticipo',
      'situacionCajaChica',
      'actaArqueoCajasChicas',
      'listadoRegistroAuxiliarProveedores',
      'reportesLibrosContables',
      'reportesCuentasBancarias',
      'reportesConciliacionesBancarias',
      'reportesRetenciones',
      'reporteProcesosContrataciones',
      'reporteFideicomisoPrestaciones',
      'reporteBonosVacacionales',
    ],
  },
  {
    id: 5,
    title:
      'Anexo II.  Mención del número de cargos existentes, con señalamiento de si son empleados u obreros, fijos o contratados, así como el número de jubilados y pensionados, de ser el caso.',
    subtitle:
      '(Artículo 11.2 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'cuadroResumenCargos',
      'cuadroResumenValidadoRRHH',
      'reporteNominas',
    ],
  },
  {
    id: 6,
    title: 'Anexo III.  Inventario de bienes muebles e inmuebles.',
    subtitle:
      '(Artículo 11.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: ['inventarioBienes'],
  },
  {
    id: 7,
    title:
      'Anexo IV. Situación de la ejecución del plan operativo de conformidad con los objetivos propuestos y las metas fijadas en el presupuesto correspondiente.',
    subtitle:
      '(Artículo 11.4 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: [
      'ejecucionPlanOperativo',
      'causasIncumplimientoMetas',
      'planOperativoAnual',
    ],
  },
  {
    id: 8,
    title: 'Anexo V. Índice general del archivo.',
    subtitle:
      '(Artículo 11.5 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: ['clasificacionArchivo', 'incluyeUbicacionFisicaArchivo'],
  },
  {
    id: 9,
    title: 'Anexo VI.',
    subtitle:
      '(Artículo 11.6 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    fields: ['anexo6', 'anexos'],
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

// Definir los tipos para la Unión Discriminada
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
  fieldName: keyof FormData; // Usamos keyof FormData para asegurar que el nombre sea válido
};

type DynamicStep = QuestionsStep | TextareaStep;

// Definimos el tipo para el objeto principal
type DynamicContent = {
  [key: string]: DynamicStep;
};

// Aquí mapeamos cada opción del Select a su contenido correspondiente.
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
      '(Artículo 14 Resolución CGR N.º 01-000162 de fecha 27-07-2009 y el Título III Artículos 53 y 54 de la Ley Orgánica de la Contraloría General de la República y del Sistema Nacional de Control Fiscal, con indicación del estado en que se encuentran.)',
    questions: [
      {
        name: 'relacionExpedientesAbiertos',
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
        name: 'situacionTesoroNacional',
        label: '¿Dispone Usted, del documento Situación del Tesoro Nacional?',
      },
      {
        name: 'infoEjecucionPresupuestoNacional',
        label:
          '¿Dispone Usted, del documento información de la ejecución del presupuesto nacional de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
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
    subtitle: '(Artículo 16 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    questions: [
      {
        name: 'situacionTesoroEstadal',
        label: '¿Dispone Usted, del documento Situación del Tesoro Estadal?',
      },
      {
        name: 'infoEjecucionPresupuestoEstadal',
        label:
          '¿Dispone Usted, del documento Información de la ejecución del presupuesto estadal de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
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
    subtitle: '(Artículo 17 Resolución CGR N.º 01-000162 de fecha 27-07-2009)',
    questions: [
      {
        name: 'situacionTesoroDistritalMunicipal',
        label:
          '¿Dispone Usted, del documento Situación del Tesoro Distrital o Municipal?',
      },
      {
        name: 'infoEjecucionPresupuestoDistritalMunicipal',
        label:
          '¿Dispone Usted, del documento Información de la ejecución del presupuesto distrital o municipal de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'situacionCuentasDistritalesMunicipales',
        label:
          '¿Dispone Usted, del documento Situación de las cuentas distritales o municipales?',
      },
      {
        name: 'inventarioTerrenosEjidos',
        label:
          '¿Dispone Usted, del documento Inventario detallado de los terrenos ejidos y de los terrenos propios distritales o municipales?',
      },
      {
        name: 'relacionIngresosVentaTerrenos',
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

export function ActaSalienteForm() {
  const router = useRouter();
  const { setTitle } = useHeader();
  const [currentStep, setCurrentStep] = useState(0);

  // Actualiza el título del header al montar el componente
  useEffect(() => {
    setTitle('Acta Saliente');
  }, [setTitle]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Inicializa todos los campos para evitar errores de "uncontrolled component"
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
      designacionServidorEntrante: '',
      nombreServidorRecibe: '',
      cedulaServidorRecibe: '',
      designacionServidorRecibe: '',
    },
  });

  // Obtenemos funciones de react-hook-form para manipular errores
  const { setError, clearErrors, getFieldState, getValues, watch } = form;

  const selectedAnexo = watch('anexos') as DynamicStepKey;

  const autorizaEnvio = watch('autorizaEnvioCorreoAlternativo');

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Datos del formulario a enviar:', data);
      // DESCOMENTA LA SIGUIENTE LÍNEA PARA ENVIAR A TU BACKEND
      // const response = await apiClient.post('/actas/maxima-autoridad-paga', data);
      alert('Acta creada exitosamente!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al crear el acta:', error);
      alert('Hubo un error al crear el acta. Por favor, inténtalo de nuevo.');
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isValid = await form.trigger(fieldsToValidate as (keyof FormData)[]);
    if (isValid) {
      // Si estamos en el paso 9 y se seleccionó "NO APLICA", saltamos al paso 11
      if (currentStep === 8 && getValues('anexos') === 'NO APLICA') {
        setCurrentStep(10); // El índice 10 corresponde al Paso 11
      } else if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Componente reutilizable para campos de texto con ayuda contextual
  const FormFieldWithExtras = ({
    name,
    label,
    placeholder,
    helpText,
    type = 'text',
  }: {
    name: keyof FormData;
    label: string;
    placeholder?: string;
    helpText?: string;
    type?: string;
  }) => {
    // Función que se activa cuando el usuario entra al input
    const handleFocus = () => {
      // Solo mostramos la ayuda si NO hay un error de validación real y el campo está vacío
      if (!getFieldState(name).error && !getValues(name)) {
        // Usamos setError para mostrar nuestro texto de ayuda en el componente FormMessage
        setError(name, { type: 'custom', message: helpText });
      }
    };

    // Función que se activa cuando el usuario sale del input
    const handleBlur = () => {
      // Si el mensaje que se muestra es nuestro texto de ayuda, lo limpiamos
      if (getFieldState(name).error?.message === helpText) {
        clearErrors(name);
      }
    };

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </FormControl>
            {/* FormMessage siempre está renderizado, por lo que no hay "salto" de layout.
                Su contenido es controlado por la lógica de handleFocus y handleBlur. */}
            <FormMessage
              className={
                getFieldState(name).error?.message === helpText
                  ? 'text-red-500'
                  : ''
              }
            />
          </FormItem>
        )}
      />
    );
  };

  // Componente reutilizable para las preguntas SI/NO
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
            {currentStep === 0 && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
                <FormFieldWithExtras
                  name='email'
                  label='Dirección de correo electrónico'
                  placeholder='ejemplo@correo.com'
                  helpText='Ej: ejemplo@correo.com'
                />
                <FormFieldWithExtras
                  name='rifOrgano'
                  label='RIF del órgano'
                  placeholder='G-00000000-0'
                  helpText='Ej: G-00000000-0'
                />
                <FormFieldWithExtras
                  name='denominacionCargoEntrega'
                  label='Denominación del cargo que se entrega.'
                  placeholder='Presidencia, Dirección...'
                  helpText='Ej: Presidencia, Dirección, Coordinación'
                />
                <FormFieldWithExtras
                  name='nombreOrgano'
                  label='Nombre del órgano, entidad, oficina o dependencia de la Administración Pública.'
                  placeholder='Instituto Nacional de...'
                  helpText='Ej: Instituto Nacional de Transporte Terrestre (INTT)'
                />
                <FormFieldWithExtras
                  name='ciudadSuscripcion'
                  label='Ciudad donde se suscribe'
                  placeholder='Barquisimeto'
                  helpText='Ej: Barquisimeto'
                />
                <FormFieldWithExtras
                  name='estadoSuscripcion'
                  label='Estado donde se suscribe'
                  placeholder='Lara'
                  helpText='Ej: Lara'
                />
                <FormFieldWithExtras
                  name='horaSuscripcion'
                  label='Hora de suscripción'
                  type='time'
                  helpText='Ej: 10:00 AM'
                />
                <FormFieldWithExtras
                  name='fechaSuscripcion'
                  label='Fecha de suscripción'
                  type='date'
                  helpText='Ej: tres (03) de enero del 2025'
                />
                <div className='md:col-span-2'>
                  <FormFieldWithExtras
                    name='direccionOrgano'
                    label='Dirección exacta y completa'
                    placeholder='Avenida 00 entre calle 00 y 00...'
                    helpText='Ej: Avenida 00 entre calle 00 y 00, Edf. Central, Piso 2, despacho de la presidencia.'
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
                  Servidor Público Saliente
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormFieldWithExtras
                    name='nombreServidorEntrante'
                    label='Nombre'
                    helpText='Ej: Pedro Jose Rodríguez Hernández'
                  />
                  <FormFieldWithExtras
                    name='cedulaServidorEntrante'
                    label='Cédula'
                    helpText='Ej: V-00.000.000'
                  />
                  <FormFieldWithExtras
                    name='designacionServidorEntrante'
                    label='Datos de designación'
                    helpText='Ej: Resolución N° 000/00 de fecha 00-00-0000 publicado en Gaceta N° 0000 de fecha 00-00-000'
                  />
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>
                  Servidor Público Entrante
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormFieldWithExtras
                    name='nombreServidorRecibe'
                    label='Nombre'
                    helpText='Ej: Pedro Jose Rodríguez Hernández'
                  />
                  <FormFieldWithExtras
                    name='cedulaServidorRecibe'
                    label='Cédula'
                    helpText='Ej: V-00.000.000'
                  />
                  <FormFieldWithExtras
                    name='designacionServidorRecibe'
                    label='Datos de designación del Servidor público que Recibe.'
                    helpText='Ej:  Resolución N° 000/00 de fecha 00-00-0000 publicado en Gaceta N° 0000 de fecha 00-00-000'
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='estadoSituacionPresupuestaria'
                  label='¿Dispone Usted, del documento Estado de Situación Presupuestaria muestra todos los momentos presupuestarios y sus detalles. Incluye: Presupuesto Original, Modificaciones, Presupuesto Modificado, Compromisos, Causado, Pagado, Por Pagar y Presupuesto Disponible a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='relacionGastosComprometidosNoCausados'
                  label='¿Dispone Usted, del documento Relación de Gastos Comprometidos, no causados a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='relacionGastosCausadosNoPagados'
                  label='¿Dispone Usted, del documento Relación de Gastos Comprometidos, causados y no pagados a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='estadoPresupuestarioPorPartidas'
                  label='¿Dispone Usted, del documento Estado Presupuestario del Ejercicio vigente por partidas?'
                />
                <SiNoQuestion
                  name='estadoPresupuestarioDetalleCuentas'
                  label='¿Dispone Usted, del documento Estado Presupuestario del Ejercicio con los detalles de sus cuentas?'
                />
              </div>
            )}

            {/* --- PASO 4: ANEXOS CONTRATACIONES, RRHH Y BIENES --- */}
            {currentStep === 3 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='estadosFinancieros'
                  label='¿Dispone Usted, del documento Estados Financieros a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='balanceComprobacion'
                  label='¿Dispone Usted, del documento Balance de Comprobación a la fecha de elaboración de los Estados Financieros y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='estadoSituacionFinanciera'
                  label='¿Dispone Usted, del documento Estado de Situación Financiera / Balance General y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='estadoRendimientoFinanciero'
                  label='¿Dispone Usted, del documento Estado de Rendimiento Financiero / Estado de Ganancia y Pérdidas y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='estadoMovimientosPatrimonio'
                  label='¿Dispone Usted, del documento Estado de Movimientos de las Cuentas de Patrimonio y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='relacionCuentasPorCobrar'
                  label='¿Dispone Usted, del documento Una Relación de Cuentas por Cobrar a la fecha del Acta de Entrega?'
                />
                <SiNoQuestion
                  name='relacionCuentasPorPagar'
                  label='¿Dispone Usted, del documento Relación de Cuentas por Pagar a la fecha del Acta de Entrega?'
                />
                <SiNoQuestion
                  name='relacionCuentasFondosTerceros'
                  label='¿Dispone Usted, del documento Relación de las Cuentas de los Fondos de Terceros?'
                />
                <SiNoQuestion
                  name='situacionFondosAnticipo'
                  label='¿Dispone Usted, del documento Situación de los Fondos en Anticipo?'
                />
                <SiNoQuestion
                  name='situacionCajaChica'
                  label='¿Dispone Usted, del documento Situación de la Caja Chica?'
                />
                <SiNoQuestion
                  name='actaArqueoCajasChicas'
                  label='¿Dispone Usted, del documento Acta de arqueo de las Cajas Chicas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='listadoRegistroAuxiliarProveedores'
                  label='¿Dispone Usted, del documento Listado del Registro Auxiliar de Proveedores?'
                />
                <SiNoQuestion
                  name='reportesLibrosContables'
                  label='¿Dispone Usted, del documento Reportes de Libros Contables (Diario y mayores analíticos) a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='reportesCuentasBancarias'
                  label='¿Dispone Usted, del documento Reportes de las Cuentas Bancarias (Movimientos a la fecha del cese de funciones)?'
                />
                <SiNoQuestion
                  name='reportesConciliacionesBancarias'
                  label='¿Dispone Usted, del documento Reportes de las Conciliaciones Bancarias a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='reportesRetenciones'
                  label='¿Dispone Usted, del documento Reportes de Retenciones de pagos pendientes por enterar correspondientes a ISLR, IVA y Retenciones por Contratos (obras, bienes y servicios) a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='reporteProcesosContrataciones'
                  label='¿Dispone Usted, del documento Reporte de los Procesos de Contrataciones Públicas a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='reporteFideicomisoPrestaciones'
                  label='¿Dispone Usted, del documento Reporte del Fideicomiso de Prestaciones Sociales a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='reporteBonosVacacionales'
                  label='¿Dispone Usted, del documento Reporte de Bonos Vacacionales a la fecha del cese de funciones?'
                />
              </div>
            )}

            {/* --- PASO 5: --- */}
            {currentStep === 4 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='cuadroResumenCargos'
                  label='¿Dispone Usted, del documento cuadro resumen indicando el número de cargos existentes, clasificados en empleados, obreros, fijos o contratados?'
                />
                <SiNoQuestion
                  name='cuadroResumenValidadoRRHH'
                  label='¿Dispone Usted, del documento cuadro resumen validado por la Oficina de Recursos Humanos?'
                />
                <SiNoQuestion
                  name='reporteNominas'
                  label='¿Dispone Usted, del documento Reporte de Nóminas a la fecha del cese de funciones?'
                />
              </div>
            )}

            {/* --- PASO 6: --- */}
            {currentStep === 5 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='inventarioBienes'
                  label='¿Dispone Usted, del documento Inventario de Bienes Muebles e Inmuebles elaborado a la fecha de entrega. El cual debe contener: comprobación física, condición de los bienes, responsable patrimonial, responsable por uso, fecha de verificación, número del acta de verificación, código, descripción, marca, modelo, número del serial, estado de conservación, ubicación y valor de mercado de los bienes?'
                />
              </div>
            )}

            {/* --- PASO 7: --- */}
            {currentStep === 6 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='ejecucionPlanOperativo'
                  label='¿Dispone Usted, del documento Ejecución del Plan Operativo a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='causasIncumplimientoMetas'
                  label='¿Usted incluye las causas que originaron el incumplimiento de algunas metas en la ejecución del Plan Operativo?'
                />
                <SiNoQuestion
                  name='planOperativoAnual'
                  label='¿Dispone Usted, del documento Plan Operativo Anual?'
                />
              </div>
            )}

            {/* --- PASO 8: --- */}
            {currentStep === 7 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='clasificacionArchivo'
                  label='¿Usted incluye la clasificación del archivo?'
                />
                <SiNoQuestion
                  name='ubicacionFisicaArchivo'
                  label='¿Usted incluye la ubicación física del archivo?'
                />
              </div>
            )}

            {/* --- PASO 9: --- */}
            {currentStep === 8 && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name='anexo6'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Anexo VI: Cualquier otra información o documentación que
                        se considere necesaria
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
                    <FormItem className='pt-4'>
                      <FormLabel>ANEXOS ADICIONALES</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione un anexo para detallar o indique si no aplica...' />
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
            )}

            {/* --- PASO 10: --- */}
            {currentStep === 9 && (
              <div>
                {selectedAnexo && dynamicStepContent[selectedAnexo] ? (
                  (() => {
                    const content = dynamicStepContent[selectedAnexo];
                    // Gracias a los tipos definidos, TypeScript ahora entiende la lógica
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
                    <p className='text-xs mt-2'>
                      (Si no aplica, puede finalizar el formulario).
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 10 && (
              <div className='space-y-8'>
                {/* Pregunta condicional */}
                <SiNoQuestion
                  name='autorizaEnvioCorreoAlternativo'
                  label='¿Autoriza usted el envío de su acta de entrega a la dirección de correo electrónico alternativa proporcionada?'
                />

                {/* Input que aparece condicionalmente */}
                {autorizaEnvio === 'SI' && (
                  <div className='pl-4 border-l-2 border-primary-blue animate-in fade-in duration-500'>
                    <FormFieldWithExtras
                      name='correoAlternativo'
                      label='Correo electrónico alternativo'
                      placeholder='ejemplo.alternativo@correo.com'
                      helpText='Ingrese una dirección de correo válida'
                    />
                  </div>
                )}

                {/* Mensaje de finalización estilizado */}
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
                    Una vez que esté seguro de que toda la información es
                    correcta, presione Crear Acta para generar el documento
                    final.
                  </p>
                </div>
              </div>
            )}

            <div className='flex justify-between pt-8'>
              {currentStep > 0 && (
                <Button type='button' variant='outline' onClick={prevStep}>
                  Anterior
                </Button>
              )}

              {/* ▼▼▼ CAMBIO: Lógica de botones mejorada ▼▼▼ */}
              {currentStep < steps.length - 1 && (
                <Button type='button' onClick={nextStep} className='ml-auto'>
                  Siguiente
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type='submit'
                  className='ml-auto bg-primary-blue hover:bg-white'
                >
                  Crear Acta
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
