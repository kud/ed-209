;(function(listener) {
  listener.providesCommand = 'paste'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('paste', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'roll')
      , speech

    if ( typeof args[2] !== "undefined" ) {
      speech = args[2] + ": will you paste your code on https://gist.github.com/ for fuck's sake!"
    }

    else {
      speech = 'https://gist.github.com/'
    }

    this.reply(envelope, speech)
  }

})(exports)
