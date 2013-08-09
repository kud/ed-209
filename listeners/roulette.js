;(function(listener) {
  listener.providesCommand = 'roulette'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('roulette', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'roulette')

    this.reply(envelope, roulette.apply(this, args))
  }

  function roulette() {
    var trigger = 4,
        user = ~~(Math.random() * 8 + 1)

    return trigger === user ? 'BANG!' : 'Click!'
  }

})(exports)
