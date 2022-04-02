class TextMessageUtil {
  static isGreeting(text) {
    if (typeof text !== 'string') {
      return false;
    }
    return text.match(/(?:(?:hi|hello|ဟိုင်း|ဟယ်လို|မင်္ဂလာ| ဟိုင္း|ဟယ္လို|မဂၤလာ)|good (?:morn|nig|even|after))/gmi);
  }
}

module.exports = TextMessageUtil;