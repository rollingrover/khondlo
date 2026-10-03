import { BUSINESS } from '@/lib/site';

const ICONS = {
  facebook: (
    <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" />
    </>
  ),
  tiktok: (
    <path d="M16.6 3c.3 2.2 1.6 3.6 3.8 3.8v2.7c-1.3.1-2.5-.3-3.8-1.1v5.3c0 6.7-7.3 8.8-10.2 4-1.9-3.1-.7-8.5 5.4-8.7v2.8c-.5.1-1 .2-1.4.3-1.4.5-2.2 1.4-2 3 .4 3.1 6.1 4 5.6-2V3h2.6Z" />
  ),
  tripadvisor: (
    <path d="M12 6.5c-2.4 0-4.7.7-6.6 2H2.5l1.6 1.8A4.4 4.4 0 1 0 10 16.4l2 2.2 2-2.2a4.4 4.4 0 1 0 5.9-6.1l1.6-1.8h-2.9a11.8 11.8 0 0 0-6.6-2ZM7 11.3a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm10 0a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z" />
  ),
};
const LABELS = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', tripadvisor: 'Tripadvisor' };

export default function SocialLinks() {
  const entries = Object.entries(BUSINESS.social).filter(([, url]) => url);
  if (!entries.length) return null;
  return (
    <ul className="social">
      {entries.map(([key, url]) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener" aria-label={`Khondlo Tours on ${LABELS[key]}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">{ICONS[key]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
