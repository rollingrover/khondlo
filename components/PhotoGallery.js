'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PhotoGallery({ photos }) {
  const t = useTranslations('gallery');
  const [index, setIndex] = useState(null);
  const closeRef = useRef(null);
  const lastTrigger = useRef(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, close, step]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setIndex(i);
            }}
          >
            <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1100px) 360px, (min-width: 700px) 45vw, 100vw" />
          </button>
        ))}
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt} onClick={(e) => e.target === e.currentTarget && close()}>
          <figure style={{ margin: 0 }}>
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="100vw" />
            <figcaption>{current.alt}</figcaption>
          </figure>
          <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={close}>{t('close')}</button>
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label={t('prev')}>‹</button>
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label={t('next')}>›</button>
        </div>
      )}
    </>
  );
}
