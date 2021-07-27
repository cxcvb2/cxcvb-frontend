import { combineReducers } from 'redux'
import SearchVideosReducer from './seacrhVideos-reducer'
// COMBINED REDUCERS
const reducers = {
  videos: SearchVideosReducer,
}

export default combineReducers(reducers)
