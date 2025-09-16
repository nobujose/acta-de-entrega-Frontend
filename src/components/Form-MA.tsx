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
import { createActaMaximaAutoridad } from '@/services/actasService';
import { actaMaximaAutoridadSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { InputCompuesto } from './InputCompuesto';
import { LocationSelector } from './LocationSelector';
import { CustomDatePicker } from './DatePicker';
import { CustomTimePicker } from './TimePicker';

type FormData = z.infer<typeof actaMaximaAutoridadSchema>;

const steps = [
  {
    id: 1,
    title: 'Datos generales del Acta',
    fields: [
      'email',
      'rifOrgano',
      'denominacionCargo',
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
    subtitle: 'Artículo 10.3 Resolución CGR N.º 01-000162 de fecha 27-07-2009',
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
      'Anexo_VI',
      'Anexos_VII',
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
        name: 'disponeRelacionMontosFondosAsignados',
        label:
          '¿Dispone usted del documento Relación de los montos de los fondos asignados?',
      },
      {
        name: 'disponeSaldoEfectivoFondos',
        label:
          '¿Dispone usted del documento Saldo en efectivo de dichos fondos?',
      },
      {
        name: 'disponeRelacionBienesAsignados',
        label: '¿Dispone usted del documento Relación de los bienes asignados?',
      },
      {
        name: 'disponeRelacionBienesAsignadosUnidadBienes',
        label:
          '¿Dispone usted del documento Relación de los bienes asignados emitida por la Unidad de Bienes?',
      },
      {
        name: 'disponeEstadosBancariosConciliados',
        label:
          '¿Dispone usted del documento Estados bancarios actualizados y conciliados a la fecha de entrega?',
      },
      {
        name: 'disponeListaComprobantesGastos',
        label: '¿Dispone usted del documento lista de comprobantes de gastos?',
      },
      {
        name: 'disponeChequesEmitidosPendientesCobro',
        label:
          '¿Dispone usted del documento Cheques emitidos pendientes de cobro?',
      },
      {
        name: 'disponeListadoTransferenciaBancaria',
        label:
          '¿Dispone usted del documento listado o reporte de transferencia bancaria?',
      },
      {
        name: 'disponeCaucionFuncionario',
        label:
          '¿Dispone usted del documento Caución del funcionario encargado de la Administración de los recursos financieros a la fecha del cese de funciones?',
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
          '¿Dispone usted del documento cuadro demostrativo del detalle de lo liquidado y recaudado por los rubros respectivos, y de los derechos pendientes de recaudación de años anteriores?',
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
          '¿Dispone usted del documento relación de los expedientes abiertos con ocasión del ejercicio de la potestad de investigación, así como de los procedimientos administrativos para la determinación de responsabilidades?',
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
        label: '¿Dispone usted del documento Situación del Tesoro Nacional?',
      },
      {
        name: 'disponeInfoEjecucionPresupuestoNacional',
        label:
          '¿Dispone usted del documento información de la ejecución del presupuesto nacional de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'disponeMontoDeudaPublicaNacional',
        label:
          '¿Dispone usted del documento Monto de la deuda pública nacional interna y externa?',
      },
      {
        name: 'disponeSituacionCuentasNacion',
        label:
          '¿Dispone usted del documento Situación de las cuentas de la Nación?',
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
        name: 'disponeSituacionTesoroEstadal',
        label: '¿Dispone usted del documento Situación del Tesoro Estadal?',
      },
      {
        name: 'disponeInfoEjecucionPresupuestoEstadal',
        label:
          '¿Dispone usted del documento Información de la ejecución del presupuesto estadal de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'disponeSituacionCuentasEstado',
        label:
          '¿Dispone usted del documento Situación de las cuentas del respectivo estado?',
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
          '¿Dispone usted del documento Situación del tesoro distrital o municipal?',
      },
      {
        name: 'disponeInfoEjecucionPresupuestoDistritalMunicipal',
        label:
          '¿Dispone usted del documento Información de la ejecución del presupuesto distrital o municipal de ingresos y egresos del ejercicio presupuestario en curso y de los derechos pendientes de recaudación de años anteriores?',
      },
      {
        name: 'disponeSituacionCuentasDistritalesMunicipales',
        label:
          '¿Dispone usted del documento Situación de las cuentas distritales o municipales?',
      },
      {
        name: 'disponeInventarioTerrenosEjidos',
        label:
          '¿Dispone usted del documento Inventario detallado de los terrenos ejidos y de los terrenos propios distritales o municipales?',
      },
      {
        name: 'disponeRelacionIngresosVentaTerrenos',
        label:
          '¿Dispone usted del documento Relación de Ingresos producto de las ventas de terrenos ejidos o terrenos propios distritales o municipales?',
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

export function ActaMaximaAutoridadForm() {
  const router = useRouter();
  const { setTitle } = useHeader();
  const [currentStep, setCurrentStep] = useState(0);

  // 3. NUEVOS ESTADOS PARA GESTIONAR LA LLAMADA A LA API
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    setTitle('Acta de Máxima Autoridad');
  }, [setTitle]);

  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(actaMaximaAutoridadSchema),
    shouldUnregister: false, // ✨ AÑADE ESTA LÍNEA
    defaultValues: {
      email: '',
      rifOrgano: '',
      denominacionCargo: '',
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
      Anexo_VI: '',
      Anexo_VII: '',
    },
  });

  // ...
  const { getValues, watch } = form;

  // CAMBIA ESTA LÍNEA
  const selectedAnexo = watch('Anexo_VII') as DynamicStepKey; // antes era 'anexos'
  // ...

  // 4. LÓGICA DE ENVÍO ACTUALIZADA PARA CONECTAR CON EL BACKEND
  const onSubmit = async (data: FormData) => {
    console.log('DATOS FINALES A ENVIAR:', data); // <-- Añade esto

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await createActaMaximaAutoridad(data);

      console.log('Respuesta del servidor:', response);
      alert(`Acta creada con éxito!\nNúmero de Acta: ${response.numeroActa}`);
      router.push('/dashboard'); // Redirige al dashboard tras el éxito
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
      if (currentStep === 8 && getValues('Anexo_VII') === 'NO APLICA') {
        // antes era 'anexos'
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

  // Componente reutilizable para campos de texto con ayuda contextual
  const FormFieldWithExtras = ({
    name,
    label,
    subtitle,
    placeholder,
    type = 'text',
    maxLength,
  }: {
    name: keyof FormData;
    label: string;
    subtitle?: string;
    placeholder?: string;
    type?: string;
    maxLength?: number;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {/* Se renderiza el subtítulo/ejemplo si existe, en cursiva */}
          {subtitle && (
            <FormDescription className='italic'>{subtitle}</FormDescription>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              maxLength={maxLength}
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  // --- INICIO DE LA MEJORA ---
  // Reemplazamos el antiguo `SiNoQuestion` que usaba RadioGroup por este nuevo componente.
  // Este enfoque es el ideal porque:
  // 1. NO se modifica el archivo base `button.tsx` de Shadcn.
  // 2. Todos los estilos personalizados y la lógica se encapsulan aquí mismo.
  // 3. Es fácilmente reutilizable dentro de este formulario.
  const SiNoQuestion = ({
    name,
    label,
  }: {
    name: keyof FormData;
    label: string;
  }) => {
    // --- Implementación de Estilos Locales ---
    // Definimos los estilos como constantes para que el código JSX sea más limpio.

    // Estilo para los botones NO seleccionados (efecto 3D elevado):
    // - `bg-white`: Fondo blanco.
    // - `text-black`: Texto negro para contraste.
    // - `border-gray-300`: Borde sutil.
    // - `shadow-md`: Sombra para dar el efecto de que "sobresale".
    // - `hover:bg-gray-100`: Un leve cambio de color al pasar el cursor.
    const unselectedStyle =
      'bg-white text-black border-gray-300 shadow-md hover:bg-gray-100';

    // Estilo para el botón SELECCIONADO (efecto 3D presionado):
    // - `bg-slate-200`: Fondo gris claro, como en la imagen.
    // - `text-slate-900`: Texto oscuro para legibilidad sobre el fondo gris.
    // - `border-gray-400`: Un borde ligeramente más oscuro.
    // - `shadow-inner`: La clave del efecto "presionado", aplica una sombra interior.
    // - `hover:bg-slate-200`: Mantenemos el mismo color en hover para que no parezca que "salta" de nuevo.
    const selectedStyle =
      'bg-slate-200 text-slate-900 border-gray-400 shadow-inner hover:bg-slate-200';

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className='space-y-3 p-4 border rounded-md'>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className='flex items-center space-x-4'>
                {/* Botón SI */}
                <Button
                  type='button'
                  // Usamos una variante base de Shadcn, como 'outline', para que herede
                  // la forma y el tamaño, pero la sobreescribimos con `className`.
                  variant='outline'
                  onClick={() => field.onChange('SI')}
                  disabled={isLoading}
                  // Aquí ocurre la magia: `cn` aplica `selectedStyle` si el valor del campo
                  // es 'SI'; de lo contrario, aplica `unselectedStyle`.
                  className={cn(
                    field.value === 'SI' ? selectedStyle : unselectedStyle
                  )}
                >
                  SI
                </Button>

                {/* Botón NO (misma lógica) */}
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => field.onChange('NO')}
                  disabled={isLoading}
                  className={cn(
                    field.value === 'NO' ? selectedStyle : unselectedStyle
                  )}
                >
                  NO
                </Button>

                {/* Botón NO APLICA (misma lógica) */}
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => field.onChange('NO APLICA')}
                  disabled={isLoading}
                  className={cn(
                    field.value === 'NO APLICA'
                      ? selectedStyle
                      : unselectedStyle
                  )}
                >
                  NO APLICA
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const navButtonStyleGray =
    'bg-white text-black border-gray-300 shadow-md hover:bg-gray-100 active:bg-slate-200 active:shadow-inner active:border-gray-400 transition-all duration-150';

  const navButtonStyleBlue =
    'bg-primary-blue text-white border-blue-800 shadow-md hover:bg-primary-blue-dark active:bg-blue-800 active:shadow-inner active:border-blue-900 transition-all duration-150';

  return (
    <Card className='w-full bg-white'>
      <CardHeader>
        <CardTitle className='text-[24px]'>
          {currentStep === 9 && dynamicStepContent[selectedAnexo]
            ? dynamicStepContent[selectedAnexo].title
            : steps[currentStep].title}
        </CardTitle>
        <ShadcnCardDescription className='whitespace-pre-line italic font-bold'>
          {currentStep === 9 && dynamicStepContent[selectedAnexo]
            ? dynamicStepContent[selectedAnexo].subtitle
            : steps[currentStep].subtitle}
        </ShadcnCardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* MENSAJE DE ERROR DE LA API */}
            {apiError && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error al Crear el Acta</AlertTitle>
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            {currentStep === 0 && (
              <div className='space-y-8'>
                {/* --- Primera Sección: Identificación --- */}
                <div className='space-y-4 p-6 border rounded-lg'>
                  <div className='mb-4'>
                    <h3 className='font-bold text-lg'>
                      Identificación del cargo y organismo
                    </h3>
                    <p className='text-sm text-gray-500 italic font-bold'>
                      Artículo 10.2 Resolución CGR N.º 01-000162 de fecha
                      27-07-2009
                    </p>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
                    <FormFieldWithExtras
                      name='email'
                      label='Dirección de correo electrónico'
                      subtitle='Ej: ejemplo@dominio.com'
                    />
                    <FormField
                      control={form.control}
                      name='rifOrgano'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            RIF del órgano, entidad, oficina o dependencia de la
                            Administración Pública
                          </FormLabel>
                          <FormDescription className='italic'>
                            Ej: G-00000000-0
                          </FormDescription>
                          <FormControl>
                            <InputCompuesto
                              type='rif'
                              options={['G', 'J', 'E']} // Opciones para el desplegable
                              placeholder=''
                              {...field}
                              onChange={(value) => field.onChange(value)} // Conecta el cambio con el formulario
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormFieldWithExtras
                      name='denominacionCargo'
                      label='Denominación del cargo'
                      subtitle='Ej: Presidencia, dirección, coordinación'
                      maxLength={50}
                    />
                    <FormFieldWithExtras
                      name='nombreOrgano'
                      label='Nombre del órgano, entidad, oficina o dependencia de la Administración Pública'
                      subtitle='Ej: Instituto Nacional de Transporte Terrestre (INTT)'
                      maxLength={50}
                    />
                  </div>
                </div>

                {/* --- Segunda Sección: Detalles de Suscripción --- */}
                <div className='space-y-4 p-6 border rounded-lg'>
                  <div className='mb-4'>
                    <h3 className='font-bold text-lg'>
                      Detalles de la suscripción del acta
                    </h3>
                    <p className='text-sm text-gray-500 italic font-bold'>
                      Artículo 10.1 Resolución CGR N.º 01-000162 de fecha
                      27-07-2009
                    </p>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
                    <LocationSelector control={form.control} form={form} />

                    <FormField
                      control={form.control}
                      name='horaSuscripcion'
                      render={({ field }) => (
                        <FormItem className='flex flex-col justify-end'>
                          <FormLabel>Hora de suscripción del acta</FormLabel>
                          <FormControl>
                            <CustomTimePicker
                              // react-datepicker usa objetos Date, así que convertimos el valor
                              value={
                                field.value
                                  ? new Date(`1970-01-01T${field.value}`)
                                  : null
                              }
                              onChange={(date) => {
                                // Guardamos la hora en formato HH:mm
                                field.onChange(
                                  date
                                    ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
                                    : ''
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='fechaSuscripcion'
                      render={({ field }) => (
                        <FormItem className='flex flex-col justify-end'>
                          <FormLabel>Fecha de la suscripción</FormLabel>
                          <FormControl>
                            <CustomDatePicker
                              // react-datepicker usa objetos Date, así que convertimos el valor
                              value={field.value ? new Date(field.value) : null}
                              onChange={(date) => {
                                // Guardamos la fecha en formato YYYY-MM-DD
                                field.onChange(
                                  date ? date.toISOString().split('T')[0] : ''
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='md:col-span-2'>
                      <FormFieldWithExtras
                        name='direccionOrgano'
                        label='Dirección exacta y completa de la ubicación del órgano, entidad, oficina o dependencia que se entrega'
                        subtitle='Ej: Avenida 00, entre calles 00 y 00, Edif. Central, Piso 2, Despacho de la presidencia'
                        maxLength={300}
                      />
                    </div>
                    <div className='md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='motivoEntrega'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Motivo de la entrega del órgano, entidad, oficina
                              o dependencia de la Administración Pública
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
                                <SelectItem value='Renuncia'>
                                  Renuncia
                                </SelectItem>
                                <SelectItem value='Jubilación'>
                                  Jubilación
                                </SelectItem>
                                <SelectItem value='Muerte'>Muerte</SelectItem>
                                <SelectItem value='Incapacidad absoluta'>
                                  Incapacidad absoluta
                                </SelectItem>
                                <SelectItem value='Destitución'>
                                  Destitución
                                </SelectItem>
                                <SelectItem value='Supresión del cargo'>
                                  {' '}
                                  Supresión del cargo
                                </SelectItem>
                                <SelectItem value='Expiración del período'>
                                  {' '}
                                  Expiración del período
                                </SelectItem>
                                <SelectItem value='Ascenso'>Ascenso</SelectItem>
                                <SelectItem value='Traslado'>
                                  Traslado
                                </SelectItem>
                                <SelectItem value='Rotación'>
                                  Rotación
                                </SelectItem>
                                <SelectItem value='Comisión de servicio'>
                                  Comisión de servicio
                                </SelectItem>
                                <SelectItem value='Licencia'>
                                  Licencia
                                </SelectItem>
                                <SelectItem value='Suspensión'>
                                  Suspensión
                                </SelectItem>
                                <SelectItem value='Inhabilitación'>
                                  Inhabilitación
                                </SelectItem>
                                <SelectItem value='Revocatoria del mandato'>
                                  Revocatoria del mandato
                                </SelectItem>
                                <SelectItem value='Declaración de abandono del cargo'>
                                  {' '}
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
                    subtitle='Ej: Pedro Jose Rodríguez Hernández'
                    maxLength={50}
                  />
                  <FormField
                    control={form.control}
                    name='cedulaServidorEntrante'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cédula</FormLabel>
                        <FormDescription className='italic'>
                          Ej: V-00.000.000
                        </FormDescription>
                        <FormControl>
                          <InputCompuesto
                            type='cedula'
                            options={['V', 'E']} // Opciones para el desplegable
                            placeholder=''
                            {...field}
                            onChange={(value) => field.onChange(value)} // Conecta el cambio con el formulario
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormFieldWithExtras
                    name='profesionServidorEntrante'
                    label='Profesión'
                    subtitle='Ej: Contador, Ingeniero, Abogado'
                    maxLength={50}
                  />
                  <FormFieldWithExtras
                    name='designacionServidorEntrante'
                    label='Datos de designación'
                    subtitle='Ej: Resolución N° 000/00 de fecha 00-00-0000 publicado en Gaceta N° 0000 de fecha 00-00-000'
                    maxLength={150}
                  />
                </div>
                <h3 className='text-lg font-semibold border-b pb-2'>Auditor</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <FormFieldWithExtras
                    name='nombreAuditor'
                    label='Nombre'
                    subtitle='Ej: Pedro José Rodríguez Hernández'
                    maxLength={50}
                  />
                  <FormField
                    control={form.control}
                    name='cedulaAuditor'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cédula</FormLabel>
                        <FormDescription className='italic'>
                          Ej: V-00.000.000
                        </FormDescription>
                        <FormControl>
                          <InputCompuesto
                            type='cedula'
                            options={['V', 'E']} // Opciones para el desplegable
                            placeholder=''
                            {...field}
                            onChange={(value) => field.onChange(value)} // Conecta el cambio con el formulario
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormFieldWithExtras
                    name='profesionAuditor'
                    label='Profesión'
                    subtitle='Ej: Contador, Ingeniero, Abogado'
                    maxLength={50}
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
                      subtitle='Ej: Pedro José Rodríguez Hernández'
                      maxLength={50}
                    />
                    <FormField
                      control={form.control}
                      name='cedulaTestigo1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cédula</FormLabel>
                          <FormDescription className='italic'>
                            Ej: V-00.000.000
                          </FormDescription>
                          <FormControl>
                            <InputCompuesto
                              type='cedula'
                              options={['V', 'E']} // Opciones para el desplegable
                              placeholder=''
                              {...field}
                              onChange={(value) => field.onChange(value)} // Conecta el cambio con el formulario
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormFieldWithExtras
                      name='profesionTestigo1'
                      label='Profesión'
                      subtitle='Ej: Contador, Ingeniero, Abogado'
                      maxLength={50}
                    />
                  </div>
                  <div className='space-y-4 p-4 border rounded-md'>
                    <p className='font-medium'>Testigo N° 2</p>
                    <FormFieldWithExtras
                      name='nombreTestigo2'
                      label='Nombre'
                      subtitle='Ej: Pedro José Rodríguez Hernández'
                      maxLength={50}
                    />
                    <FormField
                      control={form.control}
                      name='cedulaTestigo2'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cédula</FormLabel>
                          <FormDescription className='italic'>
                            Ej: V-00.000.000
                          </FormDescription>
                          <FormControl>
                            <InputCompuesto
                              type='cedula'
                              options={['V', 'E']} // Opciones para el desplegable
                              placeholder=''
                              {...field}
                              onChange={(value) => field.onChange(value)} // Conecta el cambio con el formulario
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormFieldWithExtras
                      name='profesionTestigo2'
                      label='Profesión'
                      subtitle='Ej: Contador, Ingeniero, Abogado'
                      maxLength={50}
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
                    subtitle='Ej: Pedro José Rodríguez Hernández'
                    maxLength={50}
                  />
                  <FormField
                    control={form.control}
                    name='cedulaServidorSaliente'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cédula</FormLabel>
                        <FormDescription className='italic'>
                          Ej: V-00.000.000
                        </FormDescription>
                        <FormControl>
                          <InputCompuesto
                            type='cedula'
                            options={['V', 'E']} // Opciones para el desplegable
                            placeholder=''
                            {...field}
                            onChange={(value) => field.onChange(value)} // Conecta el cambio con el formulario
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormFieldWithExtras
                    name='designacionServidorSaliente'
                    label='Datos de designación'
                    subtitle='Ej: Resolución N° 000/00 de fecha 00-00-0000 publicado en Gaceta N° 0000 de fecha 00-00-000'
                    maxLength={150}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEstadoSituacionPresupuestaria'
                  label='¿Dispone usted del documento Estado de situación presupuestaria  que muestra todos los momentos presupuestarios y sus detalles. Incluye: presupuesto original, modificaciones, presupuesto modificado, compromisos, causado, pagado, por pagar y presupuesto disponible a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionGastosComprometidosNoCausados'
                  label='¿Dispone usted del documento Relación de gastos comprometidos no causados a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionGastosComprometidosCausadosNoPagados'
                  label='¿Dispone usted del documento Relación de gastos comprometidos causados y no pagados a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoPresupuestarioPorPartidas'
                  label='¿Dispone usted del documento Estado presupuestario del ejercicio vigente por partidas?'
                />
                <SiNoQuestion
                  name='disponeEstadoPresupuestarioDetalleCuentas'
                  label='¿Dispone usted del documento Estado presupuestario del ejercicio con los detalles de sus cuentas?'
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEstadosFinancieros'
                  label='¿Dispone usted del documento Estados financieros a la fecha de la entrega?'
                />
                <SiNoQuestion
                  name='disponeBalanceComprobacion'
                  label='¿Dispone usted del documento Balance de comprobación a la fecha de la elaboración de los estados financieros y sus notas explicativas a la fecha de la entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoSituacionFinanciera'
                  label='¿Dispone usted del documento Estado de situación financiera / balance general y sus notas explicativas a la fecha de la entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoRendimientoFinanciero'
                  label='¿Dispone usted del documento Estado de rendimiento financiero / Estado de ganancias y pérdidas y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeEstadoMovimientosPatrimonio'
                  label='¿Dispone usted del documento Estado de movimientos de las cuentas de patrimonio y sus notas explicativas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasPorCobrar'
                  label='¿Dispone usted del documento Relación de cuentas por cobrar a la fecha del Acta de Entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasPorPagar'
                  label='¿Dispone usted del documento Relación de cuentas por pagar a la fecha del Acta de Entrega?'
                />
                <SiNoQuestion
                  name='disponeRelacionCuentasFondosTerceros'
                  label='¿Dispone usted del documento Relación de las cuentas de los fondos de terceros?'
                />
                <SiNoQuestion
                  name='disponeSituacionFondosAnticipo'
                  label='¿Dispone usted del documento Situación de los fondos en anticipo?'
                />
                <SiNoQuestion
                  name='disponeSituacionCajaChica'
                  label='¿Dispone usted del documento Situación de la caja chica?'
                />
                <SiNoQuestion
                  name='disponeActaArqueoCajasChicas'
                  label='¿Dispone usted del documento Acta de arqueo de las cajas chicas a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='disponeListadoRegistroAuxiliarProveedores'
                  label='¿Dispone usted del documento Listado del registro auxiliar de proveedores?'
                />
                <SiNoQuestion
                  name='disponeReportesLibrosContables'
                  label='¿Dispone usted del documento Reportes de libros contables (diario y mayores analíticos) a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReportesCuentasBancarias'
                  label='¿Dispone usted del documento Reportes de las cuentas bancarias (movimientos a la fecha del cese de funciones)?'
                />
                <SiNoQuestion
                  name='disponeReportesConciliacionesBancarias'
                  label='¿Dispone usted del documento Reportes de las conciliaciones bancarias a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReportesRetenciones'
                  label='¿Dispone usted del documento Reportes de retenciones de pagos pendientes por enterar correspondientes a ISLR, IVA y Retenciones por contratos (obras, bienes y servicios) a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReporteProcesosContrataciones'
                  label='¿Dispone usted del documento Reporte de los procesos de Contrataciones Públicas a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReporteFideicomisoPrestaciones'
                  label='¿Dispone usted del documento Reporte del fideicomiso de prestaciones sociales a la fecha del cese de funciones?'
                />
                <SiNoQuestion
                  name='disponeReporteBonosVacacionales'
                  label='¿Dispone usted del documento Reporte de bonos vacacionales a la fecha del cese de funciones?'
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeCuadroResumenCargos'
                  label='¿Dispone usted del documento cuadro resumen indicando el número de cargos existentes, clasificados en empleados, obreros, fijos o contratados?'
                />
                <SiNoQuestion
                  name='disponeCuadroResumenValidadoRRHH'
                  label='¿Dispone usted del documento cuadro resumen validado por la Oficina de recursos humanos?'
                />
                <SiNoQuestion
                  name='disponeReporteNominas'
                  label='¿Dispone usted del documento Reporte de nóminas a la fecha del cese de funciones?'
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeInventarioBienes'
                  label='¿Dispone usted del documento Inventario de bienes e inmuebles esta elaborado a la fecha de entrega. Debe contener: comprobación física, condición de los bienes, responsable patrimonial, responsable por uso, fecha de verificación, número del acta de verificación, código, descripción, marca, modelo, número del serial, estado de conservación, ubicación y valor de mercado de los bienes?'
                />
              </div>
            )}

            {currentStep === 6 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeEjecucionPlanOperativo'
                  label='¿Dispone usted del documento Ejecución del Plan Operativo a la fecha de entrega?'
                />
                <SiNoQuestion
                  name='incluyeCausasIncumplimientoMetas'
                  label='¿Usted incluye las causas que originaron el incumplimiento de algunas metas en la ejecución del Plan Operativo?'
                />
                <SiNoQuestion
                  name='disponePlanOperativoAnual'
                  label='¿Dispone usted del documento Plan Operativo anual?'
                />
              </div>
            )}

            {currentStep === 7 && (
              <div className='space-y-4'>
                <SiNoQuestion
                  name='disponeClasificacionArchivo'
                  label='¿Dispone usted del documento clasificación del archivo?'
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
                  name='Anexo_VI'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Cualquier otra información o documentación que se
                        considere necesaria indicando la fecha de corte.
                      </FormLabel>
                      <ShadcnCardDescription className='text-xs'>
                        Está referida a que además de los documentos requeridos
                        de manera estándar, las partes involucradas pueden
                        aportar datos adicionales que puedan influir en la
                        evaluación o decisión del organismo correspondiente. La
                        fecha de corte es crucial porque establece un límite
                        temporal para la información presentada, asegurando que
                        todas las partes estén en la misma página respecto a la
                        temporalidad de los datos.
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
                  name='Anexo_VII'
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

            {/* Navegación entre pasos */}
            <div className='flex items-center justify-between pt-8'>
              {/* Columna Izquierda (para el botón Anterior) */}
              <div className='w-1/3'>
                {currentStep > 0 && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={prevStep}
                    disabled={isLoading}
                    className={navButtonStyleGray}
                  >
                    Anterior
                  </Button>
                )}
              </div>

              {/* Columna Central (para el indicador de Pasos) */}
              <div className='flex w-1/3 justify-center'>
                <div className='bg-icon-gray-bg px-4 py-2 rounded-lg shadow-sm'>
                  <p className='text-sm font-bold text-gray-700'>
                    Paso {currentStep + 1} de {steps.length}
                  </p>
                </div>
              </div>

              {/* Columna Derecha (para el botón Siguiente/Finalizar) */}
              <div className='flex w-1/3 justify-end'>
                {currentStep < steps.length - 1 && (
                  <Button
                    type='button'
                    onClick={nextStep}
                    disabled={isLoading}
                    className={navButtonStyleBlue}
                  >
                    Siguiente
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    type='submit'
                    disabled={isLoading}
                    className={navButtonStyleBlue}
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
