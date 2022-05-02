import { env } from 'process';
import axios from 'axios';

const BASE_URL = 'https://chatapi.viber.com';

const requestApi = (path, payload = null) => axios
  .post(`${BASE_URL}/pa/${path}`, payload, {
    headers: {
      'X-Viber-Auth-Token': env.VIBER_BOT_TOKEN,
    },
  })
  .then(({ data }) => data);

export const sendMessage = (receiver, payload) => requestApi('send_message', {
  receiver,
  type: 'text',
  ...payload,
});
