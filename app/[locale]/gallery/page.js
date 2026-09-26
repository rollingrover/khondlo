import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHead from '@/components/PageHead';
import PhotoGallery from '@/components/PhotoGallery';
import JsonLd from '@/components/JsonLd';
import { GALLERY, VIDEOS, dims } from '@/lib/images';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/gallery', title: t('galleryTitle'), description: t('galleryDescription') });
}

export default async function GalleryPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('gallery');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');

  const photos = GALLERY.map(([src, alt]) => ({ src, alt, ...dims(src) }));

  const videoLd = VIDEOS.map((v) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: t(v.key),
    description: `${t(v.key)} — Khondlo Tours, Hluhluwe`,
    thumbnailUrl: SITE_URL + v.poster,
    contentUrl: SITE_URL + v.src,
    uploadDate: '2026-09-25',
  }));

  return (
    <>
      <PageHead
        title={t('pageTitle')}
        text={t('pageText')}
        crumbs={[{ name: tc('breadcrumbHome'), href: '/' }, { name: tn('gallery') }]}
      />
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="wrap">
          <h2 style={{ fontSize: 'var(--step-3)' }}>{t('photos')}</h2>
          <PhotoGallery photos={photos} />
        </div>
      </section>
      <section className="section section--mist">
        <div className="wrap">
          <h2 style={{ fontSize: 'var(--step-3)' }}>{t('videos')}</h2>
          <div className="videos">
            {VIDEOS.map((v) => (
              <figure key={v.src}>
                <video controls preload="none" playsInline poster={v.poster} width={v.w} height={v.h}>
                  <source src={v.src} type="video/mp4" />
                </video>
                <figcaption>{t(v.key)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      {videoLd.map((d, i) => <JsonLd key={i} data={d} />)}
      <JsonLd
        data={breadcrumbLd([
          { name: tc('breadcrumbHome'), url: absoluteUrl(locale) },
          { name: tn('gallery'), url: absoluteUrl(locale, '/gallery') },
        ])}
      />
    </>
  );
}
