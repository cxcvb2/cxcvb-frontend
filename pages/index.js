import Header from '../components/Header/Header'
import s from '../styles/DashboardPage.module.css'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'
// import { useIntl } from '../hooks/useIntl'

export default function index() {
  // const { f } = useIntl()
  return (
    <>
      <Header />
      <Navigation />
      <main className={s.main}>nothing yet</main>
      <Footer />
    </>
  )
}
