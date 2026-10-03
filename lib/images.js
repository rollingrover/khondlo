import sizes from './image-sizes.json';

export function dims(src) {
  const s = sizes[src];
  return s ? { width: s[0], height: s[1] } : { width: 1600, height: 1200 };
}

// Gallery set, grouped for the gallery page. Alt text keys are plain English
// descriptions used across locales (descriptive, not marketing copy).
export const GALLERY = [
  ['/images/tours/macabuzela-village-trail-hills.webp', 'Guests walking a red-earth footpath towards the hills near Macabuzela village'],
  ['/images/tours/macabuzela-guide-talk-homestead.webp', 'Khondlo Tours guide talking to a tour group outside a homestead'],
  ['/images/tours/macabuzela-rondavel-traditional-items.webp', 'Guide explaining traditional household items inside a thatched rondavel'],
  ['/images/tours/macabuzela-village-welcome.webp', 'Village host welcoming guests at a homestead kraal'],
  ['/images/tours/macabuzela-village-road-dancers.webp', 'Traditional dancers welcoming guests on a village road'],
  ['/images/tours/macabuzela-rondavel-homestead.webp', 'Whitewashed rondavel homestead in Macabuzela'],
  ['/images/tours/macabuzela-homestead-visit.webp', 'Tour group visiting a village home'],
  ['/images/tours/macabuzela-group-footpath.webp', 'Tour group walking single file on a village path'],
  ['/images/tours/macabuzela-guide-selfie-path.webp', 'Local guide leading guests along a grassy path'],
  ['/images/tours/macabuzela-guide-group-circle.webp', 'Guests listening to the guide in the village'],
  ['/images/community/school-visit-classroom.webp', 'Guests visiting learners in a local school hall'],
  ['/images/community/school-visit-guests-learners.webp', 'Guest standing with two learners in school uniform'],
  ['/images/community/school-courtyard-guests.webp', 'Tour group in a school courtyard under a large tree'],
  ['/images/community/children-welcome-group.webp', 'Children meeting a tour group next to a Khondlo Tours minibus'],
  ['/images/tours/pineapple-farm-hluhluwe.webp', 'Guests holding fresh pineapples on a Hluhluwe farm'],
  ['/images/tours/roadside-fruit-market-hluhluwe.webp', 'Roadside fruit stall with pineapples and bananas'],
  ['/images/tours/zululand-sunrise-hero.webp', 'Sunrise over the Zululand coastal forest and wetlands'],
  ['/images/tours/hluhluwe-imfolozi-elephant-road.webp', 'Elephant bull walking along a gravel road in Hluhluwe-iMfolozi Park'],
  ['/images/tours/elephant-interaction-rambo-rachel.webp', 'Two elephants drinking from water barrels at the elephant interaction enclosure'],
  ['/images/tours/isimangaliso-st-lucia-estuary-herons.webp', 'Herons wading in the St Lucia estuary, iSimangaliso Wetland Park, at dusk'],
  ['/images/tours/st-lucia-hippo-cruise-pod.webp', 'Pod of hippos entering the St Lucia estuary, seen from the cruise boat'],
  ['/images/tours/hluhluwe-imfolozi-elephant-game-drive.webp', 'Elephant seen from an open game drive vehicle in Hluhluwe-iMfolozi Park'],
  ['/images/tours/game-drive-guide-selfie.webp', 'Guide and guests on a game drive vehicle'],
  ['/images/fleet/airstrip-transfer-minibus-trailer.webp', 'Khondlo Tours minibus and luggage trailer meeting a light aircraft'],
  ['/images/fleet/airport-pickup-branded-vans.webp', 'Guests loading luggage into branded shuttle vans'],
  ['/images/fleet/hotel-pickup-luggage.webp', 'Shuttle loading luggage at a hotel entrance'],
  ['/images/fleet/umhlanga-hotel-transfer.webp', 'Executive sedan waiting at a coastal hotel entrance'],
  ['/images/community/tourism-expo-stand.webp', 'Khondlo Tours stand at a tourism expo'],
];

export const VIDEOS = [
  { src: '/video/village-trail-walk.mp4', poster: '/images/gallery/village-trail-walk-poster.webp', key: 'v1', w: 832, h: 464 },
  { src: '/video/homestead-visit.mp4', poster: '/images/gallery/homestead-visit-poster.webp', key: 'v2', w: 832, h: 464 },
  { src: '/video/guide-welcome-talk.mp4', poster: '/images/gallery/guide-welcome-talk-poster.webp', key: 'v3', w: 832, h: 464 },
  { src: '/video/school-visit.mp4', poster: '/images/gallery/school-visit-poster.webp', key: 'v4', w: 464, h: 832 },
];
