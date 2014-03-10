;(function(listener) {
  listener.providesCommand = 'gitan'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('gitan', message)
  }

  listener.callback = function(message, envelope) {
    var speech = 'http://www.floue.net/wp-content/uploads/2010/05/roulotte.jpg'

    this.reply(envelope, speech)
  }
})(exports)
