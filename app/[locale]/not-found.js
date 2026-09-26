import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Trail from '@/components/Trail';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <section className="section">
      <div className="wrap">
        <h1>{t('title')}</h1>
        <Trail tone="earth" />
        <p className="lede">{t('text')}</p>
        <Link href="/" className="btn btn--ink">{t('home')}</Link>
      </div>
    </section>
  );
}
