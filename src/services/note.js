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

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteNote = async note => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    
    const response = await axios.delete(`${baseUrl}/${note.id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;  // You can re-throw the error to handle it at a higher level or return a specific error message or object.
  }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, getOne , update, deleteNote};

