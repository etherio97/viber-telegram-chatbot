const { default: axios } = require('axios');

const requestApi = (path, data) => axios.post(`https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/${path}`, data);

class TelegramController {
  async handle({
    message,
  }) {
    if (!message) return;
    let replies = this.handleMessage(message);
    for (let reply of replies) {
      let data = {
        chat_id: (message.chat||message.sender).id,
        ...reply,
      };
      await requestApi('/sendMessage', data);
    }
  }

  handleMessage({
    chat,
    from,
    text,
    entities
  }) {
    if (Array.isArray(entities) && this.isBotCommand(entities)) {
      return this.handleBotCommand(text);
    }
    return [
      {
        text: 'I don\'t under!stand what you mean 😓'
      }
    ];
  }

  isBotCommand(entities) {
    return !!entities.find(v => v.type == 'bot_command');
  }
  
  handleBotCommand(text) {
    switch(text) {
      case '/start':
        return [
          {
            text: '🙏 Mingalapar 🙏! How can I help you?',
          }
        ];
        
      default:
        return [];
    }
  }
}

module.exports = new TelegramController();