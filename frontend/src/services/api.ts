import axios from 'axios';
import { getToken } from '../utils/token';

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) return '/api';
  // Remove trailing slash if present, then append /api if it doesn't already end with it
  const cleanUrl = url.replace(/\/$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
