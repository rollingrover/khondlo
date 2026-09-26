import { SITE_URL, BUSINESS, LOCALE_LABELS } from './site';
import { routing } from '@/i18n/routing';

// Path for a locale with as-needed prefixing: English has no prefix.
export function localePath(locale, path = '') {
  const clean = path === '/' ? '' : path;
  return locale === routing.defaultLocale ? clean || '/' : `/${locale}${clean}`;
}

export function absoluteUrl(locale, path = '') {
  const p = localePath(locale, path);
  return SITE_URL + (p === '/' ? '' : p);
}

export function alternates(locale, path = '') {
  const languages = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, path);
  languages['x-default'] = absoluteUrl(routing.defaultLocale, path);
  return { canonical: absoluteUrl(locale, path), languages };
}

export function buildMetadata({ locale, path = '', title, description, image }) {
  const img = image || BUSINESS.ogImage;
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: BUSINESS.name,
      title,
      description,
      url: absoluteUrl(locale, path),
      locale: LOCALE_LABELS[locale]?.og,
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}
