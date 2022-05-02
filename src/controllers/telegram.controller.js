import Fuse from 'fuse.js';
import supabase from '../app/supabase';
import { TelegramResponse } from '../app/TelegramResponse';

class TelegramController {
  isPrivate = false;

  async handle(payload) {
    if (payload.message) {
      let sender = payload.message.chat || payload.message.from;
      this.response = new TelegramResponse();
      await this.handleEvent(payload.message);
      await this.response.send(sender.id);
    }
  }

  async handleEvent({ chat, from, text, entities }) {
    console.log({ chat, from });

    if (chat.type === 'private') {
      if (Array.isArray(entities) && this.isBotCommand(entities)) {
        return this.onBotCommand(text);
      }
      if (text) {
        return this.onMessage(text.trim());
      }
    } else {
      console.log('from group');
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
    if (text.match(/^\.add (.*)/)) {
      console.log('adding new data');
      await this.addNewData(...text.slice(5).split(','));
    } else if (text.match(/[က-၏]/)) {
      let result = await this._findBurmese('%' + text + '%');
      let fuse = new Fuse(result, {
        keys: ['defination'],
      });
      if (result.length) {
        this.response.generateResponse([
          ...fuse
            .search(text)
            .map(({ item }) => item)
            .slice(0, 10),
        ]);
      } else {
        this.response.generateFallback();
      }
    } else {
      let a = await this._findWord(text);
      let b = (await this._similarWord(text + '%')).filter(
        (w) => !a.map((w) => w.text).includes(w.text)
      );
      if (a.length || b.length) {
        this.response.generateResponse([...a, ...b]);
      } else {
        this.response.generateFallback();
      }
    }
  }

  async addNewData(word, state, defination) {
    console.log({ word, state, defination });
  }

  isBotCommand(entities) {
    return !!entities.find((v) => v.type == 'bot_command');
  }

  _findBurmese(word_input, max_rows = 100) {
    return supabase
      .post('/rest/v1/rpc/search_burmese', { word_input, max_rows })
      .catch((e) => []);
  }

  _findWord(w) {
    return supabase.post('/rest/v1/rpc/find_word', { w }).catch((e) => []);
  }

  _similarWord(w, x = 5) {
    return supabase
      .post('/rest/v1/rpc/similar_word', { w, x })
      .catch((e) => []);
  }
}

export default new TelegramController();
