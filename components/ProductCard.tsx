'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { buildWhatsappLink } from '@/lib/whatsapp';

function formatYears(years: number[]) {
  if (!years.length) return '';
  const sorted = [...years].sort((a, b) => a - b);
  return sorted.length > 1 ? `${sorted[0]}-${sorted[sorted.length - 1]}` : `${sorted[0]}`;
}

export default function ProductCard({
  product,
  locale,
  categoryName,
  originLabels,
  ctaLabel
}: {
  product: Product;
  locale: 'ar' | 'en';
  categoryName: string;
  originLabels: Record<string, string>;
  ctaLabel: string;
}) {
  const router = useRouter();
  const name = locale === 'ar' ? product.name_ar : product.name_en;
  const desc = locale === 'ar' ? product.description_ar : product.description_en;
  const variants = product.variants.map((variant) => ({
    label: originLabels[variant.origin] || variant.origin,
    note: locale === 'ar' ? variant.note_ar : variant.note_en
  }));
  const imageSrc = product.image && product.image.trim().length > 0 ? product.image : '/products/placeholder.png';
  const compat = product.compatibleCars
    .slice(0, 2)
    .map((car) => `${car.make} ${car.model} ${formatYears(car.years)}`)
    .join(' • ');
  const moreCount = product.compatibleCars.length - 2;
  const detailHref = `/${locale}/products/${product.id}`;
  const message = locale === 'ar'
    ? `طلب تاجر: ${name} - التصنيف: ${categoryName}`
    : `Trader request: ${name} - Category: ${categoryName}`;

  return (
    <article
      className="card card-interactive group flex h-full cursor-pointer flex-col gap-4 p-5 focus-within:ring-2 focus-within:ring-secondary/40"
      role="link"
      tabIndex={0}
      aria-label={name}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest('a, button, input, select, textarea, [data-no-card-nav]')) return;
        router.push(detailHref);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          router.push(detailHref);
        }
      }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-bg">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted">{categoryName}</div>
        <h3 className="mt-2 text-lg font-semibold text-text">{name}</h3>
        <p className="mt-2 text-sm text-muted">{desc}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant, index) => (
          <span
            key={`${product.id}-${index}`}
            className="rounded-full border border-border bg-bg px-3 py-1 text-xs text-muted"
            title={variant.note}
          >
            {variant.label}
          </span>
        ))}
      </div>
      <div className="text-xs text-muted">
        {compat}{moreCount > 0 ? ` +${moreCount}` : ''}
      </div>
      <div className="mt-auto">
        <a className="btn-primary w-full" href={buildWhatsappLink(message)} data-no-card-nav>
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}
