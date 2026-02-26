import { getWhatsappNumber } from './site';

export function normalizeWhatsappNumber(value: string) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('020')) digits = `20${digits.slice(3)}`;
  return digits;
}

export function buildWhatsappLink(message?: string, overrideNumber?: string) {
  const raw = overrideNumber || getWhatsappNumber();
  const number = normalizeWhatsappNumber(raw);
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
