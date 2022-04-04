import supabase from '../app/supabase';
import { TelegramResponse } from '../app/TelegramResponse';

class TelegramController {
  async handle(payload) {
    if (payload.message) {
      let sender = payload.message.chat || payload.message.from;
      this.response = new TelegramResponse();
      await this.handleEvent(payload.message);
      await this.response.send(sender.id);
    }
  }

  async handleEvent({ chat, from, text, entities }) {
    if (Array.isArray(entities) && this.isBotCommand(entities)) {
      return this.onBotCommand(text);
    }

    if (text) {
      return this.onMessage(text);
    }
  }

  async onBotCommand(text) {
    switch (text) {
      case '/start':
        this.response.generateGreeting();
        break;
    }
  }

  async onMessage(text) {
    let words = await supabase
      .post('/rest/v1/rpc/find_word', { w: text.trim() })
      .catch((e) => []);

    if (words.length) {
      this.response.generateResponse(words);
    } else {
      this.response.generateFallback();
    }
  }

  isBotCommand(entities) {
    return !!entities.find((v) => v.type == 'bot_command');
  }
}

export default new TelegramController();
