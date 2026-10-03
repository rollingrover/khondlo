import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Trail from '@/components/Trail';
import TourMedia from '@/components/TourMedia';
import Price from '@/components/Price';
import { TOURS, fromPrice } from '@/lib/tours';
import { dims } from '@/lib/images';
import { BUSINESS, whatsappLink } from '@/lib/site';

const HERO = '/images/tours/zululand-sunrise-hero.webp';

export default async function HomePage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tt = await getTranslations('tours');
  const tc = await getTranslations('common');
  const ts = await getTranslations('shuttles');
  const tn = await getTranslations('nav');

  const [feature, ...rest] = TOURS.filter((x) => x.key !== 'mozambique');
  const moz = TOURS.find((x) => x.key === 'mozambique');

  return (
    <>
      <section className="hero">
        <Image
          src={HERO}
          alt="Sunrise over the Zululand coastal forest near Hluhluwe and St Lucia"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="hero__img"
        />
        <div className="wrap hero__content">
          <p className="hero__place">{t('heroPlace')}</p>
          <h1>{t('heroTitle')}</h1>
          <Trail draw id="hero-trail" />
          <p className="hero__text">{t('heroText')}</p>
          <div className="btn-row">
            <Link href="/tours" className="btn btn--sun">{t('heroCtaTours')}</Link>
            <Link href="/shuttles" className="btn btn--line">{t('heroCtaShuttle')}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--wide-media">
          <div>
            <h2>{t('introTitle')}</h2>
            <p className="lede">{t('introText')}</p>
            <ul className="points">
              <li>{t('introPoint1')}</li>
              <li>{t('introPoint2')}</li>
              <li>{t('introPoint3')}</li>
            </ul>
          </div>
          <div className="collage">
            <Image src="/images/tours/macabuzela-guide-selfie-path.webp" alt="Khondlo Tours guide leading guests along a grassy village path" {...dims('/images/tours/macabuzela-guide-selfie-path.webp')} sizes="(min-width: 900px) 33vw, 60vw" />
            <Image src="/images/tours/macabuzela-rondavel-traditional-items.webp" alt="Guide explaining traditional items inside a rondavel" {...dims('/images/tours/macabuzela-rondavel-traditional-items.webp')} sizes="(min-width: 900px) 22vw, 40vw" />
            <Image src="/images/tours/pineapple-farm-hluhluwe.webp" alt="Guests with fresh pineapples on a Hluhluwe farm" {...dims('/images/tours/pineapple-farm-hluhluwe.webp')} sizes="(min-width: 900px) 22vw, 40vw" />
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="tours-h">
        <div className="wrap">
          <h2 id="tours-h">{t('toursTitle')}</h2>
          <p className="lede" style={{ marginBottom: '3rem' }}>{t('toursText')}</p>

          <article className="tour-feature">
            <Link href={`/tours/${feature.slug}`} tabIndex={-1} aria-hidden="true">
              <TourMedia tour={feature} alt={tt(`${feature.key}.name`)} className="tour-feature__img" sizes="(min-width: 900px) 58vw, 100vw" />
            </Link>
            <div>
              <p className="tour-cat">{tt(feature.category)}</p>
              <h3 style={{ fontSize: 'var(--step-3)' }}>{tt(`${feature.key}.name`)}</h3>
              <p>{tt(`${feature.key}.short`)}</p>
              <div className="tour-meta">
                <span>{tt(`${feature.key}.duration`)}</span>
                <Price value={fromPrice(feature)} from t={tc} />
              </div>
              <Link href={`/tours/${feature.slug}`} className="btn btn--ink">{tc('viewTour')}</Link>
            </div>
          </article>

          <ul className="tour-list">
            {rest.map((tour) => (
              <li key={tour.slug} className="tour-row">
                <Link href={`/tours/${tour.slug}`}>
                  <TourMedia tour={tour} alt={tt(`${tour.key}.name`)} className="tour-row__img" sizes="(min-width: 760px) 176px, 104px" />
                  <div>
                    <p className="tour-cat">{tt(tour.category)}</p>
                    <h3>{tt(`${tour.key}.name`)}</h3>
                    <p>{tt(`${tour.key}.short`)}</p>
                  </div>
                  <div className="tour-row__price">
                    <Price value={fromPrice(tour)} from={tour.options.length > 1} t={tc} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '2rem' }}><Link href="/tours" className="textlink">{tc('allTours')}</Link></p>
        </div>
      </section>

      <section className="section section--bush">
        <div className="wrap split">
          <div>
            <h2>{t('shuttleTitle')}</h2>
            <p className="lede">{t('shuttleText')}</p>
            <ul className="routes">
              <li><strong>King Shaka</strong><span>{ts('kingShakaText')}</span></li>
              <li><strong>Richards Bay</strong><span>{ts('richardsBayText')}</span></li>
              <li><strong>OR Tambo</strong><span>{ts('orTamboText')}</span></li>
            </ul>
            <Link href="/shuttles" className="btn btn--sun">{t('shuttleCta')}</Link>
          </div>
          <Image
            src="/images/fleet/airstrip-transfer-minibus-trailer.webp"
            alt="Khondlo Tours minibus with luggage trailer meeting a light aircraft on an airstrip"
            {...dims('/images/fleet/airstrip-transfer-minibus-trailer.webp')}
            className="photo photo--43"
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        </div>
      </section>

      <section className="section" aria-labelledby="moz-h">
        <div className="wrap split">
          <TourMedia tour={moz} alt={tt('mozambique.name')} />
          <div>
            <p className="tour-cat">{tt('categoryMultiDay')}</p>
            <h2 id="moz-h">{t('mozTitle')}</h2>
            <p className="lede">{t('mozText')}</p>
            <div className="tour-meta">
              <span>{tt('mozambique.duration')}</span>
              <Price value={fromPrice(moz)} unit="perPersonSharing" t={tc} />
            </div>
            <Link href={`/tours/${moz.slug}`} className="btn btn--ink">{t('mozCta')}</Link>
          </div>
        </div>
      </section>

      <section className="section section--earth">
        <div className="wrap split split--wide-media">
          <div>
            <h2>{t('communityTitle')}</h2>
            <p className="lede">{t('communityText')}</p>
            <Link href="/about" className="btn btn--line">{t('communityCta')}</Link>
          </div>
          <div className="collage">
            <Image src="/images/community/school-visit-guests-learners.webp" alt="Guest with two learners at a local school" {...dims('/images/community/school-visit-guests-learners.webp')} sizes="(min-width: 900px) 33vw, 60vw" />
            <Image src="/images/community/children-welcome-group.webp" alt="Children meeting a tour group next to a Khondlo Tours minibus" {...dims('/images/community/children-welcome-group.webp')} sizes="(min-width: 900px) 22vw, 40vw" />
            <Image src="/images/tours/macabuzela-village-welcome.webp" alt="Village host welcoming guests at a homestead" {...dims('/images/tours/macabuzela-village-welcome.webp')} sizes="(min-width: 900px) 22vw, 40vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta">
          <div>
            <h2>{t('ctaTitle')}</h2>
            <p className="lede">{t('ctaText')}</p>
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--ink">{tn('book')}</Link>
            <a href={whatsappLink()} className="btn btn--sun" target="_blank" rel="noopener">{tc('whatsapp')}</a>
            <a href={`tel:${BUSINESS.phoneIntl}`} className="btn btn--line">{tc('call')}</a>
          </div>
        </div>
      </section>
    </>
  );
}
