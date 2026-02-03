import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import { buildWhatsappLink } from '@/lib/whatsapp';
import Reveal from '@/components/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  return buildMetadata(activeLocale, 'about', '/about');
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: activeLocale });
  const facts = t.raw('about.facts') as string[];
  const timeline = t.raw('about.timeline') as Array<{ year: string; title: string; desc: string }>;
  const differentiators = t.raw('about.differentiators') as string[];
  const expertise = t.raw('about.expertise') as Array<{ title: string; desc: string }>;

  return (
    <div className="space-y-12 pb-10">
      <section className="section">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary text-white">
          <div className="hero-lines" aria-hidden="true" />
          <div className="relative p-6 sm:p-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                {t('common.wholesaleOnly')}
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                {t('about.heroTitle')}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 max-w-3xl text-base text-white/80">{t('about.heroSubtitle')}</p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-2 lg:grid-cols-3">
                {facts.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <h2 className="text-2xl font-semibold text-text">{t('about.timelineTitle')}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {timeline.map((item, index) => (
            <Reveal key={`${item.year}-${index}`} delay={80 + index * 40}>
              <div className="card card-interactive p-5">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-secondary" aria-hidden="true" />
                  <div className="text-sm font-semibold text-secondary">{item.year}</div>
                </div>
                <div className="mt-2 text-lg font-semibold text-text">{item.title}</div>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <h2 className="text-2xl font-semibold text-text">{t('about.differentiatorsTitle')}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item, index) => (
            <Reveal key={`${item}-${index}`} delay={60 + index * 30}>
              <div className="card card-interactive p-5 text-sm text-muted">{item}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <h2 className="text-2xl font-semibold text-text">{t('about.expertiseTitle')}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={60 + index * 30}>
              <div className="card card-interactive p-5">
                <div className="text-base font-semibold text-text">{item.title}</div>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="card border-secondary/30 bg-secondary/10 p-6 text-center">
            <div className="text-lg font-semibold text-text">{t('about.coverageTitle')}</div>
            <p className="mt-2 text-sm text-muted">{t('about.coverageSubtitle')}</p>
          </div>
        </Reveal>
      </section>

      <section className="section pt-2">
        <Reveal>
          <div className="card flex flex-col items-center gap-4 p-6 text-center">
            <div className="text-lg font-semibold text-text">{t('about.ctaTitle')}</div>
            <a className="btn-primary" href={buildWhatsappLink()}>
              {t('about.ctaButton')}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
