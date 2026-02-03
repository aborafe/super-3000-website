import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en'] as const;
export const defaultLocale = 'ar';
export const localePrefix = 'always';

export type Locale = typeof locales[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value?: string | null): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function getDirection(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requested = locale ?? (await requestLocale);
  const activeLocale = resolveLocale(requested);
  return {
    locale: activeLocale,
    messages: (await import(`./messages/${activeLocale}.json`)).default
  };
});
