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

const faqData = [
  {
    id: 'item-1',
    question:
      '¿Qué diferencia hay entre la versión "Express" (Gratis) y la "Pro" (Paga)?',
    answer: {
      intro:
        '¡Excelente pregunta! La versión Express sólo puede elaborar su acta de entrega que será enviada por correo electrónico, pero en la versión Pro podrás:',
      points: [
        'Elaborar tu acta y guardar los datos.',
        'Ver tus datos guardados y editar cualquier error que se te haya generado.',
        'En el panel de acta también podrás ver las alertas de los anexos que tienes faltantes y así gestionar mejor su debida diligencia.',
        'Tiene el apartado de Compliance de Acta de Entrega, que podrás allí revisar el cumplimiento de las actas de entrega que tengas generadas, recibiendo un reporte detallado con las observaciones que se generen de las mismas.',
        'Contarás con una IA que te podrá aclarar cualquier duda que tengas con respecto a la gestión de acta de entrega.',
      ],
    },
  },
  {
    id: 'item-2',
    question:
      'Deseo adquirir la aplicación Acta de Entrega Pro, ¿Cómo puedo hacerlo?',
    answer:
      '¡Nos alegra mucho tu interés! Para pasar a la versión Pro y desbloquear todas las funcionalidades avanzadas, puedes contactarnos en el botón de WhatsApp se encuentra en la parte inferior derecha de esta pantalla y nuestros asesores te ayudará al procedimiento para adquirir la versión Pro',
  },
  {
    id: 'item-3',
    question: 'Estoy confundido ¿Cómo creo un acta?',
    answer: {
      intro: '¡Es muy fácil! Sigue estos pasos:',
      points: [
        'En la pantalla del Menú principal de la app, busca y elije el tipo de acta que necesita generar.',
        'Se abrirá un formulario. Rellena toda la información que se te solicita en cada sección.',
        'Una vez que completes todos los datos, presiona el botón "Crear Acta". ',
        '¡Listo! El sistema procesará tu información, que será enviada por correo electrónico',
      ],
    },
  },
  {
    id: 'item-4',
    question: '¿Puedo guardar un borrador de mi acta y continuar después?',
    answer: 'Sólo puedes guardar la información en la versión Pro.',
  },
  {
    id: 'item-5',
    question:
      'Cometí un error. ¿Puedo editar un acta después de haberla generado?',
    answer: 'Sólo puedes editar la información en la versión Pro.',
  },
  {
    id: 'item-6',
    question: '¿Dónde se guardan mis actas?',
    answer:
      'Todas tus actas se guardan de forma segura en la nube, asociadas a tu cuenta de usuario. Pero esto es disponible sólo para la versión Pro.',
  },
  {
    id: 'item-7',
    question: '¿Dónde se guardan mis actas?',
    answer:
      'Todas tus actas se guardan de forma segura en la nube, asociadas a tu cuenta de usuario. Pero esto es disponible sólo para la versión Pro.',
  },
  {
    id: 'item-8',
    question: '¿La aplicación me alertará sobre los documentos que me faltan?',
    answer:
      'La versión Express te notificará si dejas en blanco un campo obligatorio del formulario. Sin embargo, las alertas inteligentes proactivas que analizan tu información, te advierten sobre plazos cercanos o te sugieren documentos de debida diligencia según la normativa, son parte del motor de IA de la Versión Pro.',
  },
  {
    id: 'item-9',
    question: 'Necesito ayuda con la aplicación, ¿Me puedes ayudar?',
    answer:
      '¡Claro! Puedes contactar a nuestro equipo de soporte técnico haciendo clic en el botón de WhatsApp que se encuentra en la parte inferior derecha de esta pantalla',
  },
  {
    id: 'item-10',
    question:
      '¿Qué hago si tengo una duda sobre la normativa o las implicaciones legales de mi acta?',
    answer:
      'Es una pregunta muy importante. Nuestra aplicación es una herramienta tecnológica diseñada para facilitar la elaboración de actas según las estructuras comunes. Sin embargo, la app no ofrece asesoría legal. Para dudas específicas sobre normativa o implicaciones legales, te recomendamos encarecidamente consultar con un abogado o un experto en la materia. Por lo que puedes contactar a nuestro equipo de soporte técnico con el botón de WhatsApp que está en la parte inferior derecha de esta pantalla y le agendamos una cita.',
  },
  {
    id: 'item-11',
    question: '¿Necesito internet para usar la app?',
    answer:
      'Si requieres de conexión a internet para cargar la información en los campos y hacer clic en crear acta.',
  },
  {
    id: 'item-12',
    question:
      'Terminé el cuestionario y presioné "Crear Acta", ¿dónde encuentro mi acta?',
    answer:
      '¡Felicidades! Una vez que guardas el acta finalizada, nuestro sistema genera automáticamente el documento y lo envía por correo electrónico a la dirección que utilizaste para registrarte. Revisa tu bandeja de entrada.',
  },
  {
    id: 'item-13',
    question:
      'No encuentro el correo en mi bandeja de entrada principal, ¿Qué hago?',
    answer: {
      intro:
        'No te preocupes, esto es común. Por favor, revisa las siguientes carpetas en tu correo:',
      points: [
        'Spam o Correo no deseado.',
        'Promociones o Notificaciones (especialmente en Gmail).',
        'Una vez que completes todos los datos, presiona el botón "Crear Acta". ',
        'Utiliza la barra de búsqueda de tu correo y busca por el nombre del acta o por nuestra dirección de envío.',
      ],
    },
  },
  {
    id: 'item-14',
    question: '¿Desde qué dirección de correo se envía el acta?',
    answer: {
      intro:
        'El correo se envía desde nuestra dirección automatizada del sistema:',
      points: [
        'legal.universitas@gmail.com',
        'Te recomendamos agregar esta dirección a tus contactos para asegurar que nuestros correos siempre lleguen a tu bandeja principal.',
      ],
    },
  },
  {
    id: 'item-15',
    question:
      '¿Qué hago si he revisado todas las carpetas y sigo sin encontrar el correo?',
    answer: {
      intro:
        'Si después de unos 15 minutos y de revisar todas las carpetas el correo no ha llegado, por favor verifica dos cosas:',
      points: [
        'En el perfil de la app, asegúrate de que tu dirección de correo electrónico esté escrita correctamente.',
        'Intenta volver a generar el documento desde la app. Si el problema persiste, contáctanos a través del formulario en nuestra web.',
      ],
    },
  },
  {
    id: 'item-16',
    question: '¿En qué formato recibiré el documento?',
    answer:
      'Recibirás tu acta en formato Word, un estándar universal listo para ser impreso, guardado o compartido.',
  },
  {
    id: 'item-17',
    question:
      '¿Puedo solicitar que el acta se envíe a otra dirección de correo electrónico?',
    answer:
      'En la versión Express, para mantener la simplicidad, el acta siempre se envía a la dirección de correo del usuario registrado. La funcionalidad para enviar el documento a múltiples destinatarios o a correos de terceros es una ventaja de la Versión Pro, ideal para flujos de trabajo en equipo.Recibirás tu acta en formato Word, un estándar universal listo para sers impreso, guardado os compsrtido.',
  },
];

export default function FaqPage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Preguntas Frecuentes');
  }, [setTitle]);

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      {/* Se usa el componente Accordion para renderizar las preguntas */}
      <Accordion type='single' collapsible className='w-full space-y-4'>
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className='border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'
          >
            <AccordionTrigger className='text-left font-semibold px-6 py-4'>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className='px-6 pb-4 text-text-answer'>
              {typeof item.answer === 'string' ? (
                item.answer
              ) : (
                <>
                  <p className='mb-2'>{item.answer.intro}</p>
                  <ul className='list-disc pl-5'>
                    {item.answer.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {/* Botón flotante de WhatsApp */}
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
