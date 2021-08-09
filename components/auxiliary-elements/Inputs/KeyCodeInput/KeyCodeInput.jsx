import { useState, useEffect, useRef } from 'react'
import s from './KeyCodeInput.module.css'
import { useStore } from 'effector-react'
import {
  changeKeyCode,
  $IsKeyInputOpened,
  openKeyInput,
} from '../../../../store/searchedPage'

export default function KeyCodeInput({ inputRef }) {
  const [inputValue, setInputValue] = useState('')
  const IsKeyInputOpened = useStore($IsKeyInputOpened)
  const keyInputRef = useRef()
  const [onKeydownTimeout, setOnKeydownTimeout] = useState(null)

  useEffect(() => {
    const onKeydown = (e) => {
      if (
        document.activeElement !== keyInputRef.current &&
        document.activeElement !== inputRef.current
      ) {
        if (49 <= Number(e.keyCode) && Number(e.keyCode) <= 57) {
          openKeyInput()
          keyInputRef.current.focus()
        } else if (48 === Number(e.keyCode)) {
          // when state is 0 and user lose focus of input and press again 0 component doesnt rerender, for that setCayCode(null) to rerender
          changeKeyCode(null)
          changeKeyCode(0)
        }
      }
    }
    document.addEventListener('keydown', onKeydown)
    return () => {
      document.removeEventListener('keydown', onKeydown)
    }
  }, [])

  const keyCodechangeing = (value) => {
    clearTimeout(onKeydownTimeout)
    console.log('change ', value)
    value && changeKeyCode(value)
    setInputValue('')
    openKeyInput()
  }

  const handleOnChange = (event) => {
    let value = inputValue
    if (Number(event.target.value)) {
      value = Number(event.target.value)
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
          maxLength="6"
          className={s.KeyCodeInput}
          ref={keyInputRef}
        />
      </form>
    </>
  )
}
