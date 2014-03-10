function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.matcher = function(message, envelope) {
    var regEx = 'merci ' + this.client.opt.nick

    return (envelope.type == 'channel') &&
           (message.match(regEx, 'i' !== null))
  }

  listener.callback = function(message, envelope) {
    var self = this

    setTimeout(function() {
      self.reply(envelope, 'de rine')
    }, getRandomInt(0, 5000))
  }

})(exports)
