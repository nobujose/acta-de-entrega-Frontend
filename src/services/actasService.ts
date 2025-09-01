import apiClient from '@/lib/axios';
import axios from 'axios';
import * as z from 'zod';

// Importamos el esquema desde el nuevo archivo central
import { actaMaximaAutoridadSchema } from '@/lib/schemas';

// Creamos el tipo de datos del formulario a partir del esquema
type ActaData = z.infer<typeof actaMaximaAutoridadSchema>;

// Definimos cómo se verá la respuesta exitosa del backend
interface ActaResponse {
  message: string;
  numeroActa: string;
  id: string;
}

/**
 * Llama al endpoint del backend para crear un Acta de Máxima Autoridad (Paga).
 */
export const createActaMaximaAutoridad = async (
  data: ActaData
): Promise<ActaResponse> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    // Mapeamos el nombre del campo del frontend al que espera el backend.
    const { denominacionCargoEntrega, ...rest } = data;
    const mappedData = {
      ...rest,
      denominacionCargo: denominacionCargoEntrega,
    };

    const response = await apiClient.post<ActaResponse>(
      '/actas/maxima-autoridad-paga',
      mappedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Usamos el mensaje de error que envía el backend
      throw new Error(error.response.data.message || 'Error al crear el acta.');
    }
    throw new Error('No se pudo conectar con el servidor.');
  }
};
