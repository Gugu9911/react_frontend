import axios from 'axios';

const baseUrl = '/api/search'; 

const search = async (term) => {
    const response = await axios.get(`${baseUrl}?term=${term}`);
    return response.data;
}

// Assign the object to a variable before exporting
const searchService = { search };

export default searchService;
