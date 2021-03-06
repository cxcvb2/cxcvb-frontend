import s from './header.module.css'
import SearchInput from '../auxiliary-elements/Inputs/SearchInput/SearchInput'
import Link from 'next/link'
import Navigation from '../Navigation/Navigation'
import { useSelector } from 'react-redux'

export default function Header({ inputRef }) {
  const keyCode = useSelector((state) => state.filmCardsPage.keyCode)

  return (
    <header>
      <div className={s.header}>
        <Link href="/">
          <a>
            <h1 className={s.header__title}>cxcvb</h1>
          </a>
        </Link>
        <SearchInput inputRef={inputRef} />
      </div>
      <Navigation keyCode={keyCode} />
    </header>
  )
}
