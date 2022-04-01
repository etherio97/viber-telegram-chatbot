const { default: axios } = require('axios');

const requestApi = (data) =>
  axios
  .post('https://chatapi.viber.com/pa/send_message', data, {
    headers: {
      'X-Viber-Auth-Token': process.env.VIBER_BOT_TOKEN,
    },
  });

class ViberController {
  async handle({
    event,
    user,
    sender,
    message,
  }) {
    let replies = this.handleEvent(event, message);
    for (let reply of replies) {
      let data = {
        receiver: (sender || user).id,
        ...reply,
      };
      await requestApi(data).catch(() => null);
    }
  }

  handleEvent(event, message) {
    switch (event) {
      case 'subscribed':
        return [];
      case 'conversation_started':
        return [
          {
            type: 'text',
            text: 'Mingalarpar! How can I help you?',
          }
        ];
      case 'message':
        return [
          {
            type: 'text',
            text: 'I don\'t understand what you mean?',
          }
        ];
      case 'unsubscribed':
        return [];
      default:
        return [];
    }
  }
}

module.exports = new ViberController();