;(function(listener) {
  listener.providesCommand = 'who'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('who', message)
  }

  listener.callback = function(message, envelope) {
    var speech = 'https://raw2.github.com/putaindecode/ed-209/master/preview.jpg'

    this.reply(envelope, speech)
  }
})(exports)
