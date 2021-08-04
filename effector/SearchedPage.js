import { createEvent, createStore } from 'effector'

export const changeKeyCode = createEvent()
export const $keyCode = createStore(null)
$keyCode.on(changeKeyCode, (_, key) => key)

export const openKeyInput = createEvent()
export const $IsKeyInputOpened = createStore(false)
$IsKeyInputOpened.on(openKeyInput, (openclose) => !openclose)
