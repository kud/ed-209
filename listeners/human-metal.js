function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\metal\b/i) !== null ||
           message.match(/\bhardcore\b/i) !== null)
  }

  listener.callback = function(message, envelope) {
    var self = this

    setTimeout(function() {
      self.reply(envelope, '\\m/')
    }, getRandomInt(0, 5000))
  }

})(exports)
