import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,

  // مهم جداً لـ GitHub Pages
  output: "export",

  // عشان الصور تشتغل بدون سيرفر
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp']
  },

  // اسم الريبو عندك
  basePath: "/super-3000-website",
  assetPrefix: "/super-3000-website/"
};

export default withNextIntl(nextConfig);
