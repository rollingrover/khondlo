import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { display, body } from '../fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import JsonLd from '@/components/JsonLd';
import { organizationLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: t('siteName'),
    formatDetection: { telephone: true },
    ...buildMetadata({ locale, title: t('homeTitle'), description: t('homeDescription') }),
  };
}

export const viewport = { themeColor: '#1f3a1a', width: 'device-width', initialScale: 1 };

// Only the namespaces client components need are sent to the browser.
const CLIENT_NAMESPACES = ['nav', 'contact', 'gallery'];

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((k) => [k, messages[k]]));
  const tMeta = await getTranslations('meta');
  const tNav = await getTranslations('nav');
  const tCommon = await getTranslations('common');

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip">{tNav('skip')}</a>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <WhatsAppFloat label={tCommon('whatsapp')} />
        <JsonLd data={organizationLd(locale, tMeta('homeDescription'))} />
      </body>
    </html>
  );
}
