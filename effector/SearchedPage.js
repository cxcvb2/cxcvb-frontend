import { createEvent, createStore } from 'effector'

export const addFilmCards = createEvent()
export const $filmCards = createStore([])
$filmCards.on(addFilmCards, (prevFilmCards, FilmCards) => {
  console.log('prevFilmCards', prevFilmCards, FilmCards[0], 'FilmCards')
  return FilmCards
})

export const changeKeyCode = createEvent()
export const $keyCode = createStore(null)
$keyCode.on(changeKeyCode, (_, key) => key)

export const openKeyInput = createEvent()
export const $IsKeyInputOpened = createStore(false)
$IsKeyInputOpened.on(openKeyInput, (openclose) => !openclose)
