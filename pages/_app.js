import '../styles/globals.css'
import React from 'react'
import App from 'next/app'
import { IntlProvider } from 'react-intl'
import useLang from '../content/locale'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import HeadLoayout from '../components/Layout/HeadLoayout'
import DeviceDetector from 'device-detector-js'
import ShareUrlModal from '../components/ShareUrl/ShareUrlModal'

function MyApp({ Component, pageProps, deviceName }) {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  const { messages, locale, defaultLocale } = useLang(router)

  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <HeadLoayout />
        <ShareUrlModal deviceName={deviceName} />
        <Component {...pageProps} />
      </IntlProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const userAgent = appContext?.ctx?.req?.headers['user-agent']
  const deviceDetector = new DeviceDetector()
  const { device, os } = deviceDetector.parse(userAgent)
  const deviceName = `${device?.model || device?.brand}, ${os?.name}`

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

  return { ...appProps, deviceName }
}

export default MyApp
