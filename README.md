# Khondlo Tours — website

Next.js 14 (App Router) · next-intl 3 · 11 languages · static-first, SEO-optimised.
Live domain: https://www.khondlotours.co.za (set in `lib/site.js`).

## Run
```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY etc. for the enquiry form
npm run dev                  # http://localhost:3000
npm run build && npm start
npm run check:i18n           # key parity + ICU apostrophe check across all locales
```

## Where things live
| What | File |
|---|---|
| Business details, phone, WhatsApp, logo path, social links | `lib/site.js` |
| Tours, prices, photos per tour | `lib/tours.js` |
| All copy (every language) | `messages/*.json` |
| Gallery photos + videos | `lib/images.js` (sizes in `lib/image-sizes.json`) |
| Canonical URLs, hreflang, OpenGraph | `lib/seo.js` |
| JSON-LD (TravelAgency, TouristTrip, Breadcrumb, Video) | `lib/jsonld.js` |
| Design tokens (colours, type scale) | top of `app/globals.css` |
| Enquiry form server action (Resend) | `app/[locale]/contact/actions.js` |

## Languages
en (at `/`), zu, de, nl, fr, it, es, pt, ru, zh, hi — `as-needed` prefixing, full reciprocal
hreflang + x-default, 132-URL sitemap (12 pages × 11 locales).
**Before launch:** have a native speaker review isiZulu (and ideally hi/zh).

## Swapping in the new logo
Replace `public/images/brand/khondlo-logo-720.png` (720×376, transparent) — or change
`BUSINESS.logo` in `lib/site.js` and the `width/height` in `components/Header.js`
and `components/Footer.js`. Regenerate `app/icon.png`, `app/apple-icon.png`,
`app/favicon.ico` and `public/images/og/khondlo-og-default.jpg` to match.

## Adding photos to a tour without images
iSimangaliso, elephant, hippo and Mozambique currently show brand illustrations.
Add a 4:3 WebP to `public/images/tours/`, add its size to `lib/image-sizes.json`,
set `image:` (and optionally `gallery:`) for that tour in `lib/tours.js`.

## Still to do
- Real social profile URLs → `BUSINESS.social` in `lib/site.js`
- Guest reviews/testimonials (none published — add real ones only)
- Owner to confirm shuttle drive-time estimates and Macabuzela pricing
- Verify a sending domain in Resend and set `RESEND_FROM`
- Google Search Console + Bing verification after deploy
