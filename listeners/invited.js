;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'invite');
  }

  listener.callback = function(message, envelope) {
    this.client.join(envelope.channel)
  }

})(exports)
