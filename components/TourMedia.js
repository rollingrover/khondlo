import Image from 'next/image';
import TourArt from './TourArt';
import { dims } from '@/lib/images';

export default function TourMedia({ tour, alt, className, sizes, priority = false }) {
  if (!tour.image) return <TourArt scene={tour.art} label={alt} className={`art ${className || ''}`} />;
  return (
    <Image
      src={tour.image}
      alt={alt}
      {...dims(tour.image)}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
