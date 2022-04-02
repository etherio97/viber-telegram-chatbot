const { default: axios } = require('axios');
const TextMessageUtil = require('./utils/text-message.util');

const requestApi = (data) => axios.post('https://chatapi.viber.com/pa/send_message', data, { headers: { 'X-Viber-Auth-Token': process.env.VIBER_BOT_TOKEN } });

class ViberController {
  async handle({
    event,
    user,
    sender,
    message,
  }) {
    let replies = this.handleEvent(event, message, sender || user);
    for (let reply of replies) {
      let data = {
        receiver: (sender || user).id,
        ...reply,
      };
      await requestApi(data).catch(() => null);
    }
  }

  handleEvent(event, message, user) {
    switch (event) {
      case 'subscribed':
        return [];
      case 'conversation_started':
        return this.getGeetingMessage(user);
      case 'message':
        return this.handleMessage(message, user);
      case 'unsubscribed':
        return [];
      default:
        return [];
    }
  }
  
  handleMessage(message, user) {
    if (message.text) {
      return this.handleTextMessage(message, user);
    }
    return this.getUnexpectedMessage();
  }
  
  handleTextMessage({ text }, user) {
    if (TextMessageUtil.isGreeting(text)) {
      return this.getGeetingMessage(user);
    }
    return [];
  }

  getGeetingMessage(user) {
    return [
      {
        type: 'text',
        text: user?.name ? `Mingalarpar ${user.name}! How can I help you?` : 'Mingalarpar! How can I help you?',
      }
    ];
  }

  getUnexpectedMessage() {
    return [
      {
        type: 'text',
        text: 'I don\'t understand what you mean?',
      }
    ];
  }
}

module.exports = new ViberController();