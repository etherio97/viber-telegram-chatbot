import axios from 'axios';
import { env } from 'process';

const BASE_URL = 'https://api.telegram.org';

export function sendMessage(chat_id, payload) {
  return requestApi('sendMessage', {
    chat_id,
    ...payload,
  });
}

export function requestApi(path, payload = null) {
  return axios
    .post(`${BASE_URL}/bot${env.TG_BOT_TOKEN}/${path}`, payload)
    .then(({ data }) => data);
}
