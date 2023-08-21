import axios from 'axios';

// Base URL for your backend endpoints
const baseUrl = '/api/notes/like'; 

const toggleLike = async (noteId, userId) => {
    try {
      const response = await axios.post(`${baseUrl}/${noteId}`, {
        userId
      });
  
      if (response.status !== 200) {
        throw new Error(response.data.error || "An error occurred while toggling the like");
      }
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};


export const getLikesCount = async (noteId) => {
    try {
      const response = await axios.get(`${baseUrl}/${noteId}`);
  
      if (response.status !== 200) {
        throw new Error(response.data.error || "An error occurred while fetching likes count");
      }
  
      return response.data.likesCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const hasUserLiked = async (noteId, userId) => {
  try {
      const response = await axios.get(`${baseUrl}/${noteId}/user/${userId}`);

      if (response.status !== 200) {
          throw new Error(response.data.error || "An error occurred while checking if user has liked");
      }

      return response.data.isLiked;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

const likeServices = { toggleLike, getLikesCount, hasUserLiked };
export default likeServices;



