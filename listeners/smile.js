;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\:\)\b/i) !== null ||
           message.match(/\:D\b/i) !== null)
  }

  listener.callback = function(message, envelope) {
    var self = this
      , finalWords = [
          ":D",
          ":)"
        ]
      , finalWord = finalWords[Math.floor(Math.random() * finalWords.length)]

    setTimeout(function() {
      self.reply(envelope, finalWord)
    }, 1500)
  }

})(exports)
