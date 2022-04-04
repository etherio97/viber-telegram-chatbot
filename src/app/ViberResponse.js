import { BaseResponse } from './BaseResponse';
import sendMessage from './viber';

export class ViberResponse extends BaseResponse {
  generateGreeting() {
    this.pushMessages(
      this.getDefaultMessages().map((text) => ({
        type: 'text',
        text,
      }))
    );
  }

  generateFallback() {
    this.pushMessages(
      this.getFallbackMessages().map((text) => ({
        type: 'text',
        text,
      }))
    );
  }

  generateResponse(words) {
    this.pushMessages(
      this.getDictionaryResult(words).map((text) => ({
        type: 'text',
        text,
      }))
    );
  }

  async send(reciever) {
    for (let message of this.messages) {
      await sendMessage(reciever, message);
    }
  }
}
