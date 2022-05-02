import { findWord, findBurmese, similarWord } from '../app/dict';
import { sortItems } from '../utils/helpers';

import { ViberResponse } from '../app/internal/ViberResponse';

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
    let text = message.text?.trim();
    if (text.match(/[က-၏]/)) {
      let result = sortItems(['definition'], await findBurmese('%' + text + '%', 100), text);
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
        (w) => !a.map((w) => w.word).includes(w.word)
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
}

export default new ViberController();
