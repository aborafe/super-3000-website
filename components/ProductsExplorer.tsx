'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CarMake, Category, Product } from '@/lib/types';
import ProductCard from './ProductCard';

export default function ProductsExplorer({
  products,
  categories,
  cars,
  locale,
  originLabels,
  labels
}: {
  products: Product[];
  categories: Category[];
  cars: CarMake[];
  locale: 'ar' | 'en';
  originLabels: Record<string, string>;
  labels: {
    searchPlaceholder: string;
    filtersTitle: string;
    filterCategory: string;
    filterOrigin: string;
    filterMake: string;
    filterModel: string;
    filterYear: string;
    findByCarTitle: string;
    clearFilters: string;
    noResults: string;
    requestViaWhatsapp: string;
  };
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [origin, setOrigin] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    setModel('');
    setYear('');
  }, [make]);

  useEffect(() => {
    setYear('');
  }, [model]);

  const categoryMap = useMemo(() => {
    return categories.reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = locale === 'ar' ? item.name_ar : item.name_en;
      return acc;
    }, {});
  }, [categories, locale]);

  const filteredProducts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return products.filter((product) => {
      const name = locale === 'ar' ? product.name_ar : product.name_en;
      const matchesSearch = !searchValue || name.toLowerCase().includes(searchValue);
      const matchesCategory = !category || product.category === category;
      const matchesOrigin = !origin || product.variants.some((variant) => variant.origin === origin);
      const matchesCar = !make
        ? true
        : product.compatibleCars.some((car) => {
            if (car.make !== make) return false;
            if (model && car.model !== model) return false;
            if (year) return car.years.includes(Number(year));
            return true;
          });

      return matchesSearch && matchesCategory && matchesOrigin && matchesCar;
    });
  }, [category, locale, make, model, origin, products, search, year]);

  const selectedMake = cars.find((item) => item.make === make);
  const models = selectedMake ? selectedMake.models.map((item) => item.model) : [];
  const years = selectedMake
    ? selectedMake.models.find((item) => item.model === model)?.years || []
    : [];

  const origins = Object.keys(originLabels);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
      <div className="card space-y-4 p-6">
        <div className="text-sm font-semibold text-text">{labels.filtersTitle}</div>
        <div className="space-y-3">
          <input
            className="input"
            placeholder={labels.searchPlaceholder}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label={labels.searchPlaceholder}
          />
          <select
            className="input"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label={labels.filterCategory}
          >
            <option value="">{labels.filterCategory}</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {locale === 'ar' ? item.name_ar : item.name_en}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            aria-label={labels.filterOrigin}
          >
            <option value="">{labels.filterOrigin}</option>
            {origins.map((item) => (
              <option key={item} value={item}>
                {originLabels[item]}
              </option>
            ))}
          </select>
          <div className="pt-2 text-xs font-semibold uppercase tracking-widest text-muted">
            {labels.findByCarTitle}
          </div>
          <select
            className="input"
            value={make}
            onChange={(event) => setMake(event.target.value)}
            aria-label={labels.filterMake}
          >
            <option value="">{labels.filterMake}</option>
            {cars.map((item) => (
              <option key={item.make} value={item.make}>
                {item.make}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={model}
            onChange={(event) => setModel(event.target.value)}
            aria-label={labels.filterModel}
            disabled={!make}
          >
            <option value="">{labels.filterModel}</option>
            {models.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            aria-label={labels.filterYear}
            disabled={!model}
          >
            <option value="">{labels.filterYear}</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn-outline w-full"
            onClick={() => {
              setSearch('');
              setCategory('');
              setOrigin('');
              setMake('');
              setModel('');
              setYear('');
            }}
          >
            {labels.clearFilters}
          </button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {filteredProducts.length === 0 ? (
          <div className="card col-span-full p-6 text-center text-sm text-muted">{labels.noResults}</div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              categoryName={categoryMap[product.category] || product.category}
              originLabels={originLabels}
              ctaLabel={labels.requestViaWhatsapp}
            />
          ))
        )}
      </div>
    </div>
  );
}
