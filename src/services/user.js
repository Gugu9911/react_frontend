import axios from 'axios'
const baseUrl = 'http://localhost:5001/api/users'

const register = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const userService = { register }
export default userService
