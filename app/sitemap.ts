import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';
import products from '@/data/products.json';
import type { Product } from '@/lib/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const productList = products as Product[];
  const productRoutes = productList.flatMap((product) => [
    `/ar/products/${product.id}`,
    `/en/products/${product.id}`
  ]);
  const routes = [
    '/ar',
    '/en',
    '/ar/about',
    '/en/about',
    '/ar/products',
    '/en/products',
    '/ar/trader',
    '/en/trader',
    '/ar/contact',
    '/en/contact',
    ...productRoutes
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date()
  }));
}
