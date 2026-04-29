const express = require('express');
const cors = require('cors');
const request = require('supertest');

const app = express();
app.use(cors({
  origin: ['http://localhost:5173']
}));

app.use('*', (req, res) => res.status(404).json({ message: 'API route not found' }));

request(app)
  .options('/api/auth/register')
  .set('Origin', 'https://recharge-app-ten.vercel.app')
  .end((err, res) => {
    console.log(res.status);
    console.log(res.body);
  });
