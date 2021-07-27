import { LoadVideos } from '../api/api'

const LOAD_VIDEOS = 'searchVideos/LOAD_VIDEOS'
const InitalState = {
  videos: [],
}

const SearchVideosReducer = (state = InitalState, action) => {
  switch (action.type) {
    case LOAD_VIDEOS: {
      return {
        ...state,
        videos: [...action.result],
      }
    }
    default: {
      return { ...state }
    }
  }
}
export const LoadVideosAction = (videos) => ({
  type: LOAD_VIDEOS,
  videos,
})

export const LoadVideosThunk =
  ({ callId, query }) =>
  async (dispatch) => {
    const response = await LoadVideos({ callId, query })
    dispatch(LoadVideosAction(response))
  }

export default SearchVideosReducer
