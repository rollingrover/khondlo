import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BUSINESS, whatsappLink } from '@/lib/site';
import { TOURS } from '@/lib/tours';

export default async function Footer() {
  const t = await getTranslations('footer');
  const n = await getTranslations('nav');
  const tt = await getTranslations('tours');
  const c = await getTranslations('contact');
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Link href="/" className="footer__logo">
              <Image src={BUSINESS.logo} alt="Khondlo Tours" width={720} height={376} sizes="150px" />
            </Link>
            <p>{t('tagline')}</p>
          </div>
          <div>
            <h2>{t('explore')}</h2>
            <ul>
              <li><Link href="/tours">{n('tours')}</Link></li>
              <li><Link href="/shuttles">{n('shuttles')}</Link></li>
              <li><Link href="/about">{n('about')}</Link></li>
              <li><Link href="/gallery">{n('gallery')}</Link></li>
              <li><Link href="/contact">{n('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{t('toursCol')}</h2>
            <ul>
              {TOURS.map((tour) => (
                <li key={tour.slug}>
                  <Link href={`/tours/${tour.slug}`}>{tt(`${tour.key}.name`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t('contactCol')}</h2>
            <ul>
              <li><a href={`tel:${BUSINESS.phoneIntl}`}>{BUSINESS.phoneDisplay}</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
              <li>{c('address')}</li>
              <li>{BUSINESS.postal}, {BUSINESS.city} {BUSINESS.postalCode}</li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span>© {year} {BUSINESS.legalName}. {t('rights')}</span>
          <span>Reg. {BUSINESS.registration}</span>
        </div>
      </div>
    </footer>
  );
}
