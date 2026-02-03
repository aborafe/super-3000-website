import type { Locale } from '@/i18n';
import { addressAr, addressEn, getSiteUrl, getWhatsappNumber, siteEmail, siteName } from './site';

function getAddress(locale: Locale) {
  return locale === 'ar'
    ? {
        streetAddress: addressAr,
        addressLocality: 'نبروه',
        addressRegion: 'الدقهلية',
        addressCountry: 'EG'
      }
    : {
        streetAddress: addressEn,
        addressLocality: 'Nabaroh',
        addressRegion: 'Dakahlia',
        addressCountry: 'EG'
      };
}

export function getOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: getSiteUrl(),
    email: siteEmail,
    address: {
      '@type': 'PostalAddress',
      ...getAddress(locale)
    }
  };
}

export function getLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    name: siteName,
    url: getSiteUrl(),
    email: siteEmail,
    telephone: getWhatsappNumber(),
    address: {
      '@type': 'PostalAddress',
      ...getAddress(locale)
    },
    areaServed: 'EG',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '20:00'
      }
    ]
  };
}
