const { withEffectoReactAliases } = require('effector-next/tools')

const enhance = withEffectoReactAliases()
module.exports = enhance({
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'tr'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['localhost'],
  },
})
