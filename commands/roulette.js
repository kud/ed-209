exports.roulette = function() {
  var trigger = 4,
      user = Math.floor(Math.random()*8 + 1);

  return trigger === user ? 'BANG!' : 'Click!';
}
