import '../styles/globals.css'

import React from 'react'
import App from 'next/app'
import MainLayout from '../components/Layout/MainLayout'

 

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

    return { ...appProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    )
  }
}

export default MyApp
