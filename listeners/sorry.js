;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\bsorry\b/i) !== null ||
           message.match(/\bdésolé\b/i) !== null ||
           message.match(/\boups\b/i)   !== null ||
           message.match(/\bmy bad\b/i) !== null ||
           message.match(/\boops\b/i)   !== null)
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, '¯\\_(ツ)_/¯')
  }

})(exports)
