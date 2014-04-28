;(function(listener) {
  listener.providesCommand = 'schlag'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('schlag', message)
  }

  listener.callback = function(message, envelope) {
    var speech = 'http://iejnews.com/wp-content/uploads/2012/12/sdf_100.jpg'

    this.reply(envelope, speech)
  }
})(exports)
