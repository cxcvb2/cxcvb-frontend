export const filmCardsInitialState = {
  filmCards: [],
  keyCode: null,
}

const ADD_FILM_CARDS = 'ADD_FILM_CARDS'
const CHANGE_KEY_CODE = 'CHANGE_KEY_CODE'
const RESET_FILM_CARDS = 'RESET_FILM_CARDS'

export const FilmCardsReducer = (state = filmCardsInitialState, action) => {
  switch (action.type) {
    case ADD_FILM_CARDS: {
      return {
        ...state,
        filmCards: [...state.filmCards, ...action.filmCards].filter(
          (v, i, a) => a.findIndex((t) => t.videoId === v.videoId) === i
        ),
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
        filmCards: [...action.filmCards].filter(
          (v, i, a) => a.findIndex((t) => t.videoId === v.videoId) === i
        ),
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
