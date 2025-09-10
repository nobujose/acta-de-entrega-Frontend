'use client'; // Directiva necesaria para usar hooks como useState y useEffect en Next.js App Router

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// --- Estilos CSS (puedes moverlos a un archivo CSS Module o a un styled-component) ---
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  card: {
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    textAlign: 'center' as const,
    maxWidth: '400px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#555',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: '#dc3545',
  },
};

// --- Componente de la Página ---
const ConfirmarEmailPage = () => {
  // Estado para manejar el mensaje que se muestra al usuario
  const [status, setStatus] = useState({
    loading: true,
    message: 'Verificando tu correo electrónico...',
    isError: false,
  });

  // Hooks de Next.js para enrutamiento y parámetros de búsqueda
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // useEffect se ejecuta una sola vez cuando el componente se carga en el cliente
  useEffect(() => {
    if (!token) {
      setStatus({
        loading: false,
        message:
          'No se encontró un token de confirmación. Por favor, revisa el enlace.',
        isError: true,
      });
      return;
    }

    // 2. Llamar a la API del backend para verificar el token
    const verificarToken = async () => {
      try {
        // URL de tu backend en Render
        const apiUrl = `https://actaentrega.onrender.com/api/auth/confirm-email/${token}`;

        const response = await fetch(apiUrl, {
          method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Ocurrió un error desconocido.');
        }

        // 3. Actualizar el estado a "éxito"
        setStatus({
          loading: false,
          message:
            '¡Tu correo ha sido verificado exitosamente! Ya puedes iniciar sesión.',
          isError: false,
        });
      } catch (error) {
        // 4. Actualizar el estado a "error"
        let errorMessage = 'Ocurrió un error desconocido.';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setStatus({
          loading: false,
          message: errorMessage,
          isError: true,
        });
      }
    };

    verificarToken();
  }, [token]); // La dependencia ahora es el token

  // Función para redirigir al login usando el router de Next.js
  const irALogin = () => {
    router.push('/login'); // Asegúrate de que '/login' sea tu ruta de inicio de sesión
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {status.loading
            ? 'Verificando...'
            : status.isError
              ? 'Error de Verificación'
              : '¡Éxito!'}
        </h1>
        <p style={{ ...styles.message, ...(status.isError && styles.error) }}>
          {status.message}
        </p>
        {!status.loading && (
          <button style={styles.button} onClick={irALogin}>
            Continuar a Iniciar Sesión
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfirmarEmailPage;
