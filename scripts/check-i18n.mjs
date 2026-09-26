// Verifies every locale file has exactly the same keys as en.json,
// no empty strings, and no straight apostrophes next to ICU braces/tags.
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('messages');
const flat = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));

const base = new Map(flat(JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'))));
let failed = false;
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const m = new Map(flat(JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))));
  const missing = [...base.keys()].filter((k) => !m.has(k));
  const extra = [...m.keys()].filter((k) => !base.has(k));
  const empty = [...m].filter(([, v]) => typeof v !== 'string' || !v.trim()).map(([k]) => k);
  const risky = [...m].filter(([, v]) => /'[{<]|[}>]'/.test(v)).map(([k]) => k);
  const ok = !missing.length && !extra.length && !empty.length && !risky.length;
  if (!ok) failed = true;
  console.log(`${ok ? '✓' : '✗'} ${file}: ${m.size}/${base.size} keys` +
    (missing.length ? ` missing: ${missing.join(', ')}` : '') +
    (extra.length ? ` extra: ${extra.join(', ')}` : '') +
    (empty.length ? ` empty: ${empty.join(', ')}` : '') +
    (risky.length ? ` apostrophe-risk: ${risky.join(', ')}` : ''));
}
process.exit(failed ? 1 : 0);
