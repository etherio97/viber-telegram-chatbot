import axios from 'axios';
import { env } from 'process';

const BASE_URL = 'https://chatapi.viber.com';

export class ResponseMessage {
  messages = [];

  sendGreeting(user = {}) {
    this.messages.push({
      type: 'text',
      text: user?.name
        ? `Mingalarpar ${user.name}! How can I help you?`
        : 'Mingalarpar! How can I help you?',
    });
    return this.messages;
  }

  sendUnknown() {
    this.messages.push({
      type: 'text',
      text: "I don't understand what you mean? 🥺",
    });
    return this.messages;
  }
}

export function sendMessage(receiver, payload) {
  return requestApi('send_message', {
    receiver,
    type: 'text',
    ...payload,
  });
}

export function requestApi(path, payload = null) {
  return axios
    .post(`${BASE_URL}/pa/${path}`, payload, {
      headers: {
        'X-Viber-Auth-Token': env.VIBER_BOT_TOKEN,
      },
    })
    .then(({ data }) => data);
}
