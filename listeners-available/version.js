;(function(listener) {
  listener.providesCommand = 'version'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('version', message)
  }

  listener.callback = function(message, envelope) {
    var speech = "I'm at "+ require('fs').readFileSync('.git/refs/heads/master')

    this.reply(envelope, speech)
  }

})(exports)
