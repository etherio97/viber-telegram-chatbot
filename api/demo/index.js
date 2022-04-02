const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const axios = require('axios').default;

const app = express();

app.set('trust proxy', 1);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(helmet());

app.use(cors());

app.use(helmet());

app.get('/api/demo', (req, res) => {
  res.send('OK');
});

app.post('/api/demo', (req, res) => {
  res.status(201).send('Accepted');
});

app.get('/api/demo/ip', (req, res) => {
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket.remoteAddress;
  res.json({ ip });
});

module.exports = app;