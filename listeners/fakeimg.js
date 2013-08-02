;(function(listener) {
  listener.providesCommand = 'fakeimg'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('fakeimg', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'fakeimg')

    this.reply(envelope, fakeimg.apply(this, args))
  }

  function fakeimg(width, height, text, font) {
    var url = 'http://fakeimg.pl/'

    if(width) url += width
    if(height) url += 'x' + height
    if(text) url += '/?text=' + encodeURIComponent(text)
    if(font) url += '&font=' + encodeURIComponent(font) 

    return url
  }

})(exports)