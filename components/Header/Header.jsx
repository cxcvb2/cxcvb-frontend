import s from './header.module.css'
import SearchInput from '../auxiliary-elements/SearchInput/SearchInput'
import Link from 'next/link'
import Navigation from '../Navigation/Navigation'
import { useState, useRef, useEffect } from 'react'
export default function Header() {
  const [keyCode, setkeyCode] = useState(null)
  const inputRef = useRef()

  useEffect(() => {
    const onKeykeydown = (e) => {
      // when state is 0 and user lose focus of input and press again 0 component doesnt rerender, for that setCayCode(null) to rerender
      if (Number(e.keyCode) === 48) {
        setkeyCode(null)
      }

      if (document.activeElement.id !== inputRef.current.id) {
        setkeyCode(e.keyCode)
      }
    }
    document.addEventListener('keydown', onKeykeydown)
    return () => {
      document.removeEventListener('keydown', onKeykeydown)
    }
  }, [])
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
