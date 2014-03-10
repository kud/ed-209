function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\:\)\b/i) !== null ||
           message.match(/\:D\b/i) !== null)
  }

  listener.callback = function(message, envelope) {
    var user = ~~(Math.random() * 3 + 1)
      , trigger = 2
      , isBang = trigger === user

    var self = this
      , finalWords = [
          ":D",
          ":)"
        ]
      , finalWord = finalWords[Math.floor(Math.random() * finalWords.length)]

    if(isBang)
      setTimeout(function() {
        self.reply(envelope, finalWord)
      }, getRandomInt(0, 5000))
  }

})(exports)
