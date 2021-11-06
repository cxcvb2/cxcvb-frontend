import { useMemo } from 'react'
import { combineReducers, createStore } from 'redux'
import { FilmCardsReducer, filmCardsInitialState } from './filmCardsReducer'
import { ShareUrlReducer } from './ShareUrlReducer'

let store
const initialState = {
  filmCardsPage: { ...filmCardsInitialState },
}
function initStore(preloadedState = initialState) {
  return createStore(
    combineReducers({
      shareUrl: ShareUrlReducer,
      filmCardsPage: FilmCardsReducer,
    }),
    preloadedState
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (typeof window === 'undefined') {
    return _store
  }
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store

  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
