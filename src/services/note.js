import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newNote => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = await axios.post(baseUrl, newNote, config)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken };

