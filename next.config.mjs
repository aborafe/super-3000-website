import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');
const BASE_PATH = '/super-3000-website';

const nextConfig = {
  reactStrictMode: true,

  // مهم جداً لـ GitHub Pages
  output: "export",

  // عشان الصور تشتغل بدون سيرفر
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp']
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH
  },

  // اسم الريبو عندك
  basePath: BASE_PATH,
  assetPrefix: `${BASE_PATH}/`
};

export default withNextIntl(nextConfig);
