import './globals.css';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { Cairo, Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloating from '@/components/WhatsAppFloating';
import JsonLd from '@/components/JsonLd';
import { getLocalBusinessSchema, getOrganizationSchema } from '@/lib/structured-data';
import { resolveLocale } from '@/i18n';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600'],
  variable: '--font-ar',
  display: 'swap'
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-en',
  display: 'swap'
});

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  const { locale } = params ? await params : { locale: undefined };
  const activeLocale = resolveLocale(locale);
  const messages = await getMessages({ locale: activeLocale });

  return (
    <html
      lang={activeLocale}
      dir={activeLocale === 'ar' ? 'rtl' : 'ltr'}
      className={`${cairo.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-text">
        <NextIntlClientProvider messages={messages} locale={activeLocale}>
          <JsonLd data={getOrganizationSchema(activeLocale)} />
          <JsonLd data={getLocalBusinessSchema(activeLocale)} />
          <Suspense fallback={null}>
            <Header locale={activeLocale} />
          </Suspense>
          <main className="min-h-screen">{children}</main>
          <Footer locale={activeLocale} />
          <WhatsAppFloating locale={activeLocale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
