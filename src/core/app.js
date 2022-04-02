const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const helmet = require('helmet');
const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(helmet());

module.exports = app;
