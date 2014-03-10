function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\lol\b/i) !== null ||
           message.match(/\ahah\b/i) !== null ||
           message.match(/\haha\b/i) !== null ||
           message.match(/\rofl\b/i) !== null ||
           message.match(/\mdr\b/i) !== null)
  }

  listener.callback = function(message, envelope) {
    var user = ~~(Math.random() * 3 + 1)
      , trigger = 2
      , isBang = trigger === user

    var self = this
      , finalWords = [
      "drôle !",
      "haha",
      "mdr",
      "lol",
      "rofl",
      "hihi",
      "j'ai ri aussi"
    ],
    finalWord = finalWords[Math.floor(Math.random() * finalWords.length)]

    if(isBang)
      setTimeout(function() {
        self.reply(envelope, finalWord)
      }, getRandomInt(0, 5000))
  }

})(exports)
