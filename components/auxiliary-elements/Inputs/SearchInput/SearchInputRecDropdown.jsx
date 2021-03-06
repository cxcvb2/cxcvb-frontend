import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import s from './SearchInputRecDropdown.module.css'
import { encode } from 'url-encode-decode'

export default function SearchInputRecDropdown({
  searchInputRec,
  setSearchInputVal,
  setIsSearchInputRecOpened,
  searchInputWrapper,
}) {
  const router = useRouter()
  const [chosenRec, setChosenRec] = useState(-1)
  const searchInputRecLength = searchInputRec?.length
  const searchByRec = useCallback(
    (rec) => {
      setIsSearchInputRecOpened(() => false)
      setSearchInputVal(rec)
      const opened = router.query.opened
      const query = opened
        ? `/${encode(rec)}&opened=${opened}`
        : `/${encode(rec)}`
      router.push(query)
    },
    [router, setIsSearchInputRecOpened, setSearchInputVal]
  )

  const handleOnClick = (e) => {
    searchByRec(e.target.innerText)
  }

  useEffect(() => {
    const chooseRecOnkeyDown = (e) => {
      if (e.keyCode === 38 && chosenRec > -1) {
        setChosenRec((chosenRec) => chosenRec - 1)
      } else if (e.keyCode === 40 && searchInputRecLength > chosenRec + 1) {
        setChosenRec((chosenRec) => chosenRec + 1)
      } else if (e.keyCode === 13 && chosenRec !== -1) {
        searchByRec(searchInputRec[chosenRec].title)
      }
    }

    document.addEventListener('keydown', chooseRecOnkeyDown)

    const clickOutSideListener = (e) => {
      const searchInputWrappertrg = searchInputWrapper.current
      let targetElement = e.target // clicked element

      do {
        if (targetElement == searchInputWrappertrg) {
          // This is a click inside. Do nothing, just return.
          return
        }
        // Go up the DOM
        targetElement = targetElement.parentNode
      } while (targetElement)
      // This is a click outside.
      setIsSearchInputRecOpened(false)
    }
    document.addEventListener('click', clickOutSideListener)
    return () => {
      document.removeEventListener('keydown', chooseRecOnkeyDown)
      document.removeEventListener('click', clickOutSideListener)
    }
  }, [
    searchInputRec,
    chosenRec,
    searchByRec,
    searchInputRecLength,
    searchInputWrapper,
    setIsSearchInputRecOpened,
  ])

  return (
    <ul className={s.searchInputRec_wrapper}>
      {searchInputRec.map(({ title }, i) => (
        <li
          key={title}
          className={`${s.searchInputRec_el} ${
            chosenRec === i && s.searchInputRec_el_active
          }`}
          onClick={handleOnClick}
        >
          {title}
        </li>
      ))}
    </ul>
  )
}
