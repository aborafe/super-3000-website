export type Category = {
  id: string;
  name_ar: string;
  name_en: string;
};

export type CarModel = {
  model: string;
  years: number[];
};

export type CarMake = {
  make: string;
  models: CarModel[];
};

export type ProductVariant = {
  origin: 'Korean' | 'Chinese' | 'Thai' | string;
  sku: string;
  note_ar: string;
  note_en: string;
};

export type CompatibleCar = {
  make: string;
  model: string;
  years: number[];
};

export type Product = {
  id: string;
  name_ar: string;
  name_en: string;
  category: string;
  image?: string;
  description_ar: string;
  description_en: string;
  variants: ProductVariant[];
  compatibleCars: CompatibleCar[];
};
