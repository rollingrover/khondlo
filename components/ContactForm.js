'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { TOURS } from '@/lib/tours';
import { sendEnquiry } from '@/app/[locale]/contact/actions';

function Submit() {
  const t = useTranslations('contact');
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn--ink" disabled={pending} style={{ justifySelf: 'start' }}>
      {pending ? t('sending') : t('send')}
    </button>
  );
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const params = useSearchParams();
  const tripParam = params.get('trip') || '';
  const tour = TOURS.find((x) => x.slug === tripParam);
  const trip = tour ? tour.slug : '';
  const service = tripParam === 'shuttle' ? 'shuttle' : tour?.key === 'mozambique' ? 'moz' : 'tour';
  const locale = useLocale();
  const [state, action] = useFormState(sendEnquiry, { status: 'idle' });
  const err = state.errors || {};

  if (state.status === 'ok') {
    return <p className="notice notice--ok" role="status">{t('success')}</p>;
  }

  const fieldErr = (name) =>
    err[name] ? <p className="field__error" id={`${name}-err`}>{t(err[name])}</p> : null;
  const described = (name, hint) => [err[name] && `${name}-err`, hint].filter(Boolean).join(' ') || undefined;

  return (
    <form action={action} className="form" noValidate>
      {state.status === 'error' && <p className="notice notice--err" role="alert">{t('error')}</p>}
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="trip" value={trip} />
      <div className="hp" aria-hidden="true">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="name">{t('name')}</label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!err.name} aria-describedby={described('name')} />
          {fieldErr('name')}
        </div>
        <div className="field">
          <label htmlFor="email">{t('email')}</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err.email} aria-describedby={described('email')} />
          {fieldErr('email')}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="phone">{t('phoneField')}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="service">{t('service')}</label>
          <select id="service" name="service" defaultValue={service} key={service}>
            <option value="tour">{t('serviceTour')}</option>
            <option value="shuttle">{t('serviceShuttle')}</option>
            <option value="moz">{t('serviceMoz')}</option>
            <option value="custom">{t('serviceCustom')}</option>
          </select>
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="date">{t('date')}</label>
          <input id="date" name="date" type="date" />
        </div>
        <div className="field">
          <label htmlFor="people">{t('people')}</label>
          <input id="people" name="people" type="number" min="1" max="99" inputMode="numeric" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">{t('message')}</label>
        <textarea id="message" name="message" required aria-invalid={!!err.message} aria-describedby={described('message', 'message-hint')} />
        <p className="field__hint" id="message-hint">{t('messageHint')}</p>
        {fieldErr('message')}
      </div>

      <Submit />
      <p className="muted" style={{ margin: 0 }}>{t('privacy')}</p>
    </form>
  );
}
