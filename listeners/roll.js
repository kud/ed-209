;(function(listener) {
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
        response  = "",
        options   = {}
        i
console.log(arguments)

    if (arguments.length >= 2) {
      for (var i = 1, l = arguments.length; i < l; i++) {
        var argument = arguments[i]

        if (argument.slice(0, 2) == "--") {
          options[argument.slice(2)] = true
        }
      }
    }

    if (diceCount > 30) {
      return "That's a big bag."
    }

    if (sideCount > 1000) {
      return "Is that even a dice?!"
    }

    i = - 1
    while (++i < diceCount) results.push(dice(sideCount))


    response = param + ': ' + results.join(', ')

    if (options.total) {
      var sum = results.reduce(function(a, e) { return a + e })
      response += " total: " + sum
    }
    if (options.max) {
      var max = results.reduce(function(a, e) { return a > e ? a : e })
      response += " max: " + max 
    }
    if (options.min) {
      var min = results.reduce(function(a, e) { return a < e ? a : e })
      response += " min: " + min
    }

    return response
  }

})(exports)
