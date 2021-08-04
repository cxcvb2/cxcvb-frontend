import { useState, useEffect, useRef } from 'react'
import s from './KeyCodeInput.module.css'
import { useStore } from 'effector-react'
import {
  changeKeyCode,
  $IsKeyInputOpened,
  openKeyInput,
} from '../../../../effector/SearchedPage'

export default function KeyCodeInput() {
  const [inputValue, setInputValue] = useState('')
  const IsKeyInputOpened = useStore($IsKeyInputOpened)
  const keyInputRef = useRef()
  const [onKeydownTimeout, setOnKeydownTimeout] = useState(null)

  useEffect(() => {
    const onKeydown = (e) => {
      if (
        document.activeElement !== keyInputRef.current &&
        47 <= Number(e.keyCode) &&
        Number(e.keyCode) <= 57
      ) {
        openKeyInput()
        keyInputRef.current.focus()
      }
    }
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [])

  const keyCodechangeing = (value) => {
    clearTimeout(onKeydownTimeout)
    changeKeyCode(value)
    setInputValue('')
    openKeyInput()
  }

  const handleOnChange = (event) => {
    const value = Number(event.target.value) || inputValue
    clearTimeout(onKeydownTimeout)

    setInputValue(value)

    console.log(value, Number(event.target.value))
    const timeOut = setTimeout(() => {
      keyCodechangeing(value)
    }, 2000)

    setOnKeydownTimeout(timeOut)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(inputValue)
    keyCodechangeing(inputValue)
  }
  const KeyCodeInputClasses = !IsKeyInputOpened
    ? `${s.KeyCodeInput_wrapper} ${s.KeyCodeInput_Hidden}`
    : s.KeyCodeInput_wrapper
  return (
    <>
      <form onSubmit={handleOnSubmit} className={KeyCodeInputClasses}>
        <input
          value={inputValue}
          onChange={handleOnChange}
          type="text"
          maxLength="5"
          className={s.KeyCodeInput}
          ref={keyInputRef}
        />
      </form>
    </>
  )
}
