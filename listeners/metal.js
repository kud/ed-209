;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\metal\b/i) !== null ||
           message.match(/\bhardcore\b/i) !== null)
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, '\\m/')
  }

})(exports)
