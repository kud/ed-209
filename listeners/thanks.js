;(function(listener) {
  listener.matcher = function(message, envelope) {
    var regEx = 'merci ' + this.client.opt.nick

    return (envelope.type == 'channel') &&
           (message.match(regEx, 'i' !== null))
  }

  listener.callback = function(message, envelope) {
    this.reply(envelope, 'de rine')
  }

})(exports)
