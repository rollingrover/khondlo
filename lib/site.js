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
  email: 'info@khondlotours.co.za',
  street: 'Engonyamaneni Area',
  postal: 'P.O. Box 310',
  city: 'Hluhluwe',
  postalCode: '3960',
  region: 'KwaZulu-Natal',
  country: 'ZA',
  logo: '/images/brand/khondlo-logo-720.png',
  ogImage: '/images/og/khondlo-og-default.jpg',
  social: {
    facebook: 'https://www.facebook.com/KhondloTours',
    instagram: 'https://www.instagram.com/khondlotours/',
    tiktok: 'https://www.tiktok.com/@khondlo.tours',
    tripadvisor: '', // add when available; empty entries are skipped
  },
};

// Partner organisations shown in the footer. Names are proper nouns, not translated.
export const PARTNERS = [
  { name: 'Diza Kwa-Smolo Community Uplifting Initiative', url: 'https://www.dizakwasmolo.co.za/' },
  { name: 'Diza Travels', url: 'https://www.dizatravels.co.za/' },
  { name: 'Zatours', url: 'https://zatours.co.za/' },
  { name: 'Mzamo Cultural Village & Homestead', url: 'https://www.mzamovillagehomestead.co.za/' },
  { name: 'eThlathini Rest Camp', url: 'https://www.ethlathini.co.za/' },
  { name: 'OpDesk', url: 'https://www.opdesk.app/' },
];

export const DESIGNER = { name: 'RollingRover Productions', url: 'https://rollingrover.co.za/' };

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
