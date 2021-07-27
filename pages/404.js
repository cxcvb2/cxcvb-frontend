import Header from '../components/Header/Header'
import s from '../styles/404.module.css'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'
// import { useIntl } from '../hooks/useIntl'

export default function DashboardPage() {
  // const { f } = useIntl()
  return (
    <>
      <Header />
      <Navigation />
      <main className={s.main}>
        <h1 className={s.errmessage}>something goes wrong :(</h1>
      </main>
      <Footer />
    </>
  )
}
