'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '@/i18n';

export default function LanguageSwitcher({
  locale,
  className
}: {
  locale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();

  const pathFor = (target: Locale) => {
    const hasLocale = /^\/(ar|en)(?=\/|$)/.test(pathname);
    if (hasLocale) {
      return pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${target}`);
    }
    if (pathname === '/' || pathname === '') return `/${target}`;
    return `/${target}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  const buildHref = (target: Locale) => {
    const basePath = pathFor(target);
    const search = searchParams?.toString();
    return search ? `${basePath}?${search}` : basePath;
  };

  const activeLocale: Locale =
    pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ar') ? 'ar' : locale;
  const isAr = activeLocale === 'ar';

  const handleSwitch = (target: Locale) => {
    if (target === activeLocale) return;
    router.push(buildHref(target));
  };

  return (
    <div
      className={`language-switcher flex items-center rounded-full border border-white/20 bg-white/10 p-1 text-xs font-semibold ${
        className ?? ''
      }`}
    >
      <button
        type="button"
        onClick={() => handleSwitch('ar')}
        aria-current={isAr ? 'true' : undefined}
        aria-label="Switch to Arabic"
        className={`rounded-full px-2 py-1 transition-colors ${
          isAr ? 'bg-secondary text-primary' : 'text-white/70 hover:text-white'
        }`}
      >
        AR
      </button>
      <button
        type="button"
        onClick={() => handleSwitch('en')}
        aria-current={!isAr ? 'true' : undefined}
        aria-label="Switch to English"
        className={`rounded-full px-2 py-1 transition-colors ${
          !isAr ? 'bg-secondary text-primary' : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
