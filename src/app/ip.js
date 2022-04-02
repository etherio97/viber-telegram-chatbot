import axios from 'axios';

export function getClientIp(req) {
  let bogon = false,
    ip =
      (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
      req.socket.remoteAddress;

  if (ip === '::1') {
    ip = '127.0.0.1';
    bogon = true;
  }

  if (ip.includes('::ffff')) {
    ip = ip.replace('::ffff:', '');
    bogon = true;
  }

  return { ip, bogon };
}

export async function getIpDetails(ip) {
  let { data } = await axios.get(`https://ipinfo.io/${ip}/json`);

  return {
    ip: data.ip,
    city: data.city,
    region: data.region,
    country: data.country,
    loc: data.loc,
    org: data.org,
    postal: data.postal,
    timezone: data.timezone,
  };
}
