import '../styles/globals.css'
import MainLayout from '../components/Layout/MainLayout'
import { IntlProvider } from 'react-intl'
import Router from 'next/router'
import useLang from '../content/locale'
import React from 'react'
import Loader from '../components/auxiliary-elements/Loader/Loader'

function MyApp({ Component, pageProps }) {
  const { messages, locale, defaultLocale } = useLang()
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <MainLayout>
        {loading && <Loader />} <Component {...pageProps} />
      </MainLayout>
    </IntlProvider>
  )
}

export default MyApp
