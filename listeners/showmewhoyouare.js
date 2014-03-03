;(function(listener) {
  listener.providesCommand = 'showmewhoyouare'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('showmewhoyouare', message)
  }

  listener.callback = function(message, envelope) {
    var speech = 'https://raw2.github.com/putaindecode/ed-209/master/preview.jpg'

    this.reply(envelope, speech)
  }
})(exports)
