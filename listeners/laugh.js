;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\lol\b/i) !== null ||
           (message.match(/\ahah\b/i) !== null ||
           (message.match(/\haha\b/i) !== null ||
           message.match(/\mdr\b/i) !== null)
  }

  listener.callback = function(message, envelope) {
    finalWords = [
      "drôle !",
      "haha",
      "j'ai ri aussi !"
    ],
    finalWord = finalWords[Math.floor(Math.random() * finalWords.length)]

    this.reply(envelope, finalWord)
  }

})(exports)
