import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
