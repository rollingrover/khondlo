import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PageHead from '@/components/PageHead';
import JsonLd from '@/components/JsonLd';
import { dims } from '@/lib/images';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { SITE_URL, whatsappLink } from '@/lib/site';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/shuttles', title: t('shuttlesTitle'), description: t('shuttlesDescription') });
}

const img = (src, alt, extra = {}) => (
  <Image src={src} alt={alt} {...dims(src)} className="photo photo--43" sizes="(min-width: 900px) 50vw, 100vw" {...extra} />
);

export default async function ShuttlesPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('shuttles');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');
  const tm = await getTranslations('meta');

  const airports = [
    ['kingShaka', 'kingShakaText'],
    ['richardsBay', 'richardsBayText'],
    ['orTambo', 'orTamboText'],
    ['airstrips', 'airstripsText'],
  ];
  const other = ['corporate', 'conference', 'events', 'vip', 'schools'];

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Airport shuttle and transfer service',
    name: t('pageTitle'),
    description: tm('shuttlesDescription'),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['Hluhluwe', 'St Lucia', 'Richards Bay', 'Durban', 'Johannesburg', 'KwaZulu-Natal'],
    url: absoluteUrl(locale, '/shuttles'),
  };

  return (
    <>
      <PageHead
        title={t('pageTitle')}
        text={t('pageText')}
        crumbs={[{ name: tc('breadcrumbHome'), href: '/' }, { name: tn('shuttles') }]}
      />

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>{t('airportsTitle')}</h2>
            <ul className="routes routes--light">
              {airports.map(([a, b]) => (
                <li key={a}><strong>{t(a)}</strong><span>{t(b)}</span></li>
              ))}
            </ul>
          </div>
          {img('/images/fleet/airport-pickup-branded-vans.webp', 'Guests loading luggage into Khondlo Tours shuttle vans at an airport', { priority: true })}
        </div>
      </section>

      <section className="section section--bush">
        <div className="wrap split">
          {img('/images/fleet/hotel-pickup-luggage.webp', 'Khondlo Tours shuttle loading luggage at a hotel entrance')}
          <div>
            <h2>{t('cruiseTitle')}</h2>
            <p className="lede">{t('cruiseText')}</p>
            <Link href="/contact?trip=shuttle" className="btn btn--sun">{t('quoteCta')}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>{t('otherTitle')}</h2>
            <ul className="values">
              {other.map((k) => <li key={k}>{t(k)}</li>)}
            </ul>
          </div>
          <div>
            <h2>{t('fleetTitle')}</h2>
            <p>{t('fleetText')}</p>
            <div className="collage" style={{ marginTop: '1.5rem' }}>
              <Image src="/images/fleet/vw-kombi-front.webp" alt="Khondlo Tours Volkswagen minibus" {...dims('/images/fleet/vw-kombi-front.webp')} sizes="(min-width: 900px) 28vw, 60vw" />
              <Image src="/images/fleet/suv-branded-transfer.webp" alt="Khondlo Tours branded SUV for private transfers" {...dims('/images/fleet/suv-branded-transfer.webp')} sizes="(min-width: 900px) 18vw, 40vw" />
              <Image src="/images/fleet/umhlanga-hotel-transfer.webp" alt="Executive sedan at a coastal hotel entrance" {...dims('/images/fleet/umhlanga-hotel-transfer.webp')} sizes="(min-width: 900px) 18vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap">
          <h2>{t('howTitle')}</h2>
          <ol className="route" style={{ maxWidth: '44rem' }}>
            {['how1', 'how2', 'how3'].map((k, i) => (
              <li key={k}>
                <span className="route__day" aria-hidden="true">{i + 1}</span>
                <p style={{ paddingTop: '.45rem' }}>{t(k)}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row">
            <Link href="/contact?trip=shuttle" className="btn btn--ink">{t('quoteCta')}</Link>
            <a href={whatsappLink('Hi Khondlo Tours, I need a shuttle quote.')} className="btn btn--sun" target="_blank" rel="noopener">{tc('whatsapp')}</a>
          </div>
        </div>
      </section>

      <JsonLd data={serviceLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: tc('breadcrumbHome'), url: absoluteUrl(locale) },
          { name: tn('shuttles'), url: absoluteUrl(locale, '/shuttles') },
        ])}
      />
    </>
  );
}
