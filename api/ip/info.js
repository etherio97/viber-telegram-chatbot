const app = require('../../src/core/app');
const { default: axios } = require('axios');

const requestIpInfo = (ip) => axios.get(`https://ipinfo.io/${ip}/json`).then(({ data }) => {
  data.readme = undefined;
  delete data.readme;
  return data;
});

app.get('*', (req, res) => {
  let ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
    req.socket.remoteAddress;
  
  requestIpInfo(ip)
    .then(data => res.json(data))
    .catch(e => {
      console.error(e);
      res.status(500).send(e.message);
    });
});

module.exports = app;
