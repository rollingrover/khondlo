import { formatRand } from '@/lib/site';

export default function Price({ value, from, unit, t }) {
  if (!value) return <span className="price">{t('onRequest')}</span>;
  return (
    <span className="price">
      {from && <small style={{ marginLeft: 0, marginRight: '.35rem' }}>{t('from')}</small>}
      {formatRand(value)}
      {unit && <small>{t(unit)}</small>}
    </span>
  );
}
