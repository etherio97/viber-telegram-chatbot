import supabase from '../app/supabase';
import { ViberResponse } from '../app/ViberResponse';

class ViberController {
  async handle(payload) {
    let sender = payload.sender || payload.user || { id: payload.user_id };
    this.response = new ViberResponse();
    await this.handleEvent(payload);
    await this.response.send(sender.id);
  }

  async handleEvent(payload) {
    switch (payload.event) {
      case 'conversation_started':
        return this.response.generateGreeting();

      case 'message':
        return this.onMessage(payload);
    }
  }

  async onMessage({ message }) {
    let word = message.text?.trim();
    let a = await this._findWord(word);
    let b = await this._similarWord(word + '%');
    if (words.length) {
      this.response.generateResponse([...a, ...b]);
    } else {
      this.response.generateFallback();
    }
  }
  
  _findWord(w) {
    return supabase
      .post('/rest/v1/rpc/find_word', { w })
      .catch((e) => []);
  }

  _similarWord(w, x = 5) {
    return supabase
      .post('/rest/v1/rpc/similar_word', { w, x })
      .catch((e) => []);
  }
}

export default new ViberController();
