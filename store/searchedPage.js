import root from './root-domain'
import { LoadVideos } from '../api/api'

export const addFilmCards = root.createEvent()
export const $filmCards = root.createStore([])
export const FetchFilmCards = root.createEffect(
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

export const changeKeyCode = root.createEvent()
export const $keyCode = root.createStore(null)
$keyCode.on(changeKeyCode, (_, key) => key)

export const openKeyInput = root.createEvent()
export const $IsKeyInputOpened = root.createStore(false)
$IsKeyInputOpened.on(openKeyInput, (openclose) => !openclose)
