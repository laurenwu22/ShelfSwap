import axios from 'axios';

const API_URL = 'https://shelfswap-backend-d1d8b8a07f87.herokuapp.com/api/books';

export const getBooks = async () => {
    try {
      const response = await axios.get(API_URL, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
};

export const getBookByQuery = async (id) => {
  const response = await axios.get(`${API_URL}/search/${id}`, { withCredentials: true });
  return response.data;
};

export const postBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/list`, bookData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error posting book:', error);
    throw error;
  }
};

export const searchGoogleBooks = async (query) => {
    const response = await axios.post(`${API_URL}/search`, query, { withCredentials: true });
    return response.data;
}

export const selectBook = async (id) => {
    const response = await axios.get(`${API_URL}/find/id`, { withCredentials: true });
    return response.data;
}

export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
        return response.data;
      } catch (error) {
        console.error('Error finding book in database:', error);
        throw error;
    }
}

// export const updateBook = async (id, bookData) => {
//   const response = await axios.put(`${API_URL}/${id}`, bookData);
//   return response.data;
// };

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};