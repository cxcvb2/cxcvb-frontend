import { createDomain } from 'effector'
import { LoadVideos } from '../api/api'

export const app = createDomain('rootDomain')

export const addFilmCards = app.createEvent()
const $filmCards = app.createStore([], { sid: 'filmCards' })
export const FetchFilmCards = app.createEffect(
  async ({ call, query, page }) => {
    const { result } = await LoadVideos({
      call,
      query,
      p: page,
    })
    return result
  }
)

$filmCards.on(FetchFilmCards.doneData, (prevFilmCards, FilmCards) => {
  return [...prevFilmCards, ...FilmCards]
})

export const changeKeyCode = app.createEvent()
export const $keyCode = app.createStore(null)
$keyCode.on(changeKeyCode, (_, key) => key)

export const openKeyInput = app.createEvent()
export const $IsKeyInputOpened = app.createStore(false)
$IsKeyInputOpened.on(openKeyInput, (openclose) => !openclose)
