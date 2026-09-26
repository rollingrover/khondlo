'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { usePathname, useRouter, routing } from '@/i18n/routing';
import { LOCALE_LABELS } from '@/lib/site';

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  function onChange(e) {
    const next = e.target.value;
    startTransition(() => {
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <div className="lang">
      <label htmlFor="lang-select" className="visually-hidden">{t('language')}</label>
      <select id="lang-select" value={locale} onChange={onChange} disabled={pending}>
        {routing.locales.map((l) => (
          <option key={l} value={l} lang={l}>
            {LOCALE_LABELS[l].flag} {LOCALE_LABELS[l].label}
          </option>
        ))}
      </select>
    </div>
  );
}
