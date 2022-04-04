import { db } from '../app/db';
import { TextMessageUtil } from '../utils/text-message.util';
import { ResponseMessage, sendMessage } from '../app/viber';
import supabase from '../app/supabase';

class ViberController {
  async handle(payload) {
    let sender = payload.sender || payload.user || { id: payload.user_id };

    this.response = new ResponseMessage();

    await this.handleEvent(payload.event, payload);

    for (let message of this.response.messages) {
      await sendMessage(sender.id, message).catch((e) =>
        console.error('[controller.viber#message-error]', e)
      );
    }
  }

  async handleEvent(event, payload) {
    switch (event) {
      case 'subscribed':
        return this.onSubscribe(payload);

      case 'conversation_started':
        return this.sendGreeting(payload);

      case 'message':
        return this.onMessage(payload);

      case 'unsubscribed':
        return this.onUnsubscribed(payload);
    }
  }

  onSubscribe({ user }) {
    return;
  }

  onUnsubscribed({ user_id }) {
    return;
  }

  async onMessage(payload) {
    let { message } = payload;

    if (!message.text) return;
    
    let words = await supabase.post('/rest/v1/rpc/find_word', { w: message.text.trim() })
      .catch((e) => {
        console.log('webhook.viber#error', e);
        return [];
      });

    if (words.length) {
      return this.response.messages.push({
        type: 'text',
        text: words.map(
            w => `*${w.word}* _(${w.state})_\n${w.defination}`,
          ).join('\n\n'),
      });
    }

    this.sendUnknown(payload);
  }

  sendGreeting({ user, sender, user_id }) {
    sender = sender || user || { id: user_id };
    return this.response.sendGreeting(user);
  }

  sendUnknown({ user, sender, user_id }) {
    sender = sender || user || { id: user_id };
    return this.response.sendUnknown(sender);
  }
}

module.exports = new ViberController();
