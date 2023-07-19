import axios from 'axios';

const baseUrl = 'http://localhost:5001/api/login';

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
}

// Assign the object to a variable before exporting
const loginService = { login };

export default loginService;
