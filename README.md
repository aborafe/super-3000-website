# Super 3000 Website

Bilingual (AR/EN) informational company profile for wholesale car spare parts & oils.

## Setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run start
```

## Environment

Create `.env.local` based on `.env.example`:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=+2010XXXXXXX
NEXT_PUBLIC_SITE_URL=https://example.com
```

## Updating product data

All catalog data is static JSON in `/data`:

- `data/categories.json`
- `data/cars.json`
- `data/products.json`

### Product schema (example)

```json
{
  "id": "oil-5w30-premium",
  "name_ar": "...",
  "name_en": "...",
  "category": "oils",
  "description_ar": "...",
  "description_en": "...",
  "variants": [
    { "origin": "Korean", "sku": "...", "note_ar": "...", "note_en": "..." }
  ],
  "compatibleCars": [
    { "make": "Hyundai", "model": "Elantra", "years": [2012, 2013, 2014] }
  ]
}
```

No prices are shown on the website. All orders must be requested via WhatsApp.
