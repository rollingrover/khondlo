import { routing } from '@/i18n/routing';
import { TOURS } from '@/lib/tours';
import { absoluteUrl } from '@/lib/seo';

const PAGES = [
  ['', 1.0, 'weekly'],
  ['/tours', 0.9, 'weekly'],
  ['/shuttles', 0.9, 'monthly'],
  ['/about', 0.6, 'yearly'],
  ['/gallery', 0.5, 'monthly'],
  ['/contact', 0.7, 'yearly'],
  ...TOURS.map((t) => [`/tours/${t.slug}`, 0.8, 'monthly']),
];

export default function sitemap() {
  const lastModified = new Date();
  return PAGES.flatMap(([path, priority, changeFrequency]) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
      },
    }))
  );
}
