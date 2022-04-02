const app = require('../../src/core/app');

app.get((req, res) => {
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket.remoteAddress;
  res.json({ ip });
});

module.exports = app;
