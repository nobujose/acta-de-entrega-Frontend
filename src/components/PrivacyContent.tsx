// src/components/PrivacyContent.tsx
export function PrivacyContent() {
  return (
    <div className='space-y-4 text-gray-700 leading-relaxed'>
      <p className='text-sm text-gray-500'>
        <strong>Última actualización: 16 de septiembre de 2025</strong>
      </p>
      <p>
        Universitas Services C.A. (nosotros) se compromete a proteger su
        privacidad. Esta política de privacidad explica cómo gestionamos su
        información personal cuando utiliza nuestra aplicación Actas de entrega
        (aplicación).
      </p>

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>
        1. Información que recopilamos
      </h3>
      <ul className='list-disc list-inside space-y-2 pl-4'>
        <li>
          <strong>Información de registro:</strong> Nombre, apellido, correo
          electrónico y número de teléfono.
        </li>
        <li>
          <strong>Información de perfil:</strong> Institución y cargo que
          desempeña.
        </li>
        <li>
          <strong>Contenido del usuario:</strong> Información introducida en los
          formularios para generar las actas.
        </li>
        <li>
          <strong>Información de uso (automática):</strong> Datos técnicos como
          dirección IP o tipo de dispositivo para mejorar el servicio.
        </li>
      </ul>

      {/* ... y así sucesivamente para el resto de las secciones ... */}

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>
        6. Cambios a esta política
      </h3>
      <p>
        Nos reservamos el derecho de modificar esta política. Le notificaremos
        de cualquier cambio publicando la nueva política en esta página.
      </p>

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>7. Contacto</h3>
      <p>
        Si tiene preguntas sobre esta política de privacidad, contáctenos en:
        contacto@universitas.legal
      </p>
    </div>
  );
}
