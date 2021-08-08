import Image from 'next/image'
import s from './searchInput.module.css'
import { useIntl } from '../../../../hooks/useIntl'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function SearchInput({ inputRef, keyCode }) {
  const { f } = useIntl()
  const router = useRouter()
  const { query } = router.query
  const [searchInputVal, setSearchInputVal] = useState(query || '')

  useEffect(() => {
    if (keyCode === 0) {
      //on focus to input value appends 0: stop for don't appending
      setTimeout(() => {
        inputRef.current.focus()
      }, 1)
    }
  }, [keyCode])
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInputVal !== '' && query !== searchInputVal) {
      router.push(`${searchInputVal}?p=1`)
    }
  }
  const handleSearchonChange = (e) => {
    console.log(e.target.value)
    setSearchInputVal(e.target.value)
  }

  return (
    <form onSubmit={handleSearchSubmit} className={s.search_wrapper}>
      <label className={s.searchIcon__wrapper} htmlFor="searchInputVal">
        <Image
          src="/images/searchIcon.svg"
          width={30}
          height={30}
          alt="cxcvb search"
        />
      </label>
      <input
        ref={inputRef}
        id="searchInputVal"
        className={s.search_wrapper__input}
        type="text"
        placeholder={f('search') + '(0)'}
        value={searchInputVal}
        onChange={handleSearchonChange}
      />
    </form>
  )
}
