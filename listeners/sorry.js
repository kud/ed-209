;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(/\bsorry\b/) !== null ||
           message.match(/\bdésolé\b/) !== null ||
           message.match(/\boups\b/)   !== null ||
           message.match(/\bmy bad\b/) !== null ||
           message.match(/\boops\b/)   !== null)
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, '¯\\_(ツ)_/¯')
  }

})(exports)
