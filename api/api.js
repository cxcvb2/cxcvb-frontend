import * as axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://92.63.106.41:8001',
})

export const apiCall = async (url, args) => {
  return await instance
    .post('/api', {
      call: 1,
      [url]: args,
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
