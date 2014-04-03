;(function(listener) {
  listener.providesCommand = 'paste'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('paste', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'paste')
      , speech = "https://gist.github.com/"
      , pseudo = typeof args[0] !== "undefined" ? args[0] : false
      , kick = typeof args[1] !== "undefined" && args[1] === "kick" ? true : false

    // kick mode
    if ( pseudo && kick ) {
      this.client.send('KICK', envelope.to, pseudo, "Will you paste your code on https://gist.github.com/ for fuck's sake!")
    }

    // warning
    else if ( pseudo ) {
      this.reply(envelope, pseudo + ": will you paste your code on https://gist.github.com/ for fuck's sake!")
    }

    // help
    else this.reply(envelope, speech)
  }

})(exports)
