// src/components/TermsContent.tsx
export function TermsContent() {
  return (
    <div className='space-y-4 text-gray-700 leading-relaxed'>
      <p className='text-sm text-gray-500'>
        <strong>Última actualización: Septiembre de 2025</strong>
      </p>
      <p>
        Bienvenido a Actas de entrega. Lea atentamente los siguientes términos y
        condiciones (términos) antes de utilizar la aplicación web y/o móvil
        (aplicación o servicio) operada por Universitas Services C.A. (el
        proveedor, nosotros).
      </p>
      <p>
        Al registrarse y utilizar la aplicación, usted (usuario) acepta y se
        compromete a cumplir con estos términos. Si no está de acuerdo con
        alguna parte de los mismos, no podrá acceder al servicio.
      </p>

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>
        1. Objeto del servicio
      </h3>
      <p>
        Actas de entrega es una herramienta digital diseñada para asistir a los
        servidores públicos venezolanos en la elaboración y gestión de actas de
        entrega de cargos, bienes y recursos. La aplicación sirve como un apoyo
        tecnológico y no reemplaza los procedimientos administrativos o legales
        establecidos por la ley.
      </p>

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>
        2. Cuentas de usuario
      </h3>
      <p>
        Para utilizar el servicio, debe registrarse y crear una cuenta,
        proporcionando información veraz y completa. Usted es responsable de
        salvaguardar la contraseña que utiliza para acceder al servicio y de
        cualquier actividad que se realice con su cuenta. Queda estrictamente
        prohibido compartir las credenciales de acceso (usuario y contraseña)
        con terceras personas. La cuenta es personal e intransferible.
      </p>

      {/* ... y así sucesivamente para el resto de las secciones ... */}

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>
        12. Ley aplicable
      </h3>
      <p>
        Estos términos se regirán por las leyes de la República Bolivariana de
        Venezuela.
      </p>

      <h3 className='font-bold text-lg text-[#001A70] pt-2'>13. Contacto</h3>
      <p>
        Si tiene alguna pregunta, puede contactarnos en:
        contacto@universitas.legal
      </p>
    </div>
  );
}
