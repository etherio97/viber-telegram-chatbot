import { TelegramResponse } from '../app/internal/TelegramResponse';
import { findWord, findBurmese, similarWord } from '../app/dict';
import { sortItems } from '../utils/helpers';

class TelegramController {
  async handle(payload) {
    if (payload.message) {
      let sender = payload.message.chat || payload.message.from;
      this.response = new TelegramResponse();
      await this.handleEvent(payload.message);
      await this.response.send(sender.id);
    }
  }

  async handleEvent(sender) {
    if (sender.chat.type === 'private') {
      await this.handlePrivate(sender);
    } else {
      await this.handleGroup(sender);
    } 
  }
  
  async handleGroup({ chat, from, text, entities }) {
    //
  }
  
  async handlePrivate({ chat, from, text, entities }) {
    if (Array.isArray(entities) && this.isBotCommand(entities)) {
      await this.onBotCommand(text);
    } else if (text) {
      await this.onMessage(text.trim());
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
    if (text.match(/[က-၏]/)) {
      let result = sortItems(
        ['definition'],
        await findBurmese('%' + text + '%', 100),
        text
      );
      console.log(result);
      if (result.length) {
        this.response.generateResponse(
          result.slice(0, 10)
        );
      } else {
        this.response.generateFallback();
      }
    } else {
      let a = await findWord(text);
      let b = (await similarWord(text + '%')).filter(
        (w) => !a.map((w) => w.text).includes(w.text)
      );
      if (a.length || b.length) {
        this.response.generateResponse(
          sortItems(['word'], a.concat(b), text)
        );
      } else {
        this.response.generateFallback();
      }
    }
  }

  isBotCommand(entities) {
    return !!entities.find((v) => v.type == 'bot_command');
  }
}

export default new TelegramController();
