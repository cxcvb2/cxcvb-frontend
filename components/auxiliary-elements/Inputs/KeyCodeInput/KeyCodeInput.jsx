import { useState, useEffect, useRef } from 'react'
import s from './KeyCodeInput.module.css'
import { changeKeyCodeAction } from '../../../../redux/store'
import { useDispatch } from 'react-redux'
import NavigateOnKeyCodeChange from '../../../../hooks-utils/NavigateOnKeyCodeChange'
import { useRouter } from 'next/router'

export default function KeyCodeInput({ inputRef }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [isKeyInputOpened, setIsKeyInputOpened] = useState(false)
  const keyInputRef = useRef()
  const [onKeydownTimeout, setOnKeydownTimeout] = useState(null)

  useEffect(() => {
    const onKeydown = (e) => {
      if (
        document.activeElement !== keyInputRef.current &&
        document.activeElement !== inputRef.current
      ) {
        if (49 <= parseInt(e.keyCode) && parseInt(e.keyCode) <= 57) {
          setIsKeyInputOpened(true)
          keyInputRef.current.focus()
        } else if (48 === parseInt(e.keyCode)) {
          setTimeout(() => {
            //on focus to input value appends 0: stop for don't appending
            inputRef.current.focus()
          }, 1)
          dispatch(changeKeyCodeAction(0))
        }
      }
    }
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [inputRef, changeKeyCodeAction, setIsKeyInputOpened])

  const keyCodechangeing = (value) => {
    clearTimeout(onKeydownTimeout)

    if (value) {
      NavigateOnKeyCodeChange({ keyCode: value, router })
      dispatch(changeKeyCodeAction(value))
    }
    setInputValue('')
    setIsKeyInputOpened(false)
  }

  const handleOnChange = (event) => {
    let value = inputValue
    if (parseInt(event.target.value)) {
      value = parseInt(event.target.value)
    } else if (event.target.value === '') {
      value = event.target.value
    }
    clearTimeout(onKeydownTimeout)
    setInputValue(value)
    const timeOut = setTimeout(() => {
      keyCodechangeing(value)
    }, 2000)

    setOnKeydownTimeout(timeOut)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    keyCodechangeing(inputValue)
  }

  const KeyCodeInputClasses = !isKeyInputOpened
    ? `${s.KeyCodeInput_wrapper} ${s.KeyCodeInput_Hidden}`
    : s.KeyCodeInput_wrapper

  return (
    <>
      <form onSubmit={handleOnSubmit} className={KeyCodeInputClasses}>
        <input
          value={inputValue}
          onChange={handleOnChange}
          type="text"
          maxLength="6"
          className={s.KeyCodeInput}
          ref={keyInputRef}
        />
      </form>
    </>
  )
}
