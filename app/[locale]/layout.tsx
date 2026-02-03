import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { resolveLocale } from '@/i18n';

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
