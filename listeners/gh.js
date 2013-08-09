;(function(listener) {
  listener.providesCommand = 'gh'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('gh', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'gh')

    this.reply(envelope, gh.apply(this, args))
  }

  function gh(param) {
    return 'https://github.com/search?q=' + encodeURIComponent(param)
  }
})(exports)
