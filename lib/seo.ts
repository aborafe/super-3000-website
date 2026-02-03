import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';
import { getSiteUrl, siteName } from './site';

function buildPath(locale: Locale, path: string) {
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

export async function buildMetadata(locale: Locale, pageKey: 'home' | 'about' | 'products' | 'trader' | 'contact', path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t(`${pageKey}.title`);
  const description = t(`${pageKey}.description`);
  const base = new URL(getSiteUrl());
  const canonicalPath = buildPath(locale, path);
  const canonicalUrl = new URL(canonicalPath, base);
  const arUrl = new URL(buildPath('ar', path), base);
  const enUrl = new URL(buildPath('en', path), base);

  return {
    metadataBase: base,
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: arUrl,
        en: enUrl
      }
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName,
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
