import axios from 'axios';

const API_URL = 'http://localhost:2222/api/books';

export const getBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/search/${id}`);
  return response.data;
};

// export const createBook = async (bookData) => {
//   const response = await axios.post(API_URL, bookData);
//   return response.data;
// };

// export const updateBook = async (id, bookData) => {
//   const response = await axios.put(`${API_URL}/${id}`, bookData);
//   return response.data;
// };

// export const deleteBook = async (id) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };