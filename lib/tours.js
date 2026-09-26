// Tour catalogue. Copy lives in messages/*.json under tours.<key>.
// Prices in ZAR from the Khondlo Tours package sheet — update here only.
export const TOURS = [
  {
    slug: 'macabuzela-village-walking-tour',
    key: 'macabuzela',
    category: 'categoryCulture',
    image: '/images/tours/macabuzela-guests-walking-footpath.webp',
    gallery: [
      '/images/tours/macabuzela-guide-talk-homestead.webp',
      '/images/tours/macabuzela-rondavel-traditional-items.webp',
      '/images/tours/macabuzela-rondavel-homestead.webp',
      '/images/tours/macabuzela-village-welcome.webp',
      '/images/tours/pineapple-farm-hluhluwe.webp',
      '/images/community/school-visit-classroom.webp',
    ],
    highlights: 5,
    options: [{ key: 'option1', price: null }],
    durationISO: 'PT3H',
    video: '/video/village-trail-walk.mp4',
    videoPoster: '/images/gallery/village-trail-walk-poster.webp',
  },
  {
    slug: 'hluhluwe-imfolozi-game-drive',
    key: 'hluhluwe',
    category: 'categoryWildlife',
    image: '/images/tours/hluhluwe-imfolozi-elephant-game-drive.webp',
    gallery: ['/images/tours/game-drive-guide-selfie.webp', '/images/fleet/vw-kombi-and-game-vehicle.webp'],
    highlights: 4,
    options: [
      { key: 'option1', price: 1200, unit: 'perPerson' },
      { key: 'option2', price: 850, unit: 'perPerson' },
    ],
    durationISO: 'PT8H',
  },
  {
    slug: 'isimangaliso-wetland-park-tour',
    key: 'isimangaliso',
    category: 'categoryWildlife',
    image: null,
    art: 'coast',
    gallery: [],
    highlights: 4,
    options: [
      { key: 'option1', price: 1150, unit: 'perPerson' },
      { key: 'option2', price: 950, unit: 'perPerson' },
      { key: 'option3', price: 750, unit: 'perPerson' },
      { key: 'option4', price: 350, unit: 'perPerson' },
      { key: 'option5', price: 400, unit: 'perPerson' },
    ],
    durationISO: 'PT8H',
  },
  {
    slug: 'elephant-interaction',
    key: 'elephant',
    category: 'categoryWildlife',
    image: null,
    art: 'bush',
    gallery: [],
    highlights: 3,
    options: [{ key: 'option1', price: 700, unit: 'perPerson' }],
    durationISO: 'PT4H',
  },
  {
    slug: 'st-lucia-hippo-boat-cruise',
    key: 'hippo',
    category: 'categoryWildlife',
    image: null,
    art: 'estuary',
    gallery: [],
    highlights: 3,
    options: [{ key: 'option1', price: 300, unit: 'perPerson' }],
    durationISO: 'PT2H',
  },
  {
    slug: 'mozambique-ponta-do-ouro-4-day-trip',
    key: 'mozambique',
    category: 'categoryMultiDay',
    image: null,
    art: 'beach',
    gallery: [],
    highlights: 0,
    days: 4,
    includes: 6,
    excludes: 4,
    options: [{ key: 'option1', price: 6900, unit: 'perPersonSharing' }],
    durationISO: 'P4D',
  },
];

export const getTour = (slug) => TOURS.find((t) => t.slug === slug);

export function fromPrice(tour) {
  const prices = tour.options.map((o) => o.price).filter(Boolean);
  return prices.length ? Math.min(...prices) : null;
}
