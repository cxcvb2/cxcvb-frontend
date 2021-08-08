import '../styles/globals.css'
import React from 'react'
import { withHydrate } from 'effector-next'
import App from 'next/app'
import { IntlProvider } from 'react-intl'
import useLang from '../content/locale'

const enhance = withHydrate()

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext)
    if (appContext.ctx?.req?.headers['accept-language']) {
      const locales = appContext.router.locales
      const locale = appContext.router.locale
      const regex = /([^-;]*)(?:-([^;]*))?(?:;q=([0-9]\.[0-9]))?/
      const accept_languages =
        appContext.ctx.req.headers['accept-language'].match(regex)
      // by default accept_language is 'en'
      let accept_language = appContext.router.defaultLocale

      for (let i of locales) {
        for (let j of accept_languages) {
          if (i === j) {
            accept_language = i
            break
          }
        }
      }
      if (appContext.ctx.res && accept_language !== locale) {
        appContext.ctx.res.writeHead(307, {
          Location: `/${accept_language}${appContext.router.asPath}`,
        })
        appContext.ctx.res.end()
      }
    }
    const { messages, locale, defaultLocale } = useLang()

    return { ...appProps, messages, locale, defaultLocale }
  }

  render() {
    const { Component, pageProps, messages, locale, defaultLocale } = this.props
    return (
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <Component {...pageProps} />
      </IntlProvider>
    )
  }
}

export default enhance(MyApp)
