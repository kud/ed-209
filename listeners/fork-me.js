;(function(listener) {
  listener.providesCommand = 'fork-me'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('fork-me', message)
  }

  listener.callback = function(message, envelope) {
    var speech = 'Please, please, please https://github.com/putaindecode/ed-209'

    this.reply(envelope, speech)
  }
})(exports)
