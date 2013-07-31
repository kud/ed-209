(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('conj', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'conj');

    this.reply(envelope, conj.apply(this, args));
  }

  function conj(param) {
    return [
      'http://leconjugueur.lefigaro.fr/conjugaison/verbe/',
      encodeURIComponent(param),
      '.html'
    ].join('');
  }
})(exports);
