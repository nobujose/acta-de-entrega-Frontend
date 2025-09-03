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
import { MessageCircle } from 'lucide-react';

// 1. Definimos los datos para las preguntas y respuestas
const faqData = [
  {
    id: 'item-1',
    question: '¿Qué es Actas de Entrega Express?',
    answer:
      'Actas de Entrega Express es una plataforma en línea diseñada para facilitar la gestión de actas de entrega. Permite a los usuarios crear, almacenar y compartir documentos de entrega de forma segura y eficiente, optimizando los procesos administrativos y mejorando la trazabilidad de los envíos.',
  },
  {
    id: 'item-2',
    question: '¿Cómo funciona el proceso de creación de actas?',
    answer:
      'El proceso es simple. Primero, seleccionas el tipo de acta que necesitas (Entrante, Saliente o Máxima Autoridad). Luego, completas los campos del formulario guiado paso a paso. Finalmente, puedes generar y descargar tu acta en formato PDF.',
  },
  {
    id: 'item-3',
    question: '¿Qué tipos de documentos puedo generar?',
    answer:
      'Actualmente, puedes generar tres tipos de actas de entrega: para Servidores Públicos Salientes, para Servidores Públicos Entrantes y el acta especial para la Máxima Autoridad de un organismo.',
  },
  {
    id: 'item-4',
    question: '¿Es seguro utilizar Actas de Entrega Express?',
    answer:
      'Sí, la seguridad es nuestra máxima prioridad. Todos los datos se manejan de forma encriptada y se almacenan de forma segura, cumpliendo con los estándares de protección de datos para garantizar la confidencialidad y la integridad de tu información.',
  },
  {
    id: 'item-5',
    question: '¿Cómo puedo contactar con soporte técnico?',
    answer:
      'Si tienes algún problema o consulta, puedes contactar a nuestro equipo de soporte técnico a través del correo electrónico soporte@universitaslegal.com o utilizando el chat de soporte en vivo disponible en la esquina inferior derecha de la pantalla.',
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
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        asChild
        className='fixed bottom-8 right-8 h-16 w-16 rounded-full bg-blue-500 shadow-lg hover:bg-blue-600'
      >
        {/* Reemplaza '#' con tu enlace de WhatsApp real */}
        <a
          href='https://wa.me/TUNUMERO'
          target='_blank'
          rel='noopener noreferrer'
        >
          <MessageCircle className='h-8 w-8 text-white' />
        </a>
      </Button>
    </div>
  );
}
