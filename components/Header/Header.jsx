import s from './header.module.css'
import SearchInput from '../auxiliary-elements/SearchInput/SearchInput'
import Link from 'next/link'
import Navigation from '../Navigation/Navigation'
import { useState, useRef, useEffect } from 'react'
export default function Header() {
  const [keycode, setkeycode] = useState(null)
  const inputRef = useRef()
  console.log('e.keyCode')

  useEffect(() => {
    const onKeykeydown = (e) => {
      console.log(
        document.activeElement.id,
        inputRef.current.id,
        document.activeElement.id === inputRef.current.id
      )

      // when state is 0 and user lose focus of input and press again 0 component doesnt rerender, for that setCayCode(null) to rerender
      if (Number(keycode) === 0) {
        setkeycode(null)
      }

      if (document.activeElement.id !== inputRef.current.id) {
        setkeycode(e.keyCode)
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
        <SearchInput keycode={keycode} inputRef={inputRef} />
      </div>
      <Navigation keycode={keycode} />
    </header>
  )
}
