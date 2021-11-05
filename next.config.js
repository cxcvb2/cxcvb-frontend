module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'tr'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/k',
        destination: '/kids',
      },
    ]
  },
}
