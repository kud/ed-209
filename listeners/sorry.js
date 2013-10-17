;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('sorry') !== -1
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, '¯\\_(ツ)_/¯')
  }

})(exports)
