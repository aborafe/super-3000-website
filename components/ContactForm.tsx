'use client';

import { useState } from 'react';
import { buildWhatsappLink } from '@/lib/whatsapp';

export default function ContactForm({
  locale,
  labels
}: {
  locale: 'ar' | 'en';
  labels: {
    name: string;
    phone: string;
    city: string;
    message: string;
    submit: string;
    phoneHint: string;
    phoneError: string;
  };
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    message: ''
  });
  const [error, setError] = useState('');
  const hintId = 'contact-phone-hint';
  const fieldIds = {
    name: 'contact-name',
    phone: 'contact-phone',
    city: 'contact-city',
    message: 'contact-message'
  };

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setError(labels.phoneError);
      return;
    }
    const message =
      locale === 'ar'
        ? `السلام عليكم، أنا تاجر وأرغب في الاستفسار/طلب أوردر.\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالمحافظة: ${form.city}\nالرسالة: ${form.message}`
        : `Hello, I am a trader and would like to inquire/place an order.\nName: ${form.name}\nPhone: ${form.phone}\nGovernorate: ${form.city}\nMessage: ${form.message}`;

    const link = buildWhatsappLink(message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="card grid gap-3 p-4 sm:gap-4 sm:p-6" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={fieldIds.name}>
        {labels.name}
      </label>
      <input
        id={fieldIds.name}
        className="input"
        placeholder={labels.name}
        value={form.name}
        onChange={(event) => updateField('name', event.target.value)}
        aria-label={labels.name}
        required
      />
      <label className="sr-only" htmlFor={fieldIds.phone}>
        {labels.phone}
      </label>
      <input
        id={fieldIds.phone}
        className="input"
        placeholder={labels.phone}
        value={form.phone}
        onChange={(event) => updateField('phone', event.target.value)}
        aria-label={labels.phone}
        aria-describedby={hintId}
        required
        inputMode="tel"
        pattern="^[0-9+\\s-]{8,}$"
        title={labels.phoneHint}
      />
      <label className="sr-only" htmlFor={fieldIds.city}>
        {labels.city}
      </label>
      <input
        id={fieldIds.city}
        className="input"
        placeholder={labels.city}
        value={form.city}
        onChange={(event) => updateField('city', event.target.value)}
        aria-label={labels.city}
        required
      />
      <label className="sr-only" htmlFor={fieldIds.message}>
        {labels.message}
      </label>
      <textarea
        id={fieldIds.message}
        className="textarea min-h-[140px]"
        placeholder={labels.message}
        value={form.message}
        onChange={(event) => updateField('message', event.target.value)}
        aria-label={labels.message}
        required
      />
      <div id={hintId} className="text-xs text-muted">
        {labels.phoneHint}
      </div>
      {error ? <div className="text-xs font-semibold text-secondary">{error}</div> : null}
      <button className="btn-primary w-full" type="submit">
        {labels.submit}
      </button>
    </form>
  );
}
