'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n';
import type { Product } from '@/lib/types';
import { buildWhatsappLink } from '@/lib/whatsapp';
import Reveal from '@/components/Reveal';

function formatYears(years: number[]) {
  if (!years.length) return '';
  const sorted = [...years].sort((a, b) => a - b);
  return sorted.length > 1 ? `${sorted[0]}-${sorted[sorted.length - 1]}` : `${sorted[0]}`;
}

export default function ProductClient({
  locale,
  product,
  categoryName
}: {
  locale: Locale;
  product: Product;
  categoryName: string;
}) {
  const t = useTranslations();
  const name = locale === 'ar' ? product.name_ar : product.name_en;
  const description = locale === 'ar' ? product.description_ar : product.description_en;
  const originLabels = t.raw('products.originLabels') as Record<string, string>;
  const imageSrc = product.image && product.image.trim().length > 0 ? product.image : '/products/placeholder.png';
  const message =
    locale === 'ar'
      ? `طلب تاجر: ${name} - التصنيف: ${categoryName}`
      : `Trader request: ${name} - Category: ${categoryName}`;

  return (
    <div className="section space-y-8">
      <Reveal>
        <Link className="text-sm font-semibold text-secondary link-underline" href={`/${locale}/products`}>
          {t('product.back')}
        </Link>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="card p-5">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-bg">
              <Image
                src={imageSrc}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wide text-muted">{categoryName}</div>
            <h1 className="text-3xl font-semibold text-text">{name}</h1>
            <p className="text-sm text-muted">{description}</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <span
                  key={`${product.id}-${variant.sku}`}
                  className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-muted"
                  title={locale === 'ar' ? variant.note_ar : variant.note_en}
                >
                  {originLabels[variant.origin] || variant.origin}
                </span>
              ))}
            </div>
            <div className="card space-y-2 p-4">
              <div className="text-sm font-semibold text-text">{t('product.compatibilityTitle')}</div>
              <div className="grid gap-2 text-sm text-muted">
                {product.compatibleCars.map((car, index) => (
                  <div key={`${car.make}-${car.model}-${index}`}>
                    {car.make} {car.model} {formatYears(car.years)}
                  </div>
                ))}
              </div>
            </div>
            <a className="btn-primary w-full sm:w-auto" href={buildWhatsappLink(message)}>
              {t('cta.requestViaWhatsapp')}
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-text">{t('product.variantsTitle')}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {product.variants.map((variant) => (
              <div key={`${product.id}-${variant.sku}-details`} className="rounded-xl border border-border bg-bg p-4">
                <div className="text-sm font-semibold text-text">
                  {originLabels[variant.origin] || variant.origin}
                </div>
                <div className="mt-1 text-xs text-muted">{variant.sku}</div>
                <p className="mt-2 text-sm text-muted">
                  {locale === 'ar' ? variant.note_ar : variant.note_en}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
