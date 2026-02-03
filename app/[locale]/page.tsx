import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import categories from '@/data/categories.json';
import type { Category } from '@/lib/types';
import { resolveLocale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { buildWhatsappLink } from '@/lib/whatsapp';
import Reveal from '@/components/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  return buildMetadata(activeLocale, 'home', '/');
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: activeLocale });
  const categoryList = categories as Category[];
  const features = t.raw('home.features') as Array<{ title: string; desc: string }>;
  const steps = t.raw('home.howSteps') as Array<{ title: string; desc: string }>;
  const trustItems = t.raw('home.trustItems') as string[];

  return (
    <div className="pb-6">
      <section className="hero-shell">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />
        <div className="section-pad relative pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div
                className="fade-rise inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                style={{ animationDelay: '0ms' }}
              >
                {t('common.wholesaleOnly')}
              </div>
              <h1
                className="fade-rise mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl"
                style={{ animationDelay: '60ms' }}
              >
                {t('home.heroTitle')}
              </h1>
              <p className="fade-rise mt-3 text-lg text-white/80" style={{ animationDelay: '110ms' }}>
                {t('home.heroSubtitle')}
              </p>
              <p className="fade-rise mt-3 text-sm text-white/70" style={{ animationDelay: '150ms' }}>
                {t('home.heroNote')}
              </p>
              <div className="fade-rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: '200ms' }}>
                <a className="btn-primary" href={buildWhatsappLink()}>
                  {t('cta.whatsapp')}
                </a>
                <Link className="btn-outline-light" href={`/${activeLocale}/products`}>
                  {t('cta.browseProducts')}
                </Link>
              </div>
            </div>
            <div className="fade-rise rounded-2xl border border-white/15 bg-white/5 p-6 text-white" style={{ animationDelay: '120ms' }}>
              <div className="text-sm font-semibold text-white">{t('common.noRetail')}</div>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>• {t('common.fastDelivery')}</li>
                <li>• {t('common.trustedQuality')}</li>
                <li>• {t('common.directDealing')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div>
            <h2 className="text-2xl font-semibold text-text">{t('home.featuresTitle')}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {features.map((item, index) => (
                <div key={index} className="card card-interactive p-5">
                  <div className="text-lg font-semibold text-text">{item.title}</div>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text">{t('home.categoriesTitle')}</h2>
              <Link className="text-sm font-semibold text-secondary link-underline" href={`/${activeLocale}/products`}>
                {t('cta.browseProducts')}
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryList.map((category) => (
                <div key={category.id} className="card card-interactive flex items-center justify-between p-5">
                  <div className="text-lg font-semibold text-text">
                    {activeLocale === 'ar' ? category.name_ar : category.name_en}
                  </div>
                  <span className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-muted">{category.id}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <div>
            <h2 className="text-2xl font-semibold text-text">{t('home.howTitle')}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={index} className="card card-interactive p-5">
                  <div className="text-sm font-semibold text-secondary">0{index + 1}</div>
                  <div className="mt-2 text-lg font-semibold text-text">{step.title}</div>
                  <p className="mt-2 text-sm text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="card grid gap-6 p-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-text">{t('home.trustTitle')}</h2>
            <div className="mt-4 grid gap-2 text-sm text-muted">
              {trustItems.map((item, index) => (
                <div key={index}>• {item}</div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <Link className="btn-primary text-center" href={`/${activeLocale}/trader`}>
              {t('cta.requestTrader')}
            </Link>
            <Link className="btn-outline text-center" href={`/${activeLocale}/contact`}>
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      <section id="contact-cta" className="section pt-6">
        <div className="card flex flex-col items-center gap-4 p-6 text-center">
          <div className="text-lg font-semibold text-text">{t('common.wholesaleOnly')}</div>
          <p className="text-sm text-muted">{t('home.heroNote')}</p>
          <a className="btn-primary" href={buildWhatsappLink()}>
            {t('cta.whatsapp')}
          </a>
        </div>
      </section>
    </div>
  );
}
