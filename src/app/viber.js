import { env } from 'process';
import axios from 'axios';

const BASE_URL = 'https://chatapi.viber.com';

export default function sendMessage(receiver, payload) {
  const requestApi = (path, payload = null) =>
    axios
      .post(`${BASE_URL}/pa/${path}`, payload, {
        headers: {
          'X-Viber-Auth-Token': env.VIBER_BOT_TOKEN,
        },
      })
      .then(({ data }) => data);

  return requestApi('send_message', {
    receiver,
    type: 'text',
    ...payload,
  });
}
