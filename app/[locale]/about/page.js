import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PageHead from '@/components/PageHead';
import JsonLd from '@/components/JsonLd';
import { dims } from '@/lib/images';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { BUSINESS } from '@/lib/site';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/about', title: t('aboutTitle'), description: t('aboutDescription') });
}

export default async function AboutPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');

  return (
    <>
      <PageHead
        title={t('pageTitle')}
        text={t('pageText')}
        crumbs={[{ name: tc('breadcrumbHome'), href: '/' }, { name: tn('about') }]}
      />

      <section className="section">
        <div className="wrap split">
          <Image src="/images/community/guide-with-guests.webp" alt="Khondlo Tours guide with guests at the start of a tour" {...dims('/images/community/guide-with-guests.webp')} className="photo photo--43" sizes="(min-width: 900px) 50vw, 100vw" priority />
          <div>
            <h2>{t('visionTitle')}</h2>
            <p className="lede">{t('vision')}</p>
            <h2 style={{ marginTop: '2rem' }}>{t('missionTitle')}</h2>
            <p className="lede">{t('mission')}</p>
          </div>
        </div>
      </section>

      <section className="section section--mist">
        <div className="wrap">
          <h2>{t('valuesTitle')}</h2>
          <ul className="values">
            {['v1', 'v2', 'v3', 'v4', 'v5', 'v6'].map((k) => <li key={k}>{t(k)}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section--earth">
        <div className="wrap split split--wide-media">
          <div>
            <h2>{t('communityTitle')}</h2>
            <p className="lede">{t('communityText')}</p>
            <h3 style={{ marginTop: '2rem' }}>{t('whoTitle')}</h3>
            <p>{t('whoText')}</p>
          </div>
          <div className="collage">
            <Image src="/images/community/school-visit-hall.webp" alt="Guests visiting learners in a school hall" {...dims('/images/community/school-visit-hall.webp')} sizes="(min-width: 900px) 33vw, 60vw" />
            <Image src="/images/community/school-courtyard-guests.webp" alt="Tour group in a school courtyard" {...dims('/images/community/school-courtyard-guests.webp')} sizes="(min-width: 900px) 22vw, 40vw" />
            <Image src="/images/community/village-gathering-guests.webp" alt="Guests gathered with the guide in the village" {...dims('/images/community/village-gathering-guests.webp')} sizes="(min-width: 900px) 22vw, 40vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>{t('expoTitle')}</h2>
            <p className="lede">{t('expoText')}</p>
            <p className="muted">{t('regLabel')}: {BUSINESS.legalName}, {BUSINESS.registration}</p>
            <Link href="/contact" className="btn btn--ink" style={{ marginTop: '1rem' }}>{tc('enquire')}</Link>
          </div>
          <Image src="/images/community/tourism-expo-stand.webp" alt="Khondlo Tours stand at a tourism expo" {...dims('/images/community/tourism-expo-stand.webp')} className="photo photo--tall" sizes="(min-width: 900px) 40vw, 100vw" style={{ maxWidth: '28rem' }} />
        </div>
      </section>

      <JsonLd
        data={breadcrumbLd([
          { name: tc('breadcrumbHome'), url: absoluteUrl(locale) },
          { name: tn('about'), url: absoluteUrl(locale, '/about') },
        ])}
      />
    </>
  );
}
