import axios from 'axios';
import { getToken } from '../utils/token';

export const api = axios.create({
  baseURL: '/api', // Proxied by Vite to http://localhost:5000/api
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
