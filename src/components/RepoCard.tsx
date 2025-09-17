import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RepoCardProps {
  imageUrl: string;
  description: string;
  buttonText: string;
  linkHref: string;
  isGratis?: boolean;
}

export function RepoCard({
  imageUrl,
  description,
  buttonText,
  linkHref,
  isGratis = false,
}: RepoCardProps) {
  return (
    <Card className='bg-white flex flex-col overflow-hidden rounded-xl border-gray-200 shadow-md transition-all hover:shadow-lg p-4'>
      {/* Reemplazamos las alturas variables por una proporción fija de video (16:9) */}
      <div className='relative w-full aspect-video mb-4'>
        {isGratis && (
          <div className='absolute top-3 right-3 z-10 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-md'>
            GRATIS
          </div>
        )}
        <Image
          src={imageUrl}
          alt={buttonText}
          fill // Propiedad moderna para rellenar el contenedor
          className='rounded-xl object-cover' // object-cover asegura que la imagen cubra el espacio sin deformarse
        />
      </div>

      <div className='w-full h-[2px] bg-primary-blue mb-4 rounded-full' />

      <CardContent className='flex flex-1 flex-col p-0'>
        <p className='flex-grow text-sm text-gray-600 text-center'>
          {description}
        </p>
        <div className='mt-4 flex justify-center pt-2'>
          <Button
            asChild
            className='bg-button-gold hover:bg-button-gold/90 text-primary-blue font-semibold w-full max-w-[200px] text-base h-11'
          >
            <a href={linkHref} target='_blank' rel='noopener noreferrer'>
              {buttonText}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
