export class BaseResponse {
  messages = [];

  pushMessages(messages = []) {
    this.messages.push(...messages);
  }

  getDefaultMessages() {
    return [
      'မင်္ဂလာပါ။ သင်ရှာဖွေလိုသော အင်္ဂလိပ်စကားလုံးတွေရဲ့ အဓိပ္ပာယ်တွေကို ရှာဖွေနိုင်ပါတယ်။',
    ];
  }

  getFallbackMessages() {
    let messages = [
      'ဆောရီးပါ...🥺',
      '🤯 နားမလည်ဘူး!!',
      'ရှာမတွေ့ပါ... 😓',
      'စာလုံးပေါင်းမှန်ရဲ့လား? 🙄',
      '😬 တစ်ခုခုတော့မှားနေပြီ။',
    ];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  getDictionaryResult(words = []) {
    return [
      words
        .map((w) => `*${w.word}* _(${w.state})_\n${w.defination}`)
        .join('\n\n'),
    ];
  }
}
