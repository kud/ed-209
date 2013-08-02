(function(listener) {
  listener.providesCommand = 'roll'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('roll', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'roll')

    this.reply(envelope, roll.apply(this, args))
  }

  function roll(param) {
    var dice = function(sides) { return ~~((Math.random() * sides) + 1) },
        expr = param.split('d'),
        diceCount = parseInt(expr[0]),
        sideCount = parseInt(expr[1]),
        results   = [],
        i = -1

    while (++i < diceCount) results.push(dice(sideCount))

    var sum = results.reduce(function(a, e) { return a + e })

    return param + ': ' + results + ' = ' + sum
  }

})(exports);
