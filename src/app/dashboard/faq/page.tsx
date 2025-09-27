'use client';

import { useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IoLogoWhatsapp } from 'react-icons/io';

// 1. Nueva estructura de datos anidada basada en el archivo de texto proporcionado.
const faqDataBySection = [
  {
    sectionId: 'section-1',
    title: 'Preguntas generales',
    items: [
      {
        question: '¿Qué es "Actas de entrega"?',
        answer:
          'Es una herramienta digital diseñada para ayudar a los servidores públicos en Venezuela a crear, gestionar y generar actas de entrega de cargos, bienes y recursos de una manera más eficiente y ordenada.',
      },
      {
        question: '¿Para quién es esta aplicación?',
        answer:
          'Está dirigida a todos los servidores públicos dentro de la República Bolivariana de Venezuela que, por sus funciones, deban participar en un proceso de entrega y recepción de un cargo, ya sea en rol de funcionario saliente, entrante o como máxima autoridad de una institución.',
      },
      {
        question:
          '¿Esta aplicación es una herramienta oficial del gobierno venezolano?',
        answer:
          'No. "Actas de entrega" es una aplicación desarrollada y proporcionada por Universitas Services C.A., una entidad privada. Actúa como una herramienta de apoyo tecnológico independiente para facilitar el cumplimiento de las normativas.',
      },
      {
        question: '¿La aplicación ofrece asesoría legal?',
        answer:
          'No, y es un punto muy importante. La aplicación es una herramienta tecnológica para procesar información. No proporciona asesoría legal, jurídica o normativa. Para consultas de ese tipo, debe recurrir a un profesional del derecho.',
      },
    ],
  },
  {
    sectionId: 'section-2',
    title: 'Cuentas y versiones',
    items: [
      {
        question: '¿Cómo me registro?',
        answer:
          'Puede crear una cuenta visitando nuestro sitio web, haciendo clic en "Registrarme" y completando el formulario inicial. Luego, deberá activar su cuenta a través de un enlace que enviaremos a su correo electrónico.',
      },
      {
        question:
          '¿Cuál es la diferencia entre la versión express (gratuita) y la pro (de pago)?',
        answer: {
          intro:
            'La diferencia principal radica en la capacidad y las funcionalidades avanzadas.',
          points: [
            'Express (gratuita): Le permite generar un (1) acta por cada rol. El documento se envía a su correo y no se guarda en la app. Es ideal para un uso único o para probar la plataforma.',
            'Pro (de pago): Le permite generar actas ilimitadas, las almacena en la nube para que pueda gestionarlas y editarlas, y le da acceso a herramientas de inteligencia artificial como un asistente virtual y un módulo de "compliance".',
          ],
        },
      },
      {
        question: '¿Es obligatorio pasar a la versión pro?',
        answer:
          'No. Puede utilizar la versión express gratuita según sus limitaciones. La versión pro es una opción para usuarios que necesitan generar múltiples actas, requieren almacenamiento o desean utilizar las funcionalidades avanzadas.',
      },
    ],
  },
  {
    sectionId: 'section-3',
    title: 'Pagos y actualización a pro',
    items: [
      {
        question: '¿Cómo puedo adquirir la versión pro?',
        answer:
          'Dentro de la aplicación, encontrará un botón para contactar a un asesor vía WhatsApp. Esta persona le guiará a través de las opciones y el proceso de pago para activar su cuenta pro.',
      },
      {
        question: '¿Qué métodos de pago aceptan?',
        answer:
          'Aceptamos transferencias bancarias en bolívares y pagos electrónicos a través de plataformas seguras como PayPal y Stripe.',
      },
      {
        question: '¿El pago es una suscripción mensual o anual?',
        answer:
          'No. La versión pro se adquiere a través de un pago único que le da acceso a todas sus funcionalidades.',
      },
      {
        question: '¿Tienen una política de reembolso?',
        answer:
          'Sí, ofrecemos un reembolso parcial del 50% bajo condiciones muy específicas: debe solicitarlo por escrito dentro de las 24 horas posteriores al pago y no haber superado un límite de uso muy básico. Le recomendamos leer la cláusula completa en nuestros términos y condiciones.',
      },
    ],
  },
  {
    sectionId: 'section-4',
    title: 'Funcionalidades y uso',
    items: [
      {
        question: '¿Cómo recibo los documentos que genero?',
        answer:
          'Los documentos se generan y alojan en Google Drive. Al finalizar, le enviamos a su correo electrónico un enlace único para que pueda acceder, descargar, imprimir o compartir su acta en formato Google Docs.',
      },
      {
        question: '¿Puedo editar un acta después de haberla generado?',
        answer: {
          intro: '',
          points: [
            'En la versión express, no. Una vez generada, cualquier cambio debe hacerse en el archivo Google Docs al que accede desde el enlace.',
            'En la versión pro, sí. Sus actas se guardan en su cuenta, permitiéndole editar la información directamente en la plataforma y volver a generar el documento actualizado.',
          ],
        },
      },
      {
        question:
          '¿En qué consisten las funciones de inteligencia artificial (IA)?',
        answer:
          'En la versión pro, la IA actúa como un asistente. Puede analizar la información para darle alertas proactivas (por ejemplo, sobre plazos) y sugerirle documentos de debida diligencia. También cuenta con un asesor virtual para responder dudas sobre el proceso.',
      },
      {
        question: '¿Puedo compartir mi cuenta o mi contraseña con un colega?',
        answer:
          'No. Por razones de seguridad y para proteger la integridad de su información, las cuentas son estrictamente personales e intransferibles. Compartir sus credenciales está prohibido en los términos y condiciones.',
      },
    ],
  },
  {
    sectionId: 'section-5',
    title: 'Datos y seguridad',
    items: [
      {
        question:
          '¿Quién es el dueño de la información que yo introduzco en la aplicación?',
        answer:
          'Usted. El usuario es en todo momento el propietario del contenido que introduce. Nosotros solo tenemos una licencia limitada para procesar esa información y prestarle el servicio.',
      },
      {
        question:
          '¿Universitas Services C.A. revisa el contenido de mis actas?',
        answer:
          'No. Su información es privada. No verificamos, validamos ni revisamos la veracidad o legalidad del contenido que usted introduce. La responsabilidad sobre el contenido es exclusivamente suya.',
      },
      {
        question: '¿Qué pasa con mis documentos si elimino mi cuenta?',
        answer:
          'Si decide eliminar su cuenta, su perfil y acceso a la plataforma serán borrados. Sin embargo, usted conservará el acceso a los documentos que ya había generado, a través de los enlaces de Google Docs que le fueron enviados a su correo electrónico.',
      },
    ],
  },
  {
    sectionId: 'section-6',
    title: 'Soporte y contacto',
    items: [
      {
        question: '¿Cómo puedo obtener soporte técnico?',
        answer:
          'Para cualquier duda o problema técnico, puede contactar a nuestro equipo a través del canal de WhatsApp disponible en la aplicación o escribiéndonos a contacto@universitas.legal.',
      },
    ],
  },
];

export default function FaqPage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Preguntas Frecuentes');
  }, [setTitle]);

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      {/* 2. El acordeón principal ahora itera sobre las secciones */}
      <Accordion type='single' collapsible className='w-full space-y-4'>
        {faqDataBySection.map((section) => (
          <AccordionItem
            key={section.sectionId}
            value={section.sectionId}
            // 3. Estilos aplicados al contenedor de la sección para lograr el efecto de la imagen.
            className='border rounded-lg bg-white shadow-sm data-[state=open]:shadow-lg data-[state=open]:border-gray-400 transition-all'
          >
            <AccordionTrigger className='text-left font-semibold px-6 py-4 text-lg'>
              {section.title}
            </AccordionTrigger>
            <AccordionContent className='px-4 pb-4 md:px-6 md:pb-6'>
              <div className='space-y-4'>
                {/* 4. Mapeo anidado para renderizar cada pregunta/respuesta dentro de la sección */}
                {section.items.map((item, index) => (
                  <div key={index} className='bg-faqItem p-4 rounded-lg'>
                    <p className='font-semibold text-gray-800'>
                      {item.question}
                    </p>
                    <div className='mt-2 text-text-answer'>
                      {typeof item.answer === 'string' ? (
                        <p>{item.answer}</p>
                      ) : (
                        <>
                          {item.answer.intro && (
                            <p className='mb-2'>{item.answer.intro}</p>
                          )}
                          <ul className='list-disc space-y-1 pl-5'>
                            {item.answer.points.map((point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Botón flotante de WhatsApp (sin cambios) */}
      <a
        href='https://api.whatsapp.com/send?phone=+584125253023&text=Hola,%20necesito%20ayuda%20en%20la%20APP%20de%20Actas%20de%20Entrega'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-8 right-8 z-50'
      >
        <IoLogoWhatsapp className='h-14 w-14 text-green-500 transition-transform hover:scale-110' />
      </a>
    </div>
  );
}
