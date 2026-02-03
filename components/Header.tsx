'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n';
import LanguageSwitcher from './LanguageSwitcher';
import { useScrollShrink } from '@/hooks/useScrollShrink';

const CONTACT_NUMBER = '201001512202+';
const CONTACT_NUMBER_PLAIN = '201001512202';
const CONTACT_EMAIL = 'super3000_oil@gmail.com';
const WHATSAPP_LINK = `https://wa.me/${CONTACT_NUMBER_PLAIN}`;

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const scrolled = useScrollShrink({ enter: 30, exit: 10 });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('mousedown', handleOutside);
    window.addEventListener('touchstart', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('touchstart', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = useMemo(
    () => [
      { href: `/${locale}`, label: t('nav.home') },
      { href: `/${locale}/about`, label: t('nav.about') },
      { href: `/${locale}/products`, label: t('nav.products') },
      { href: `/${locale}/trader`, label: t('nav.trader') },
      { href: `/${locale}/contact`, label: t('nav.contact') }
    ],
    [locale, t]
  );

  const whatsappLabel = t('contact.cards.whatsapp');
  const phoneLabel = t('contact.cards.phone');
  const ctaLabel = locale === 'ar' ? 'تواصل واتساب' : 'WhatsApp';

  return (
    <header
      className={cx(
        'header sticky top-0 z-[9999] h-[104px] border-b border-white/10 bg-[rgb(var(--color-primary-rgb)_/_var(--tw-bg-opacity,1))] backdrop-blur relative',
        '[transform:translateZ(0)] [will-change:transform] [contain:layout_paint]',
        scrolled && 'scrolled shadow-[0_16px_30px_rgba(5,10,20,0.45)]'
      )}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <div
        className={cx(
          'header-inner section-pad h-full origin-top transition-transform duration-200 ease-out',
          'flex flex-col justify-center gap-2',
          scrolled && 'scale-[0.92]'
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src="/logo.png" alt="Super 3000 logo" width={44} height={44} />
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-2 text-[1.05rem] font-semibold text-white">
                <span>Super 3000</span>
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-sky-400/50 bg-sky-400/10 shadow-[0_0_12px_rgba(77,163,217,0.45)]"
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs text-white/70">{t('brand.tagline')}</span>
            </div>
          </Link>

          <nav
            className="nav-links hidden items-center gap-2 text-sm text-white/80 md:flex md:flex-nowrap"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="whatsapp-btn inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-400 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(59,130,246,0.25)] transition hover:translate-y-[-1px] hover:shadow-[0_16px_24px_rgba(59,130,246,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
              href={WHATSAPP_LINK}
              aria-label={ctaLabel}
            >
              {ctaLabel}
            </a>
            <LanguageSwitcher locale={locale} className={cx('hidden md:flex transition-transform', scrolled && 'scale-90')} />
            <button
              className="menu-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-sky-400/60 hover:bg-sky-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14] md:hidden"
              type="button"
              ref={menuButtonRef}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={cx(
            'contact-row hidden items-center justify-end gap-4 text-xs text-white/70 md:flex',
            'overflow-hidden transition-[opacity,transform,max-height] duration-200',
            scrolled
              ? 'max-h-0 -translate-y-1 opacity-0 pointer-events-none'
              : 'max-h-8 translate-y-0 opacity-100'
          )}
        >
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={WHATSAPP_LINK}
            aria-label={whatsappLabel}
            className="transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
          >
            {whatsappLabel}: {CONTACT_NUMBER}
          </a>
          <a
            href={`tel:${CONTACT_NUMBER_PLAIN}`}
            aria-label={phoneLabel}
            className="transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14]"
          >
            {phoneLabel}: {CONTACT_NUMBER}
          </a>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={cx(
          'mobile-menu absolute left-4 right-4 top-[calc(100%+10px)] rounded-2xl border border-white/10 bg-[rgba(5,10,20,0.9)] p-4 backdrop-blur-md shadow-[0_20px_40px_rgba(5,10,20,0.45)] md:hidden',
          'transition-[opacity,transform] duration-200',
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-2 text-sm text-white/85 transition hover:bg-sky-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-3 flex items-center justify-between">
          <LanguageSwitcher locale={locale} className="flex" />
        </div>
      </div>
    </header>
  );
}
