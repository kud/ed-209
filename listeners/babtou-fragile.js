;(function(listener) {
  listener.providesCommand = 'babtou-fragile'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('babtou-fragile', message)
  }

  listener.callback = function(message, envelope) {
    var speech = 'http://cdn.bvoltaire.fr/media/2013/09/babtou-fragile-565x250.jpg'

    this.reply(envelope, speech)
  }
})(exports)
