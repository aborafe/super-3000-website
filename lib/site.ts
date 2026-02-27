import type { Locale } from '@/i18n';

export const siteName = 'Super 3000';
export const siteEmail = 'super3000_oil@gmail.com';
export const mapUrl = 'https://maps.app.goo.gl/g2pnBjuRoUVnrs7d7';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/super-3000-website';

export const addressAr = 'مركز نبروه - 6 شارع اكتوبر - بجوار مسجد ابوالغيط';
export const addressEn = 'Nabaroh Center, 6 October St, near Abu Elghit Mosque';

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function getWhatsappNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+0201018919997';
}

export function withBasePath(path: string) {
  if (!path) return basePath;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === basePath || normalized.startsWith(`${basePath}/`)) return normalized;
  return `${basePath}${normalized}`;
}

export function getAddress(locale: Locale) {
  return locale === 'ar' ? addressAr : addressEn;
}
