import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

const initialState = {
  filmCards: [],
  keyCode: null,
}

const ADD_FILM_CARDS = 'ADD_FILM_CARDS'
const CHANGE_KEY_CODE = 'CHANGE_KEY_CODE'
const RESET_FILM_CARDS = 'RESET_FILM_CARDS'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILM_CARDS: {
      return {
        ...state,
        filmCards: [...state.filmCards, ...action.filmCards],
      }
    }
    case CHANGE_KEY_CODE: {
      return {
        ...state,
        keyCode: action.keyCode,
      }
    }
    case RESET_FILM_CARDS: {
      return {
        ...state,
        filmCards: [...action.filmCards],
      }
    }
    default: {
      return state
    }
  }
}

export const changeKeyCodeAction = (keyCode) => ({
  type: CHANGE_KEY_CODE,
  keyCode,
})

export const addFilmCardsAction = (filmCards) => ({
  type: ADD_FILM_CARDS,
  filmCards,
})

export const resetFilmCardsAction = (filmCards) => ({
  type: RESET_FILM_CARDS,
  filmCards,
})

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
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
