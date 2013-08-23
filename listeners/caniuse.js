;(function(listener) {
  listener.providesCommand = 'caniuse'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('caniuse', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'caniuse')

    this.reply(envelope, caniuse.apply(this, args))
  }

  function caniuse(param) {
    return 'http://caniuse.com/#search=' + encodeURIComponent(param)
  }

})(exports)
