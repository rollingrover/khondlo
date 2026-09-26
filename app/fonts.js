import localFont from 'next/font/local';

// Self-hosted (no build-time network fetch). Latin subsets; other scripts fall back to system fonts.
// Lexend was designed for reading ease — suits an audience of international and older travellers.
export const display = localFont({
  src: './fonts/bricolage-grotesque-var.woff2',
  variable: '--font-display',
  weight: '200 800',
  display: 'swap',
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
});

export const body = localFont({
  src: './fonts/lexend-var.woff2',
  variable: '--font-body',
  weight: '100 900',
  display: 'swap',
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
});
