import '../styles/globals.css'
import React, { useEffect } from 'react'
import App from 'next/app'
import { IntlProvider } from 'react-intl'
import useLang from '../content/locale'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import HeadLoayout from '../components/Layout/HeadLoayout'
import DeviceDetector from 'device-detector-js'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  const { messages, locale, defaultLocale } = useLang(router)
  useEffect(() => {
    ;(async () => {
      if (window) {
        const { MetacomCreate } = await import('../hooks-utils/useMetacom')
        MetacomCreate()
        const { MetacomListenShareUrl } = await import(
          '../hooks-utils/useMetacom'
        )
        MetacomListenShareUrl('hi')
        const { MetacomGetDevices } = await import('../hooks-utils/useMetacom')
        MetacomGetDevices()
      }
    })()
  }, [])
  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <HeadLoayout />
        <Component {...pageProps} />
      </IntlProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const userAgent = appContext.ctx.req.headers['user-agent']
  console.log(userAgent)
  const deviceDetector = new DeviceDetector()
  const { device, os } = deviceDetector.parse(userAgent)

  const appProps = await App.getInitialProps(appContext)
  if (appContext.ctx?.req?.headers['accept-language']) {
    const locales = appContext.router.locales
    const locale = appContext.router.locale
    const regex = /([^-;]*)(?:-([^;]*))?(?:;q=([0-9]\.[0-9]))?/
    const accept_languages =
      appContext.ctx.req.headers['accept-language'].match(regex)
    // by default accept_language is 'en'
    const accept_language =
      locales.find((local) => accept_languages.includes(local)) ||
      appContext.router.defaultLocale

    if (appContext.ctx.res && accept_language !== locale) {
      appContext.ctx.res.writeHead(307, {
        Location: `/${accept_language}${appContext.router.asPath}`,
      })
      appContext.ctx.res.end()
    }
  }

  return { ...appProps }
}

export default MyApp
