import axios from 'axios';
import { env } from 'process';

const BASE_URL = 'https://api.telegram.org';

const requestApi = (path, data = null) => axios({
    method: 'POST',
    url: [BASE_URL, '/bot', env.TG_BOT_TOKEN, '/', path].join(''),
    data,
  })
  .then(({ data }) => data);

export const sendMessage = (chat_id, payload) => requestApi('sendMessage', {
  chat_id,
  ...payload,
});
