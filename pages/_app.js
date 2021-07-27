import '../styles/globals.css'
import MainLayout from '../components/Layout/MainLayout'
import { IntlProvider } from 'react-intl'

import useLang from '../content/locale'

function MyApp({ Component, pageProps }) {
  const { messages, locale, defaultLocale } = useLang()
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
