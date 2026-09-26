import { Link } from '@/i18n/routing';
import Trail from './Trail';

export default function PageHead({ title, text, crumbs = [] }) {
  return (
    <header className="pagehead">
      <div className="wrap">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c, i) => (
                <li key={i}>
                  {c.href ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1>{title}</h1>
        <Trail tone="earth" />
        {text && <p className="lede">{text}</p>}
      </div>
    </header>
  );
}
