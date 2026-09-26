import { getTranslations, setRequestLocale } from 'next-intl/server';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';
import { BUSINESS, whatsappLink } from '@/lib/site';
import { Suspense } from 'react';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/contact', title: t('contactTitle'), description: t('contactDescription') });
}

export default async function ContactPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');


  return (
    <>
      <PageHead
        title={t('pageTitle')}
        text={t('pageText')}
        crumbs={[{ name: tc('breadcrumbHome'), href: '/' }, { name: tn('contact') }]}
      />
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="wrap tour-layout">
          <div>
            <h2 style={{ fontSize: 'var(--step-3)' }}>{t('formTitle')}</h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="booking-box">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('detailsTitle')}</h2>
            <ul className="contact-list">
              <li>
                <span className="k">{t('phone')}</span><br />
                <a href={`tel:${BUSINESS.phoneIntl}`}>{BUSINESS.phoneDisplay}</a>
              </li>
              <li>
                <span className="k">{t('emailLabel')}</span><br />
                <a href={`mailto:${BUSINESS.email}`} style={{ fontSize: 'var(--step-0)' }}>{BUSINESS.email}</a>
              </li>
              <li>
                <span className="k">{t('addressLabel')}</span><br />
                {t('address')}<br />
                {t('postal')}
              </li>
            </ul>
            <p className="muted" style={{ marginTop: '1.25rem' }}>{t('hours')}</p>
            <a href={whatsappLink('Hi Khondlo Tours, I would like to ask about a trip.')} className="btn btn--sun" target="_blank" rel="noopener">{tc('whatsapp')}</a>
          </aside>
        </div>
      </section>
      <JsonLd
        data={breadcrumbLd([
          { name: tc('breadcrumbHome'), url: absoluteUrl(locale) },
          { name: tn('contact'), url: absoluteUrl(locale, '/contact') },
        ])}
      />
    </>
  );
}
