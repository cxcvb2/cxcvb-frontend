import Header from '../components/Header/Header'
import s from '../styles/Home.module.css'
import Link from 'next/link'
import Transparentbtn from '../components/auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'
import { useIntl } from '../hooks/useIntl'

export default function Dashboard() {
  const { f } = useIntl()
  return (
    <>
      <Header />
      <Navigation />
      <main className={s.main}>
        <div className={s.btns_wrapper}>
          <Link href="/signin">
            <a className={s.speedtestbtn}>
              <Transparentbtn>{f('signin')}</Transparentbtn>
            </a>
          </Link>
          <a
            href="https://www.speedtest.net/ru"
            target="_blank"
            className={s.speedtestbtn}
            rel="noreferrer"
          >
            <Transparentbtn>{f('speedtest')}</Transparentbtn>
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}
