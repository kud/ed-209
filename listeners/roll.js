(function(listener) {
  listener.providesCommand = 'roll';

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('roll', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'roll');

    this.reply(envelope, roll.apply(this, args));
  }

  function roll(param) {
    var dice = function(sides) { return Math.floor((Math.random() * sides) + 1) },
        expr = param.split('d'),
        diceCount = parseInt(expr[0]),
        sideCount = parseInt(expr[1]),
        results   = [];

    for (var i = 0; i < diceCount; i++)
      results.push(dice(sideCount));

    var sum = results.reduce(function(a, e) { return a + e });

    return param + ': ' + results + ' = ' + sum;
  }

})(exports);
