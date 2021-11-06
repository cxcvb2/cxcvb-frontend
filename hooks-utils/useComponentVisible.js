import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeShareUrlVisibility,
  // changeAcceptUrlVisibility,
} from '../redux/ShareUrlReducer'

export default function useComponentVisible() {
  const dispatch = useDispatch()
  const ref = useRef(null)

  const handleHideDropdown = (event) => {
    if (event.key === 'Escape') {
      dispatch(changeShareUrlVisibility(false))
      // dispatch(changeAcceptUrlVisibility(false))
    }
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(changeShareUrlVisibility(false))
      // dispatch(changeAcceptUrlVisibility(false))
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
