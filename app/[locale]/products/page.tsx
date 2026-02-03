import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resolveLocale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';
import categories from '@/data/categories.json';
import cars from '@/data/cars.json';
import products from '@/data/products.json';
import type { Category, CarMake, Product } from '@/lib/types';
import ProductsExplorer from '@/components/ProductsExplorer';
import Reveal from '@/components/Reveal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  return buildMetadata(activeLocale, 'products', '/products');
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const activeLocale = resolveLocale(locale);
  const t = await getTranslations({ locale: activeLocale });
  const categoryList = categories as Category[];
  const carList = cars as CarMake[];
  const productList = products as Product[];
  const originLabels = t.raw('products.originLabels') as Record<string, string>;

  return (
    <div className="section space-y-6">
      <Reveal>
        <div>
          <h1 className="text-3xl font-semibold text-text">{t('products.title')}</h1>
          <p className="mt-3 text-sm text-muted">{t('products.intro')}</p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <div>
          <ProductsExplorer
            products={productList}
            categories={categoryList}
            cars={carList}
            locale={activeLocale}
            originLabels={originLabels}
            labels={{
              searchPlaceholder: t('products.searchPlaceholder'),
              filtersTitle: t('products.filtersTitle'),
              filterCategory: t('products.filterCategory'),
              filterOrigin: t('products.filterOrigin'),
              filterMake: t('products.filterMake'),
              filterModel: t('products.filterModel'),
              filterYear: t('products.filterYear'),
              findByCarTitle: t('products.findByCarTitle'),
              clearFilters: t('products.clearFilters'),
              noResults: t('products.noResults'),
              requestViaWhatsapp: t('cta.requestViaWhatsapp')
            }}
          />
        </div>
      </Reveal>
    </div>
  );
}
