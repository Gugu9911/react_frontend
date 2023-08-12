import axios from 'axios';

// Base URL for your backend endpoints
const baseUrl = '/api/notes/like'; 

// Function to toggle the like status of a note.
const toggleLike = async (id) => {
    console.log(`Making request to like note with ID: ${id}`)
    try {
        const response = await axios.put(`${baseUrl}/${id}`);
        console.log("API response:",response.data);
        return response.data;

    } catch (error) {
        // Handle error scenarios here.
        // This could be returning a default error message, or 
        // re-throwing the error to be handled in the component.
        throw error;
    }
}

// Export the service functions to be used in components.
const likeService = { toggleLike };

export default likeService;
