;(function(listener) {
  listener.providesCommand = 'img'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('img', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'img')

    this.reply(envelope, img.apply(this, args))
  }

  function img(param) {
    return 'http://mebe.co/' + encodeURIComponent(param) + '.jpeg'
  }

})(exports)