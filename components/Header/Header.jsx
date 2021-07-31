import s from './header.module.css'
import SearchInput from '../auxiliary-elements/SearchInput/SearchInput'
import Link from 'next/link'
import Navigation from '../Navigation/Navigation'
import { useState, useRef, useEffect } from 'react'
export default function Header() {
  const [keyCode, setkeyCode] = useState(null)
  const inputRef = useRef()
  console.log('e.keyCode')

  useEffect(() => {
    const onKeykeydown = (e) => {
      console.log(
        document.activeElement.id,
        inputRef.current.id,
        document.activeElement.id === inputRef.current.id
      )
      // alert(`knopken ${e.keyCode} ${e.key}`)
      // when state is 0 and user lose focus of input and press again 0 component doesnt rerender, for that setCayCode(null) to rerender

      alert(`${e.keyCode}, ${e.key}, 'knopken ktcvec'`)
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
