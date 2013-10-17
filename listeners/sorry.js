;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.search('sorry') !== -1 ||
           message.search('désolé') !== -1 ||
           message.search('oups') !== -1 ||
           message.search('my bad') !== -1 ||
           message.search('oops') !== -1)
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, '¯\\_(ツ)_/¯')
  }

})(exports)
