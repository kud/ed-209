;(function(listener) {
  listener.providesCommand = 'leave'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('leave', message)
  }

  listener.callback = function(message, envelope) {
    this.client.part(envelope.to);
  }

})(exports)
