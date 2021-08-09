import * as axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.baseURL,
})

export const LoadVideos = ({ call, query, page }) => {
  return instance
    .post('/api', {
      call,
      'videos.1/search': { query, page },
    })
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((e) => {
      console.log(e)
      //when we crate 404 page its will redirect there
      return { result: null }
    })
}
