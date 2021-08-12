import { useRouter } from 'next/router'
import { useEffect } from 'react'
import s from './SearchInputRecDropdown.module.css'
export default function SearchInputRecDropdown({
  searchInputRec,
  setSearchInputVal,
  setIsSearchInputRecOpened,
  searchInputWrapper,
}) {
  const { push } = useRouter()
  const handleOnClick = (e) => {
    setSearchInputVal(e.target.innerText)
    push(`/${e.target.innerText}?p=1`)
    setIsSearchInputRecOpened(false)
  }
  useEffect(() => {
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
  }, [])
  return (
    <ul className={s.searchInputRec_wrapper}>
      {searchInputRec.map(({ title }) => (
        <li key={title} className={s.searchInputRec_el} onClick={handleOnClick}>
          {title}
        </li>
      ))}
    </ul>
  )
}
