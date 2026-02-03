import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, resolveLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import type { Category, Product } from '@/lib/types';
import { getSiteUrl, siteName } from '@/lib/site';
import ProductClient from './ProductClient';

const productList = products as Product[];
const categoryList = categories as Category[];

function getCategoryName(locale: Locale, categoryId: string) {
  const category = categoryList.find((item) => item.id === categoryId);
  if (!category) return categoryId;
  return locale === 'ar' ? category.name_ar : category.name_en;
}

function getProductById(id: string) {
  return productList.find((product) => product.id === id);
}

export async function generateStaticParams() {
  return productList.flatMap((product) =>
    locales.map((locale) => ({
      locale,
      id: product.id
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const activeLocale = resolveLocale(locale);
  const product = getProductById(id);
  if (!product) return {};

  const name = activeLocale === 'ar' ? product.name_ar : product.name_en;
  const description = activeLocale === 'ar' ? product.description_ar : product.description_en;
  const base = new URL(getSiteUrl());
  const path = `/${activeLocale}/products/${product.id}`;
  const canonical = new URL(path, base);

  return {
    metadataBase: base,
    title: `${name} | ${siteName}`,
    description,
    alternates: {
      canonical,
      languages: {
        ar: new URL(`/ar/products/${product.id}`, base),
        en: new URL(`/en/products/${product.id}`, base)
      }
    },
    openGraph: {
      title: name,
      description,
      url: canonical,
      siteName,
      type: 'website',
      locale: activeLocale === 'ar' ? 'ar_EG' : 'en_US'
    },
    twitter: {
      card: 'summary',
      title: name,
      description
    }
  };
}

export default async function ProductProfile({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const activeLocale = resolveLocale(locale);
  const product = getProductById(id);
  if (!product) notFound();

  const categoryName = getCategoryName(activeLocale, product.category);

  return (
    <Suspense fallback={null}>
      <ProductClient locale={activeLocale} product={product} categoryName={categoryName} />
    </Suspense>
  );
}
