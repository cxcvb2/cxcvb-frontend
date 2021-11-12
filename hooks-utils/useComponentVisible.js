import { useEffect, useRef } from 'react'

export default function useComponentVisible(handleOnClose) {
  const ref = useRef(null)

  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      handleOnClose()
    }
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleOnClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true)
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true)
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return { ref }
}
