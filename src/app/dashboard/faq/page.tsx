// src/app/dashboard/faq/page.tsx
'use client';

import { useEffect } from 'react';
import { useHeader } from '@/context/HeaderContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { FaWhatsappSquare } from 'react-icons/fa';

// 1. Definimos los datos para las preguntas y respuestas
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
];

export default function FaqPage() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle('Preguntas Frecuentes');
  }, [setTitle]);

  return (
    <div className='w-full max-w-4xl mx-auto'>
      {/* 2. Usamos el componente Accordion para renderizar las preguntas */}
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

      <Button
        asChild
        className='fixed bottom-8 right-8 h-16 w-16 rounded-full bg-green-500 shadow-lg hover:bg-green-600'
      >
        {/* Reemplaza '#' con tu enlace de WhatsApp real */}
        <a
          href='https://wa.me/TUNUMERO'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaWhatsappSquare className='h-10 w-10' />
        </a>
      </Button>
    </div>
  );
}
