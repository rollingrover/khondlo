// Signature footpath line — echoes the red-earth village paths and the logo's swoosh.
// `draw` animates it once on load (skipped under prefers-reduced-motion).
const D = 'M4 34 C 52 8, 96 46, 150 26 S 246 4, 300 24 S 380 44, 416 16';

export default function Trail({ draw = false, tone = 'sun', id = 'trail' }) {
  const cls = `trail${tone === 'earth' ? ' trail--earth' : ''}`;
  return (
    <svg className={cls} viewBox="0 0 420 50" aria-hidden="true" focusable="false">
      {draw ? (
        <>
          <defs>
            <mask id={`${id}-mask`} className="trail__mask" maskUnits="userSpaceOnUse">
              <path className="trail__draw" d={D} />
            </mask>
          </defs>
          <path d={D} mask={`url(#${id}-mask)`} />
        </>
      ) : (
        <path d={D} />
      )}
    </svg>
  );
}
