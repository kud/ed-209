function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/(^| )sorry($| )/i) !== null ||
           message.match(/(^| )sry($| )/i) !== null ||
           message.match(/(^| )désolé($| )/i) !== null ||
           message.match(/(^| )desole($| )/i) !== null ||
           message.match(/(^| )dsl($| )/i) !== null ||
           message.match(/(^| )oups($| )/i)   !== null ||
           message.match(/(^| )oops($| )/i)   !== null ||
           message.match(/(^| )my bad($| )/i) !== null)
  }

  listener.callback = function(message, envelope) {
    var self = this

    setTimeout(function() {
      self.reply(envelope, '¯\\_(ツ)_/¯')
    }, getRandomInt(0, 5000))
  }

})(exports)
