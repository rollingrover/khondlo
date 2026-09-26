'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

const LINKS = [
  ['/tours', 'tours'],
  ['/shuttles', 'shuttles'],
  ['/about', 'about'],
  ['/gallery', 'gallery'],
  ['/contact', 'contact'],
];

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="wrap header__bar">
        <Link href="/" className="header__logo" aria-label="Khondlo Tours">
          <Image src="/images/brand/khondlo-logo-720.png" alt="Khondlo Tours" width={720} height={376} priority sizes="150px" />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? t('close') : t('menu')}
        </button>
        <nav id="site-nav" className="nav" data-open={open} aria-label="Main">
          <ul className="nav__list">
            {LINKS.map(([href, key]) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link href={href} className="nav__link" aria-current={active ? 'page' : undefined}>
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="nav__tools">
            <LanguageSwitcher />
            <Link href="/contact" className="btn btn--sun">{t('book')}</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
