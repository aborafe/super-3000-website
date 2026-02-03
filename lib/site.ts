import type { Locale } from '@/i18n';

export const siteName = 'Super 3000';
export const siteEmail = 'super3000_oil@gmail.com';
export const mapUrl = 'https://maps.app.goo.gl/g2pnBjuRoUVnrs7d7';

export const addressAr = 'مركز نبروه - 6 شارع اكتوبر - بجوار مسجد ابوالغيط';
export const addressEn = 'Nabaroh Center, 6 October St, near Abu Elghit Mosque';

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export function getWhatsappNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2010XXXXXXX';
}

export function getAddress(locale: Locale) {
  return locale === 'ar' ? addressAr : addressEn;
}
