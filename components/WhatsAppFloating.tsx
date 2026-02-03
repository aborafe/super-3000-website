import type { Locale } from '@/i18n';
import { buildWhatsappLink } from '@/lib/whatsapp';
import { getTranslations } from 'next-intl/server';

export default async function WhatsAppFloating({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const link = buildWhatsappLink();
  const sideClass = locale === 'ar' ? 'left-5' : 'right-5';

  return (
    <a
      href={link}
      className={`whatsapp-pulse fixed bottom-5 ${sideClass} z-40 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-primary shadow-soft transition-colors hover:bg-secondary/90 hover:[animation-play-state:paused]`}
      aria-label={t('cta.whatsapp')}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.1 14.7c-.2.5-1.1 1-1.6 1.1-.5.1-1.2.2-1.9 0-1.2-.3-2.6-.9-4.2-2.5-1.6-1.6-2.3-3-2.5-4.2-.1-.7 0-1.4 0-1.9.1-.5.6-1.4 1.1-1.6.2-.1.4-.1.6 0l.4.2c.2.2.6 1 .7 1.3.1.3.1.5 0 .7-.1.2-.1.3-.3.5-.1.2-.3.4-.5.5-.2.2-.4.4-.2.8.2.4.7 1.2 1.5 2 .8.8 1.6 1.3 2 1.5.4.2.6 0 .8-.2.2-.2.3-.4.5-.5.2-.1.4-.1.7 0 .3.1 1.1.5 1.3.7l.2.4c.1.2.1.4 0 .6Z"
          />
        </svg>
      </span>
      <span className="hidden sm:inline">{t('cta.whatsapp')}</span>
    </a>
  );
}
