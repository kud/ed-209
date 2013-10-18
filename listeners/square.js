;(function(listener) {
  listener.providesCommand = 'square'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('square', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'square')

    if (args[0].length > 8) {
      this.reply(envelope, square.call(this, "FUCK"))
    } else {
      this.reply(envelope, square.apply(this, args))
    }
  }

  function square(param) {
    var letters = param.toUpperCase().split(''),
        count = letters.length,
        lines = new Array(count)

    for (var i = 0; i < count; i++) {
      lines[i] = new Array(count)
      for (var j = 0; j < count; j++) {
        lines[i][j] = ' '
      }
    }

    for (var i = 0; i < count; i++) {
      lines[i][0] = letters[i]
      lines[0][i] = letters[i]
      lines[count-1-i][count-1] = letters[i]
      lines[count-1][count-1-i] = letters[i]
    }

    return lines.map(function(l) { return l.join('') }).join("\n")
  }

})(exports)
