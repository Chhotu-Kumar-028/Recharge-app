import axios from 'axios';
const api = axios.create({ baseURL: 'https://backend.onrender.com/api' });
console.log(api.getUri({ url: '/auth/register' }));
console.log(api.getUri({ url: 'auth/register' }));
