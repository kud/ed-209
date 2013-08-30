;(function(listener) {
  listener.providesCommand = 'conj'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('conj', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'conj')

    this.reply(envelope, conj.apply(this, args))
  }

  function conj(param) {
    return [
      'http://leconjugueur.lefigaro.fr/conjugaison/verbe/',
      encodeURIComponent(param),
      '.html'
    ].join('')
  }
})(exports)
