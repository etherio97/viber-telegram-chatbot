import supabase from '../app/supabase';
import { ViberResponse } from '../app/ViberResponse';

class ViberController {
  constructor() {
    this.response = new ViberResponse();
  }

  async handle(payload) {
    let sender = payload.sender || payload.user || { id: payload.user_id };
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
    let words = await supabase
      .post('/rest/v1/rpc/find_word', { w: message.text?.trim() })
      .catch((e) => []);

    if (words.length) {
      this.response.generateResponse(words);
    } else {
      this.response.getFallbackMessages();
    }
  }
}

export default new ViberController();
