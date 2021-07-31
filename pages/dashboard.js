import s from '../styles/DashboardPage.module.css'
import Link from 'next/link'
import Transparentbtn from '../components/auxiliary-elements/Buttons/Transparentbtn/Transparentbtn'
import { useIntl } from '../hooks/useIntl'
import MainLayout from '../components/Layout/MainLayout'

export default function DashboardPage() {
  const { f } = useIntl()
  return (
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
  )
}
