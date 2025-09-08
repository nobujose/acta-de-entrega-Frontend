// src/services/authService.ts
import apiClient from '@/lib/axios';
import { AxiosError } from 'axios';
import * as z from 'zod';

// Tipos de respuesta (sin cambios)
interface LoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

interface RegisterResponse {
  message: string;
}

// NUEVO: Definimos un tipo específico para los datos de registro para evitar el uso de 'any'.
interface RegisterData {
  email: string;
  password: string;
  name: string;
  apellido: string;
  telefono: string;
  institucion: string;
  cargo: string;
}

// Funciones de login y registro (sin cambios en login)
export const loginUser = async (
  data: z.infer<z.ZodObject<{ email: z.ZodString; password: z.ZodString }>>
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'Error al iniciar sesión.'
      );
    }
    throw new Error('No se pudo conectar con el servidor.');
  }
};

// --- CAMBIO APLICADO AQUÍ ---
export const registerUser = async (
  data: RegisterData // Se reemplaza 'any' por el tipo específico 'RegisterData'
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      '/auth/register',
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      if (Array.isArray(error.response.data.errors)) {
        const messages = error.response.data.errors
          .map((e: { msg: string }) => e.msg)
          .join(', ');
        throw new Error(messages);
      }
      throw new Error(
        error.response.data.message || 'Error al registrar el usuario.'
      );
    }
    throw new Error('No se pudo conectar con el servidor.');
  }
};

// --- RECUPERACIÓN DE CONTRASEÑA ---

// forgotPassword y verifyOtp (sin cambios)
export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'Error al solicitar el código.'
      );
    }
    throw new Error('No se pudo conectar con el servidor.');
  }
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<{ message: string; resetToken: string }> => {
  try {
    const response = await apiClient.post('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'Error al verificar el código.'
      );
    }
    throw new Error('No se pudo conectar con el servidor.');
  }
};

// (código de resetPassword sin cambios)
export const resetPassword = async (
  password: string,
  confirmPassword: string,
  resetToken: string
): Promise<{ message: string }> => {
  try {
    const dataToSend = {
      newPassword: password,
      confirmPassword: confirmPassword,
    };

    const response = await apiClient.post('/auth/reset-password', dataToSend, {
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.data) {
      throw new Error(
        error.response.data.message || 'Error al actualizar la contraseña.'
      );
    }
    throw new Error('No se pudo conectar con el servidor.');
  }
};
