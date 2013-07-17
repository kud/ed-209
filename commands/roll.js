exports.roll = function(param) {
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
