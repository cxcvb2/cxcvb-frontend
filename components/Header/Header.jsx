import s from './header.module.css'
import SearchInput from '../auxiliary-elements/Inputs/SearchInput/SearchInput'
import Link from 'next/link'
import Navigation from '../Navigation/Navigation'
import { $keyCode } from '../../store/model'
import { useStore } from 'effector-react'

export default function Header({ inputRef }) {
  const keyCode = useStore($keyCode)

  return (
    <header>
      <div className={s.header}>
        <Link href="/">
          <a>
            <h1 className={s.header__title}>cxcvb</h1>
          </a>
        </Link>
        <SearchInput keyCode={keyCode} inputRef={inputRef} />
      </div>
      <Navigation keyCode={keyCode} />
    </header>
  )
}
