import s from './header.module.css'
import SearchInput from '../auxiliary-elements/Inputs/SearchInput/SearchInput'
import Link from 'next/link'
import Navigation from '../Navigation/Navigation'
import { useRef, useEffect } from 'react'
import { useStore } from 'effector-react'
import { $keyCode, changeKeyCode } from '../../effector/SearchedPage'

export default function Header() {
  const keyCode = useStore($keyCode)
  const inputRef = useRef()
  useEffect(() => {
    console.log(keyCode)
    // when state is 0 and user lose focus of input and press again 0 component doesnt rerender, for that setCayCode(null) to rerender
    if (keyCode === 0) {
      changeKeyCode(null)
    }

    if (document.activeElement.id !== inputRef.current.id) {
      changeKeyCode(keyCode)
    }
  }, [keyCode])
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
