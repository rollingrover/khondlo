'use client';

// Fallback for requests outside the locale segment.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem', color: '#1c2a18' }}>
        <h1>Page not found</h1>
        <p><a href="/">Go to the Khondlo Tours home page</a></p>
      </body>
    </html>
  );
}
