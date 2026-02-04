import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import TraderForm from '@/components/TraderForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  return buildMetadata(activeLocale, 'trader', '/trader');
}

export default async function TraderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: activeLocale });

  return (
    <div className="section space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-text">{t('trader.title')}</h1>
        <p className="mt-3 text-sm text-muted">{t('trader.intro')}</p>
      </div>
      <TraderForm
        locale={activeLocale}
        labels={{
          businessName: t('trader.form.businessName'),
          contactPerson: t('trader.form.contactPerson'),
          phone: t('trader.form.phone'),
          city: t('trader.form.city'),
          taxRecord: t('trader.form.taxRecord'),
          notes: t('trader.form.notes'),
          submit: t('cta.sendMessage')
        }}
      />
      <div className="card card-interactive space-y-2 p-6 text-sm text-muted">
        <div>{t('trader.approvalNote')}</div>
        <div>{t('trader.privateNote')}</div>
      </div>
    </div>
  );
}
