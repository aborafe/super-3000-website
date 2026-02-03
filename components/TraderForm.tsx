'use client';

import { useState } from 'react';
import { buildWhatsappLink } from '@/lib/whatsapp';

export default function TraderForm({
  locale,
  labels
}: {
  locale: 'ar' | 'en';
  labels: {
    businessName: string;
    contactPerson: string;
    phone: string;
    city: string;
    taxRecord: string;
    notes: string;
    submit: string;
  };
}) {
  const [form, setForm] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    city: '',
    taxRecord: '',
    notes: ''
  });
  const fieldIds = {
    businessName: 'trader-business',
    contactPerson: 'trader-contact',
    phone: 'trader-phone',
    city: 'trader-city',
    taxRecord: 'trader-tax',
    notes: 'trader-notes'
  };

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const message =
      locale === 'ar'
        ? `طلب تسجيل تاجر:\nاسم النشاط: ${form.businessName}\nمسؤول التواصل: ${form.contactPerson}\nالهاتف: ${form.phone}\nالمدينة: ${form.city}\nالسجل الضريبي: ${form.taxRecord || '—'}\nملاحظات: ${form.notes || '—'}`
        : `Trader registration request:\nBusiness: ${form.businessName}\nContact person: ${form.contactPerson}\nPhone: ${form.phone}\nCity: ${form.city}\nTax record: ${form.taxRecord || '-'}\nNotes: ${form.notes || '-'}`;

    const link = buildWhatsappLink(message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <form className="card grid gap-4 p-6" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor={fieldIds.businessName}>
        {labels.businessName}
      </label>
      <input
        id={fieldIds.businessName}
        className="input"
        placeholder={labels.businessName}
        value={form.businessName}
        onChange={(event) => updateField('businessName', event.target.value)}
        aria-label={labels.businessName}
        required
      />
      <label className="sr-only" htmlFor={fieldIds.contactPerson}>
        {labels.contactPerson}
      </label>
      <input
        id={fieldIds.contactPerson}
        className="input"
        placeholder={labels.contactPerson}
        value={form.contactPerson}
        onChange={(event) => updateField('contactPerson', event.target.value)}
        aria-label={labels.contactPerson}
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
        required
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
      <label className="sr-only" htmlFor={fieldIds.taxRecord}>
        {labels.taxRecord}
      </label>
      <input
        id={fieldIds.taxRecord}
        className="input"
        placeholder={labels.taxRecord}
        value={form.taxRecord}
        onChange={(event) => updateField('taxRecord', event.target.value)}
        aria-label={labels.taxRecord}
      />
      <label className="sr-only" htmlFor={fieldIds.notes}>
        {labels.notes}
      </label>
      <textarea
        id={fieldIds.notes}
        className="textarea min-h-[120px]"
        placeholder={labels.notes}
        value={form.notes}
        onChange={(event) => updateField('notes', event.target.value)}
        aria-label={labels.notes}
      />
      <button className="btn-primary w-full" type="submit">
        {labels.submit}
      </button>
    </form>
  );
}
