;(function(listener) {
  listener.providesCommand = 'roulette'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('roulette', message)
  }

  listener.callback = function(message, envelope) {
    roulette.call(this, envelope)
  }

  function roulette(envelope) {
    var trigger = 4,
        user = ~~(Math.random() * 8 + 1),
        isBang = trigger === user,
        message = isBang ? 'BANG!' : 'Click!'

    this.reply(envelope, message)
    if (isBang) {
      this.client.send('KICK', envelope.to, envelope.from)
    }
  }

})(exports)
