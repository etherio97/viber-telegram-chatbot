import axios from 'axios';
import { env } from 'process';

const BASE_URL = 'https://api.telegram.org';

const requestApi = (path, payload = null) =>
  axios
    .post(`${BASE_URL}/bot${env.TG_BOT_TOKEN}/${path}`, payload)
    .then(({ data }) => data);

export default function sendMessage(chat_id, payload) {
  return requestApi('sendMessage', {
    chat_id,
    ...payload,
  });
}
