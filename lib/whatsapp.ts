import { getWhatsappNumber } from './site';

export function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, '');
}

export function buildWhatsappLink(message?: string, overrideNumber?: string) {
  const raw = overrideNumber || getWhatsappNumber();
  const number = normalizeWhatsappNumber(raw);
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
