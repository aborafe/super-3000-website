import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';
import ContactCard from '@/components/ContactCard';
import { getAddress, getWhatsappNumber, mapUrl, siteEmail } from '@/lib/site';
import { buildWhatsappLink } from '@/lib/whatsapp';
import Reveal from '@/components/Reveal';
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  return buildMetadata(activeLocale, 'contact', '/contact');
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: activeLocale });
  const address = getAddress(activeLocale);
  const whatsappNumber = getWhatsappNumber();
  const whatsappMessage =
    activeLocale === 'ar'
      ? 'السلام عليكم، أنا تاجر وأرغب في الاستفسار/طلب أوردر. الاسم: ... المحافظة: ...'
      : 'Hello, I am a trader and would like to inquire/place an order. Name: ... Governorate: ...';

  return (
    <div className="space-y-12 pb-10">
      <section className="section">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-semibold text-secondary">
              {t('contact.noteB2B')}
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-text md:text-3xl lg:text-4xl">{t('contact.title')}</h1>
            <p className="mt-3 text-sm text-muted">{t('contact.subtitle')}</p>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-text">{t('contact.formTitle')}</h2>
                <p className="mt-2 text-sm text-muted">{t('contact.formNote')}</p>
              </div>
              <ContactForm
                locale={activeLocale}
                labels={{
                  name: t('contact.form.name'),
                  phone: t('contact.form.phone'),
                  city: t('contact.form.city'),
                  message: t('contact.form.message'),
                  submit: t('cta.sendMessage'),
                  phoneHint: t('contact.form.phoneHint'),
                  phoneError: t('contact.form.phoneError')
                }}
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card card-interactive flex h-full flex-col gap-4 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="text-base font-semibold text-text">{t('contact.locationTitle')}</div>
              </div>
              <div className="text-sm text-muted">{address}</div>
              <div className="text-xs text-muted">{t('contact.cards.addressDesc')}</div>
              <div className="relative mt-2 h-40 overflow-hidden rounded-2xl border border-border bg-primary/5 sm:h-48">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 20% 20%, rgba(77,163,217,0.25), transparent 60%), radial-gradient(circle at 80% 20%, rgba(5,11,27,0.18), transparent 55%)'
                  }}
                />
                <div className="hero-lines opacity-20" aria-hidden="true" />
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary shadow">
                  <span className="h-2.5 w-2.5 rounded-full bg-secondary" aria-hidden="true" />
                  {t('contact.mapLabel')}
                </div>
              </div>
              <a className="btn-primary w-full" href={mapUrl} target="_blank" rel="noopener noreferrer">
                {t('contact.mapCta')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <h2 className="text-2xl font-semibold text-text">{t('contact.cardsTitle')}</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={40}>
            <ContactCard
              title={t('contact.cards.whatsapp')}
              highlight
              icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
              action={
                <a className="btn-primary w-full" href={buildWhatsappLink(whatsappMessage)}>
                  {t('cta.whatsapp')}
                </a>
              }
            >
              <div className="font-semibold text-text">{whatsappNumber}</div>
              <div className="mt-1 text-xs text-muted">{t('contact.cards.whatsappDesc')}</div>
            </ContactCard>
          </Reveal>

          <Reveal delay={80}>
            <ContactCard
              title={t('contact.cards.email')}
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              action={
                <a className="btn-outline w-full" href={`mailto:${siteEmail}`}>
                  {siteEmail}
                </a>
              }
            >
              <div className="text-sm text-muted">{t('contact.cards.emailDesc')}</div>
            </ContactCard>
          </Reveal>

          <Reveal delay={120}>
            <ContactCard
              title={t('contact.cards.address')}
              icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
              action={
                <a className="btn-outline w-full" href={mapUrl} target="_blank" rel="noopener noreferrer">
                  {t('contact.mapCta')}
                </a>
              }
            >
              <div className="text-sm text-muted">{address}</div>
              <div className="mt-2 text-xs text-muted">{t('contact.cards.addressDesc')}</div>
            </ContactCard>
          </Reveal>

          <Reveal delay={160}>
            <ContactCard title={t('footer.hoursTitle')} icon={<Clock className="h-5 w-5" aria-hidden="true" />}>
              <div className="text-sm text-muted">{t('footer.hoursValue')}</div>
            </ContactCard>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
