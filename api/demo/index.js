const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const helmet= require('helmet');

const app = express();

app.use(helmet());

app.use(cors());

app.use(helmet());

app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/', (req, res) => {
  res.status(201).send('Accepted');
});

module.exports = app;