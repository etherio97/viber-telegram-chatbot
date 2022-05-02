import axios from 'axios';
import { env } from 'process';

const BASE_URL = 'https://api.telegram.org';

const requestApi = (path, payload = null) => axios
  .post(`${BASE_URL}/bot${env.TG_BOT_TOKEN}/${path}`, payload)
  .then(({ data }) => data);

export const sendMessage = (chat_id, payload) => requestApi('sendMessage', {
  chat_id,
  ...payload,
});
