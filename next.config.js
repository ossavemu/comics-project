/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['imgs.xkcd.com']
  },
  i18n: {
    locales: ['en', 'es', 'pt'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig
