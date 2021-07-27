import s from './header.module.css'
import SearchInput from '../auxiliary-elements/SearchInput/SearchInput'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={s.header}>
      <Link href="/">
        <a>
          <h1 className={s.header__title}>cxcvb</h1>
        </a>
      </Link>
      <SearchInput />
    </header>
  )
}
