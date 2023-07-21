import axios from 'axios'
const baseUrl = 'http://localhost:5001/api/notes'

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
  const request = await axios.post(baseUrl, newNote, config)
  return request.data
}

export default { getAll, create, setToken };
