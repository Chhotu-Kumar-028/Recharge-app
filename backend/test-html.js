const axios = require('axios');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<!DOCTYPE html><html><body>hello</body></html>');
});

server.listen(4000, async () => {
  try {
    const res = await axios.post('http://localhost:4000/api/auth/register', { data: 1 });
    console.log('Success:', res.data);
  } catch (err) {
    console.log('Error:', err.message);
    console.log('Error Data:', err.response?.data);
  }
  server.close();
});
