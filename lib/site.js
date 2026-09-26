// Single source of truth for business details. Update here, not in components.
export const SITE_URL = 'https://www.khondlotours.co.za';

export const BUSINESS = {
  name: 'Khondlo Tours',
  legalName: 'Khondlo Tours (Pty) Ltd',
  registration: '2016/309712/07',
  foundingYear: '2016',
  phoneDisplay: '+27 82 663 6092',
  phoneIntl: '+27826636092',
  whatsapp: '27826636092',
  email: 'khondlotours@gmail.com',
  street: 'Engonyamaneni Area',
  postal: 'P.O. Box 310',
  city: 'Hluhluwe',
  postalCode: '3960',
  region: 'KwaZulu-Natal',
  country: 'ZA',
  logo: '/images/brand/khondlo-logo-720.png',
  ogImage: '/images/og/khondlo-og-default.jpg',
  social: {
    // Add real profile URLs when available; empty entries are skipped.
    facebook: '',
    instagram: '',
    tripadvisor: '',
  },
};

export const LOCALE_LABELS = {
  en: { label: 'English', flag: '🇬🇧', og: 'en_ZA' },
  zu: { label: 'isiZulu', flag: '🇿🇦', og: 'zu_ZA' },
  de: { label: 'Deutsch', flag: '🇩🇪', og: 'de_DE' },
  nl: { label: 'Nederlands', flag: '🇳🇱', og: 'nl_NL' },
  fr: { label: 'Français', flag: '🇫🇷', og: 'fr_FR' },
  it: { label: 'Italiano', flag: '🇮🇹', og: 'it_IT' },
  es: { label: 'Español', flag: '🇪🇸', og: 'es_ES' },
  pt: { label: 'Português', flag: '🇵🇹', og: 'pt_PT' },
  ru: { label: 'Русский', flag: '🇷🇺', og: 'ru_RU' },
  zh: { label: '中文', flag: '🇨🇳', og: 'zh_CN' },
  hi: { label: 'हिन्दी', flag: '🇮🇳', og: 'hi_IN' },
};

export function whatsappLink(text) {
  const base = `https://wa.me/${BUSINESS.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function formatRand(n) {
  return 'R' + n.toLocaleString('en-ZA').replace(/,/g, ' ');
}
