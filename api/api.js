import * as axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.apiURL,
})

export const LoadVideos = async ({ call, query, page, count }) => {
  return await instance
    .post('/api', {
      call,
      'videos.1/search': { query, page, count },
    })
    .then((response) => {
      return response.data
    })
    .catch((e) => {
      console.log(e)
      //when we crate 404 page its will redirect there
      return { result: null }
    })
}

export const LoadInputCompleteRec = async ({ query, call }) => {
  return await instance
    .post('/api', {
      call,
      'videos/predict': { query },
    })
    .then((response) => {
      return response.data
    })
    .catch((e) => {
      console.log(e)
      //when we crate 404 page its will redirect there
      return { result: [] }
    })
}
