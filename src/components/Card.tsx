'use client';

import { useRouter } from 'next/navigation';
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  hashtag: string;
  href: string;
  pro?: boolean;
  gratis?: boolean;
}

function CardComponent({
  icon,
  title,
  description,
  hashtag,
  href,
  pro = false,
  gratis = false,
}: CardProps) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(href);
  };

  const cardClasses =
    'bg-white rounded-2xl border border-gray-200 hover:shadow-blue-soft hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full max-w-sm h-64 flex flex-col';

  return (
    <ShadcnCard className={cardClasses} onClick={handleNavigation}>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-[#001A70] shadow-lg'>
            {icon}
          </div>
          <div className='flex items-center gap-2'>
            {pro && (
              <div className='rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-md'>
                PRO
              </div>
            )}
            {gratis && (
              <div className='rounded-full bg-badge-gold px-3 py-1 text-xs font-bold text-black shadow-md'>
                Express
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col justify-between flex-1'>
        <div>
          <CardTitle className='mb-1 text-xl font-bold'>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className='border-t pt-2'>
          <p className='text-xs font-semibold text-[#001A70]'>{hashtag}</p>
        </div>
      </CardContent>
    </ShadcnCard>
  );
}

// Se añade la exportación por defecto
export default CardComponent;
