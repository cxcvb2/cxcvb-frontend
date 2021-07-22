import '../styles/globals.css'
import MainLayout from '../components/Layout/MainLayout'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'
import * as locales from '../content/locale'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { locale, defaultLocale, pathname } = router
  const localeCopy = locales[locale]

  const messages = localeCopy[pathname]
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </IntlProvider>
  )
}

export default MyApp
