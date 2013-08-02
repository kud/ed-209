;(function(listener) {
  listener.providesCommand = 'repo'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('repo', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'repo')

    this.reply(envelope, repo.apply(this, args))
  }


  function repo(param) {
    return 'https://github.com/' + param
  }

})(exports)