import axios from 'axios';

const requestApi = (path, data) =>
  axios.post(
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/${path}`,
    data
  );

class TelegramController {
  async handle({ message }) {
    if (!message) return;
    let replies = this.handleMessage(message);
    for (let reply of replies) {
      let data = {
        chat_id: (message.chat || message.sender).id,
        ...reply,
      };
      await requestApi('sendMessage', data);
    }
  }

  handleMessage({ chat, from, text, entities }) {
    if (Array.isArray(entities) && this.isBotCommand(entities)) {
      return this.handleBotCommand(text);
    }
    return [
      {
        text: "I don't under!stand what you mean 😓",
      },
    ];
  }

  isBotCommand(entities) {
    return !!entities.find((v) => v.type == 'bot_command');
  }

  handleBotCommand(text) {
    switch (text) {
      case '/start':
        return [
          {
            text: '🙏 Mingalapar 🙏! How can I help you?',
          },
        ];

      default:
        return [];
    }
  }
}

export default async function handler(req, res) {
  try {
    let controller = new TelegramController();
    let method = req.method;
    let data = req.body;
    let token = req.query.token;

    if (method != 'POST') return res.status(405).send('Method not allowed!');

    if (!token)
      return res.status(401).send('Required parameter: token in query');

    if (token != 'etherio')
      return res.status(403).send('Invalid or wrong token!');

    if (!data) return res.status(400).send('Bad request!');

    await controller.handle(data);

    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
}
