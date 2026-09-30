import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

// Sites allowed to show this site inside an <iframe> (the Rolling Rover client carousel).
// Everyone else is blocked from framing it.
const FRAME_ANCESTORS = ["'self'", 'https://rollingrover.co.za', 'https://www.rollingrover.co.za'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // frame-ancestors replaces X-Frame-Options, which can't allow a named third-party site.
          { key: 'Content-Security-Policy', value: `frame-ancestors ${FRAME_ANCESTORS.join(' ')}` },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/(images|video)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
