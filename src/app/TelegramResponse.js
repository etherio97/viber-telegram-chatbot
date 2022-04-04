import { BaseResponse } from './BaseResponse';
import sendMessage from './telegram';

export class TelegramResponse extends BaseResponse {
  generateGreeting() {
    this.pushMessages(this.getDefaultMessages().map((text) => ({ text })));
  }

  generateFallback() {
    this.pushMessages(
      this.getFallbackMessages().map((text) => ({
        text,
        parse_mode: 'markdown',
      }))
    );
  }

  generateResponse(words) {
    this.pushMessages(
      this.getDictionaryResult(words).map((text) => ({
        text,
        parse_mode: 'markdown',
      }))
    );
  }

  async send(chat_id) {
    for (let message of this.messages) {
      await sendMessage(chat_id, message);
    }
  }
}
