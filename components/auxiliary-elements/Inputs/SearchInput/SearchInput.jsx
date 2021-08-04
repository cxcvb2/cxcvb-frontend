import Image from 'next/image'
import s from './searchInput.module.css'
import { useIntl } from '../../../../hooks/useIntl'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
export default function SearchInput({ keyCode, inputRef }) {
  const { f } = useIntl()
  const router = useRouter()
  const { query } = router.query
  const [searchInput, setSearchInput] = useState(query || '')

  useEffect(() => {
    if (keyCode === 0) {
      inputRef.current.focus()
    }
  }, [keyCode])
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput !== '' && query !== searchInput) {
      router.push(searchInput)
    }
  }
  const handleSearchonChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <form onSubmit={handleSearchSubmit} className={s.search_wrapper}>
      <label className={s.searchIcon__wrapper} htmlFor="searchInput">
        <Image
          src="/searchIcon.svg"
          width={30}
          height={30}
          alt="cxcvb search"
        />
      </label>
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
  )
}
