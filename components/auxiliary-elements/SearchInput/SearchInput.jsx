import Image from 'next/image'
import s from './searchInput.module.css'
import { useIntl } from '../../../hooks/useIntl'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
export default function SearchInput() {
  const { f } = useIntl()
  const router = useRouter()
  const { query } = router.query
  const [searchInput, setSearchInput] = useState(query || '')
  const inputRef = useRef()

  useEffect(() => {
    const onKeykeydown = (e) => {
      if (Number(e.key) === 0) {
        inputRef.current.focus()
        console.log(searchInput)
      }
    }
    document.addEventListener('keydown', onKeykeydown)
    return () => {
      document.removeEventListener('keydown', onKeykeydown)
    }
  }, [])
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput !== '' && query !== searchInput) {
      router.push(searchInput)
    }
  }
  const handleSearchonChange = (e) => {
    setSearchInput(e.target.value)
    console.log(inputRef.current.value)
    console.log(e.target.value)
  }

  return (
    <div className={s.search_wrapper}>
      <label className={s.searchIcon__wrapper} htmlFor="searchInput">
        <Image
          src="/searchIcon.svg"
          width={30}
          height={30}
          alt="cxcvb search"
        />
      </label>
      <form onSubmit={handleSearchSubmit} className={s.searchInput__wrapper}>
        <input
          ref={inputRef}
          id="searchInput"
          className={s.search_wrapper__input}
          type="text"
          placeholder={f('search') + '(0)'}
          value={searchInput}
          onChange={handleSearchonChange}
        />
      </form>
    </div>
  )
}
