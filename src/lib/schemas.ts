import * as z from 'zod';

export const actaMaximaAutoridadSchema = z
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
    profesionServidorEntrante: z.string().min(1, 'Este campo es requerido.'),
    designacionServidorEntrante: z.string().min(1, 'Este campo es requerido.'),
    nombreAuditor: z.string().min(1, 'Este campo es requerido.'),
    cedulaAuditor: z.string().min(1, 'Este campo es requerido.'),
    profesionAuditor: z.string().min(1, 'Este campo es requerido.'),
    nombreTestigo1: z.string().min(1, 'Este campo es requerido.'),
    cedulaTestigo1: z.string().min(1, 'Este campo es requerido.'),
    profesionTestigo1: z.string().min(1, 'Este campo es requerido.'),
    nombreTestigo2: z.string().min(1, 'Este campo es requerido.'),
    cedulaTestigo2: z.string().min(1, 'Este campo es requerido.'),
    profesionTestigo2: z.string().min(1, 'Este campo es requerido.'),
    nombreServidorSaliente: z.string().min(1, 'Este campo es requerido.'),
    cedulaServidorSaliente: z.string().min(1, 'Este campo es requerido.'),
    designacionServidorSaliente: z.string().min(1, 'Este campo es requerido.'),

    // --- Anexos (SI/NO) ---
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
    disponeReporteProcesosContrataciones: z.string().optional(),
    disponeReporteFideicomisoPrestaciones: z.string().optional(),
    disponeReporteBonosVacacionales: z.string().optional(),
    disponeCuadroResumenCargos: z.string().optional(),
    disponeCuadroResumenValidadoRRHH: z.string().optional(),
    disponeReporteNominas: z.string().optional(),
    disponeInventarioBienes: z.string().optional(),
    disponeEjecucionPlanOperativo: z.string().optional(),
    incluyeCausasIncumplimientoMetas: z.string().optional(),
    disponePlanOperativoAnual: z.string().optional(),
    disponeClasificacionArchivo: z.string().optional(),
    incluyeUbicacionFisicaArchivo: z.string().optional(),
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

    anexo6: z.string().min(1, 'Este campo es requerido.'),
    anexos: z.string().min(1, 'Este campo es requerido.'),
    accionesAuditoria: z.string().optional(),
    deficienciasActa: z.string().optional(),
    autorizaEnvioCorreoAlternativo: z.string().optional(),
    correoAlternativo: z.string().optional(),
  })
  .refine(
    (data) => {
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
      path: ['correoAlternativo'],
    }
  );
