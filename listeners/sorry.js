;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/(^| )sorry($| )/i) !== null ||
           message.match(/(^| )désolé($| )/i) !== null ||
           message.match(/(^| )oups($| )/i)   !== null ||
           message.match(/(^| )my bad($| )/i) !== null ||
           message.match(/(^| )oops($| )/i)   !== null)
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, '¯\\_(ツ)_/¯')
  }

})(exports)
