import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';
import { getAddress, getWhatsappNumber, mapUrl, siteEmail, siteName } from '@/lib/site';
import { buildWhatsappLink } from '@/lib/whatsapp';

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const whatsappLink = buildWhatsappLink();
  const address = getAddress(locale);

  return (
    <footer className="bg-primary text-white">
      <div className="section-pad grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-semibold">{siteName}</div>
          <p className="text-sm text-white/70">{t('common.noRetail')}</p>
          <div className="text-xs text-white/60">{t('common.wholesaleOnly')}</div>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <div className="text-xs uppercase tracking-widest text-white/50">{t('common.contactUs')}</div>
          <div>{siteEmail}</div>
          <div>{getWhatsappNumber()}</div>
          <div>{address}</div>
          <a
            className="inline-flex items-center gap-2 text-secondary link-underline"
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('cta.openMap')}
          </a>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <div className="text-xs uppercase tracking-widest text-white/50">{t('footer.hoursTitle')}</div>
          <div>{t('footer.hoursValue')}</div>
        </div>

        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-white/50">{t('cta.whatsapp')}</div>
          <div className="flex flex-col gap-3">
            <a className="btn-primary" href={whatsappLink}>
              {t('cta.whatsapp')}
            </a>
            <Link className="btn-outline-light" href={`/${locale}/products`}>
              {t('cta.browseProducts')}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        {t('footer.rights')} © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
