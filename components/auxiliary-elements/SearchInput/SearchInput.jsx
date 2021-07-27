import Image from 'next/image'
import s from './searchInput.module.css'
import { useIntl } from '../../../hooks/useIntl'
import { useRouter } from 'next/router'
import { useState } from 'react'
export default function SearchInput() {
  const { f } = useIntl()
  const router = useRouter()
  const { query } = router.query
  const [searchInput, setSearchInput] = useState(query || '')

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
