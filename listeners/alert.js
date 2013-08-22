;(function(listener) {
  listener.providesCommand = 'alert'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('alert', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'alert')

    this.send('NAMES', envelope.to)
  }

})(exports)