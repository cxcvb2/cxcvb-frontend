import Image from 'next/image'
import s from './SearchInput.module.css'
import { useIntl } from '../../../../hooks/useIntl'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { LoadInputCompleteRec } from '../../../../api/api'
import SearchInputRecDropdown from './SearchInputRecDropdown'

export default function SearchInput({ inputRef, keyCode }) {
  const { f } = useIntl()
  const router = useRouter()
  const { query } = router.query
  const [searchInputVal, setSearchInputVal] = useState(query || '')
  const [searchCardsTimeout, setSearchCardsTimeout] = useState(null)
  const [searchInputRec, setSearchInputRec] = useState([])
  const [isSearchInputRecOpened, setIsSearchInputRecOpened] = useState(false)

  useEffect(() => {
    if (keyCode === 0) {
      //on focus to input value appends 0: stop for don't appending
      setTimeout(() => {
        inputRef.current.focus()
      }, 1)
    }
  }, [keyCode, inputRef])
  const loadRecomendation = async (value) => {
    if (value.replace(/\s/g, '').length && query !== value) {
      console.log(value)
      const { result } = await LoadInputCompleteRec({ call: 1, query: value })
      setSearchInputRec(result)
      if (result.length) {
        setIsSearchInputRecOpened(true)
      } else {
        setIsSearchInputRecOpened(false)
      }
      console.log(result)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInputVal.replace(/\s/g, '')?.length && query !== searchInputVal) {
      console.log(searchInputVal.replace(/\s/g, ''))
      router.push(`/${searchInputVal}?p=1`)
      setIsSearchInputRecOpened(false)
    }
  }

  const handleSearchonChange = (e) => {
    e.target.value === '' && setIsSearchInputRecOpened(false)
    clearTimeout(searchCardsTimeout)
    setSearchInputVal(e.target.value)

    const timeOut = setTimeout(() => {
      loadRecomendation(e.target.value)
    }, 2000)

    setSearchCardsTimeout(timeOut)
  }
  const search_input_rec_classes = isSearchInputRecOpened
    ? `${s.search_wrapper} ${s.search_wrapper__opened_rec}`
    : s.search_wrapper

  return (
    <div className={s.search_input_rec}>
      <form
        autoComplete="off"
        onSubmit={handleSearchSubmit}
        className={search_input_rec_classes}
      >
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
          maxLength="50"
        />
      </form>
      <SearchInputRecDropdown
        searchInputRec={searchInputRec}
        isSearchInputRecOpened={isSearchInputRecOpened}
        setIsSearchInputRecOpened={setIsSearchInputRecOpened}
      />
    </div>
  )
}
