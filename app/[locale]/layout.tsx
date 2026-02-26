import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { locales, resolveLocale } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(resolveLocale(locale));
  return children;
}
