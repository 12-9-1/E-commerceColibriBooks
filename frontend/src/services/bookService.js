// src/services/bookService.js
///api/books
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getBooks = async () => {
  const res = await axios.get(`${API_URL}/books`);
  return res.data;
};
