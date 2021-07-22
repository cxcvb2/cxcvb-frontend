import s from './header.module.css'
import SearchInput from '../auxiliary-elements/SearchInput/SearchInput'

export default function Header() {
  return (
    <header className={s.header}>
      <h1 className={s.header__title}>cxcvb</h1>
      <SearchInput />
    </header>
  )
}
