// src/services/bookService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getBooks = async () => {
  const res = await axios.get(`${API_URL}/books`);
  return res.data;
};

const baseURL = import.meta.env.VITE_API_URL;

fetch(`${baseURL}/api/libros`)
  .then(res => res.json())
  .then(data => console.log(data));
