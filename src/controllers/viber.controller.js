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
    return db.put(`viber_subscribers/${user.id}`, {
      ...user,
      sent_unknown: false,
      updatedCount: 0,
      updatedAt: { '.sv': 'timestamp' },
      createdAt: { '.sv': 'timestamp' },
    });
  }

  onUnsubscribed({ user_id }) {
    return db.remove(`viber_subscribers/${user_id}`);
  }

  async onMessage(payload) {
    let { message } = payload;

    if (!message.text) return [];
    
    let words = await supabase.get('/rest/v1/dblist', {
      select: '*',
      word: 'like.' + message.text.trim()
    }).catch((e) => {
      console.log('webhook.viber#error', e);
      return [];
    });

    if (words.length) {
      this.response.messages.push(
        ...words.map((w) => ({
          type: 'text',
          text: `*${w.word}* _(${w.state})_\n${w.defination}`,
        }))
      );
      return [];
    }

    // if (TextMessageUtil.isGreeting(message.text)) {
    //  return this.sendGreeting(payload);
    // }

    return this.sendUnknown(payload);
  }

  sendGreeting({ user, sender, user_id }) {
    sender = sender || user || { id: user_id };

    return db.get(`viber_subscribers/${sender.id}`).then((user) => {
      this.response.sendGreeting(user);

      if (user?.sent_unknown) {
        return db.update(`viber_subscribers/${sender.id}`, {
          sent_unknown: false,
          updatedCount: { '.sv': { increment: 1 } },
          updatedAt: { '.sv': 'timestamp' },
        });
      }
    });
  }

  sendUnknown({ user, sender, user_id }) {
    sender = sender || user || { id: user_id };
    return db.get(`viber_subscribers/${sender.id}`).then((user) => {
      if (user && user.sent_unknown) return;
      this.response.sendUnknown(sender);
      return db.update(`viber_subscribers/${sender.id}`, {
        sent_unknown: true,
        updatedCount: { '.sv': { increment: 1 } },
        updatedAt: { '.sv': 'timestamp' },
      });
    });
  }
}

module.exports = new ViberController();
