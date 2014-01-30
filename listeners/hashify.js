;(function(listener) {

  listener.providesCommand = 'hashify'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('hashify', message)
  }

  listener.callback = function(message, envelope) {
    var str = this.util.removeCommand(message, 'hashify')

    this.reply(envelope, hashify.call(this, str))
  }

  function hashify(param) {
    var words = param.split(/\s+/)

    return words.map(function(w) {
      return "#" + w
    }).join(" ")
  }

})(exports)
