import { createDomain, sample } from 'effector'
import { LoadVideos } from '../api/api'

export const app = createDomain('rootDomain')

export const addFilmCards = app.createEvent()
export const $filmCards = app.createStore([], { sid: 'filmCards' })

// $filmCards.on(addFilmCards, (state, filmcards) => {
//   console.log(state, 'state', $filmCards.getState())
//   return [...state, ...filmcards]
// })

export const FetchFilmCards = app.createEffect(
  async ({ call, query, count, state, ...s }) => {
    console.log({ call, query, count, state, s })
    const page = query.p || 1
    const { result } = await LoadVideos({
      call,
      query: query.query,
      page,
      count,
    })

    return result
  }
)

sample({
  clock: addFilmCards,
  source: $filmCards,
  fn: (state, filmCards) => {
    console.log(state, 'state', filmCards, 'card')
    return { state, ...filmCards }
  },
  target: FetchFilmCards,
})

// FetchFilmCards.doneData.watch((state) => {
//   addFilmCards([...state])
// })
$filmCards.on(FetchFilmCards.doneData, (state, FilmCards) => {
  return [...state, ...FilmCards]
})

export const $changeKeyCode = app.createEvent()
export const $keyCode = app.createStore(null)
$keyCode.on($changeKeyCode, (_, key) => key)

export const $openkeyInput = app.createEvent()
export const $IsKeyInputOpened = app.createStore(false)
$IsKeyInputOpened.on($openkeyInput, (openclose) => !openclose)
