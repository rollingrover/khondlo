// Illustrated stand-in for tours that don't have photography yet.
// Built from the logo's sun + hill shapes so it reads as brand graphics, not a broken image.
const SCENES = {
  coast: { sky: '#cfe8ee', land: '#3e7b27', water: '#2f7fa0', sand: '#e9d3a3' },
  beach: { sky: '#fde7b3', land: '#5db82e', water: '#2a8fb0', sand: '#f1dcae' },
  estuary: { sky: '#f9d9a6', land: '#2a4b23', water: '#5b8f7a', sand: '#9a4524' },
  bush: { sky: '#fbe1a6', land: '#3e7b27', water: null, sand: '#9a4524' },
};

export default function TourArt({ scene = 'bush', label, className = 'art' }) {
  const c = SCENES[scene] || SCENES.bush;
  return (
    <svg className={className} viewBox="0 0 400 300" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={c.sky} />
      <circle cx="270" cy="130" r="62" fill="#f6a800" />
      <circle cx="270" cy="130" r="62" fill="#e8740c" opacity=".25" />
      {c.water && <rect y="190" width="400" height="110" fill={c.water} />}
      <path d="M0 200 C 90 150, 170 175, 240 190 S 360 160, 400 170 L400 300 L0 300 Z" fill={c.land} />
      <path d="M-10 262 C 90 225, 200 240, 290 250 S 380 262, 410 240 L410 300 L-10 300 Z" fill={c.sand} opacity=".9" />
      <path d="M20 280 C 80 262, 140 290, 210 272 S 320 250, 380 272" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 11" opacity=".85" />
    </svg>
  );
}
