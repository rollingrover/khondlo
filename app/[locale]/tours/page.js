import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import PageHead from '@/components/PageHead';
import TourMedia from '@/components/TourMedia';
import Price from '@/components/Price';
import JsonLd from '@/components/JsonLd';
import { TOURS, fromPrice } from '@/lib/tours';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd } from '@/lib/jsonld';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ locale, path: '/tours', title: t('toursTitle'), description: t('toursDescription') });
}

const GROUPS = ['categoryCulture', 'categoryWildlife', 'categoryMultiDay'];

export default async function ToursPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('tours');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: TOURS.map((tour, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(locale, `/tours/${tour.slug}`),
      name: t(`${tour.key}.name`),
    })),
  };

  return (
    <>
      <PageHead
        title={t('pageTitle')}
        text={t('pageText')}
        crumbs={[{ name: tc('breadcrumbHome'), href: '/' }, { name: tn('tours') }]}
      />
      {GROUPS.map((group) => {
        const list = TOURS.filter((x) => x.category === group);
        return (
          <section key={group} className="section" style={{ paddingBlock: 'clamp(2.5rem, 5vw, 4rem)' }} aria-labelledby={group}>
            <div className="wrap">
              <h2 id={group} style={{ fontSize: 'var(--step-3)' }}>{t(group)}</h2>
              <ul className="tour-list">
                {list.map((tour) => (
                  <li key={tour.slug} className="tour-row">
                    <Link href={`/tours/${tour.slug}`}>
                      <TourMedia tour={tour} alt={t(`${tour.key}.name`)} className="tour-row__img" sizes="(min-width: 760px) 176px, 104px" />
                      <div>
                        <h3>{t(`${tour.key}.name`)}</h3>
                        <p>{t(`${tour.key}.short`)}</p>
                        <p className="muted" style={{ marginTop: '.4rem' }}>{tc('duration')}: {t(`${tour.key}.duration`)}</p>
                      </div>
                      <div className="tour-row__price">
                        <Price value={fromPrice(tour)} from={tour.options.length > 1} t={tc} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
      <div className="wrap" style={{ paddingBottom: 'var(--space-section)' }}>
        <p className="muted">{tc('priceNote')}</p>
      </div>
      <JsonLd data={itemList} />
      <JsonLd
        data={breadcrumbLd([
          { name: tc('breadcrumbHome'), url: absoluteUrl(locale) },
          { name: tn('tours'), url: absoluteUrl(locale, '/tours') },
        ])}
      />
    </>
  );
}
