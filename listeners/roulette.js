(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('roulette', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'roulette');

    this.reply(envelope, roulette.apply(this, args));
  }

  function roulette() {
    var trigger = 4,
        user = Math.floor(Math.random()*8 + 1);

    return trigger === user ? 'BANG!' : 'Click!';
  }

})(exports);
