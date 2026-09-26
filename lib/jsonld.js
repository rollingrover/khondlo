import { SITE_URL, BUSINESS } from './site';
import { absoluteUrl } from './seo';

export function organizationLd(locale, description) {
  const sameAs = Object.values(BUSINESS.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: absoluteUrl(locale),
    logo: SITE_URL + BUSINESS.logo,
    image: SITE_URL + BUSINESS.ogImage,
    description,
    telephone: BUSINESS.phoneIntl,
    email: BUSINESS.email,
    foundingDate: BUSINESS.foundingYear,
    priceRange: 'R300 – R6900',
    currenciesAccepted: 'ZAR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: ['Hluhluwe', 'St Lucia', 'Richards Bay', 'Durban', 'KwaZulu-Natal', 'Ponta do Ouro'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phoneIntl,
      contactType: 'reservations',
      availableLanguage: ['English', 'Zulu'],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function tourLd({ locale, tour, name, description, optionNames }) {
  const url = absoluteUrl(locale, `/tours/${tour.slug}`);
  const priced = tour.options.filter((o) => o.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    url,
    inLanguage: locale,
    ...(tour.image ? { image: SITE_URL + tour.image } : {}),
    touristType: ['Leisure', 'Cultural', 'Nature'],
    provider: { '@id': `${SITE_URL}/#organization` },
    ...(priced.length
      ? {
          offers: priced.map((o) => ({
            '@type': 'Offer',
            name: optionNames[o.key],
            price: o.price,
            priceCurrency: 'ZAR',
            availability: 'https://schema.org/InStock',
            url,
          })),
        }
      : {}),
  };
}
