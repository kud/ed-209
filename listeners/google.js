;(function(listener) {
  listener.providesCommand = 'google'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('google', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'google')

    this.reply(envelope, google.call(this, args))
  }

  function google(param) {
    return 'https://www.google.com/search?q=' + encodeURIComponent(param)
  }
})(exports)