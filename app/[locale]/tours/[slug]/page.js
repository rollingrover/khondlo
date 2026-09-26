import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import PageHead from '@/components/PageHead';
import TourMedia from '@/components/TourMedia';
import JsonLd from '@/components/JsonLd';
import { TOURS, getTour } from '@/lib/tours';
import { dims } from '@/lib/images';
import { buildMetadata, absoluteUrl } from '@/lib/seo';
import { breadcrumbLd, tourLd } from '@/lib/jsonld';
import { BUSINESS, formatRand, whatsappLink } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => TOURS.map((t) => ({ locale, slug: t.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params: { locale, slug } }) {
  const tour = getTour(slug);
  if (!tour) return {};
  const t = await getTranslations({ locale, namespace: 'tours' });
  const tm = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    path: `/tours/${slug}`,
    title: `${t(`${tour.key}.name`)} | ${tm('siteName')}`,
    description: t(`${tour.key}.short`),
    image: tour.image || undefined,
  });
}

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

export default async function TourPage({ params: { locale, slug } }) {
  const tour = getTour(slug);
  if (!tour) notFound();
  setRequestLocale(locale);

  const t = await getTranslations('tours');
  const tc = await getTranslations('common');
  const tn = await getTranslations('nav');
  const k = (s) => t(`${tour.key}.${s}`);
  const name = k('name');
  const optionNames = Object.fromEntries(tour.options.map((o) => [o.key, k(o.key)]));

  return (
    <>
      <PageHead
        title={name}
        text={k('short')}
        crumbs={[
          { name: tc('breadcrumbHome'), href: '/' },
          { name: tn('tours'), href: '/tours' },
          { name },
        ]}
      />

      <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3.5rem)' }}>
        <div className="wrap tour-layout">
          <div>
            <TourMedia tour={tour} alt={name} className="photo photo--43" sizes="(min-width: 960px) 62vw, 100vw" priority />
            <p className="lede" style={{ marginTop: '2rem' }}>{k('intro')}</p>

            {tour.highlights > 0 && (
              <>
                <h2 style={{ fontSize: 'var(--step-3)', marginTop: '2.5rem' }}>{t('highlightsTitle')}</h2>
                <ul className="points">
                  {range(tour.highlights).map((i) => <li key={i}>{k(`h${i}`)}</li>)}
                </ul>
              </>
            )}

            {tour.days && (
              <>
                <h2 style={{ fontSize: 'var(--step-3)', marginTop: '2.5rem' }}>{t('itineraryTitle')}</h2>
                <ol className="route">
                  {range(tour.days).map((d) => (
                    <li key={d}>
                      <span className="route__day" aria-hidden="true">{d}</span>
                      <h3>{k(`d${d}Title`)}</h3>
                      <p>{k(`d${d}`)}</p>
                    </li>
                  ))}
                </ol>
                <div className="cols" style={{ marginTop: '1rem' }}>
                  <div>
                    <h3>{tc('includes')}</h3>
                    <ul className="points">{range(tour.includes).map((i) => <li key={i}>{k(`inc${i}`)}</li>)}</ul>
                  </div>
                  <div>
                    <h3>{tc('excludes')}</h3>
                    <ul className="points">{range(tour.excludes).map((i) => <li key={i}>{k(`exc${i}`)}</li>)}</ul>
                  </div>
                </div>
              </>
            )}

            <h2 style={{ fontSize: 'var(--step-3)', marginTop: '2.5rem' }}>{t('goodToKnow')}</h2>
            <p>{k('know')}</p>

            {tour.video && (
              <video
                controls
                preload="none"
                playsInline
                poster={tour.videoPoster}
                width="832"
                height="464"
                style={{ width: '100%', borderRadius: 'var(--radius)', marginTop: '2rem', background: '#000' }}
              >
                <source src={tour.video} type="video/mp4" />
              </video>
            )}

            {tour.gallery.length > 0 && (
              <div className="thumbs">
                {tour.gallery.map((src) => (
                  <Image key={src} src={src} alt="" {...dims(src)} sizes="(min-width: 960px) 14vw, 45vw" />
                ))}
              </div>
            )}
            {!tour.image && <p className="muted" style={{ marginTop: '1rem' }}>{tc('photoSoon')}</p>}
          </div>

          <aside className="booking-box" aria-labelledby="options-h">
            <h2 id="options-h" style={{ fontSize: 'var(--step-2)' }}>{t('optionsTitle')}</h2>
            <p className="muted" style={{ margin: 0 }}>{tc('duration')}: {k('duration')}</p>
            <table className="options">
              <tbody>
                {tour.options.map((o) => (
                  <tr key={o.key}>
                    <th scope="row" style={{ fontWeight: 400 }}>
                      {optionNames[o.key]}
                      {o.unit && <span className="muted" style={{ display: 'block' }}>{tc(o.unit)}</span>}
                    </th>
                    <td>{o.price ? formatRand(o.price) : tc('onRequest')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted">{tc('priceNote')}</p>
            <Link href={`/contact?trip=${tour.slug}`} className="btn btn--ink">{tc('enquire')}</Link>
            <a
              className="btn btn--sun"
              href={whatsappLink(`Hi Khondlo Tours, I would like to ask about: ${name}`)}
              target="_blank"
              rel="noopener"
            >
              {tc('whatsapp')}
            </a>
            <a className="btn btn--line" href={`tel:${BUSINESS.phoneIntl}`}>{tc('call')}</a>
          </aside>
        </div>
      </section>

      <JsonLd data={tourLd({ locale, tour, name, description: k('intro'), optionNames })} />
      <JsonLd
        data={breadcrumbLd([
          { name: tc('breadcrumbHome'), url: absoluteUrl(locale) },
          { name: tn('tours'), url: absoluteUrl(locale, '/tours') },
          { name, url: absoluteUrl(locale, `/tours/${tour.slug}`) },
        ])}
      />
    </>
  );
}
