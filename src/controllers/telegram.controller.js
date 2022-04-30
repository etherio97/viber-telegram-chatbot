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
    let word = text.trim();
    let words = await this._findWord(word);
    if (words.length) {
      this.response.generateResponse(words);
    } else {
      await this.findSimilarWord(word);
    }
  }
  
  async findSimilarWord(word) {
    let words = await this._similarWord(word);
    if (words.length) {
      this.response.generateResponse(words);
    } else {
      this.response.generateFallback();
    }
  }

  isBotCommand(entities) {
    return !!entities.find((v) => v.type == 'bot_command');
  }
  
  _findWord(w) {
    return supabase.post('/rest/v1/rpc/find_word', { w }).catch((e) => []);
  }
  
  _similarWord(w, x = 5) {
    return supabase.post('/rest/v1/rpc/similar_word', { w, x }).catch((e) => []);
  }
}

export default new TelegramController();
