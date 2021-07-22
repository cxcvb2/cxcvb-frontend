import Link from 'next/link'
import s from './Navigation.module.css'
import { useIntl } from '../../hooks/useIntl'

export default function Navigation() {
  const { f } = useIntl()
  return (
    <>
      <nav className={s.nav}>
        <div className={s.nav__wrapper}>
          <Link href="/">
            <a className={`${s.nav__item} ${s.nav__item_active}`}>
              {f('dashboard')}(1)
            </a>
          </Link>
          <Link href="/films">
            <a className={s.nav__item}> {f('films')}(2)</a>
          </Link>
          <Link href="/serials">
            <a className={s.nav__item}>{f('serials')}(3)</a>
          </Link>
          <Link href="/onlinetv">
            <a className={s.nav__item}>{f('onlinetv')}(4)</a>
          </Link>
        </div>
      </nav>
    </>
  )
}
