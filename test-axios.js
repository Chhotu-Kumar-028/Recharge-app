const axios = require('axios');

const api1 = axios.create({ baseURL: 'https://example.com/api' });
console.log(api1.getUri({ url: '/auth/register' }));

const api2 = axios.create({ baseURL: 'https://example.com/api/' });
console.log(api2.getUri({ url: 'auth/register' }));

const api3 = axios.create({ baseURL: 'https://example.com/api' });
console.log(api3.getUri({ url: 'auth/register' }));
