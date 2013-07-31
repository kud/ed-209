(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('fakeimg', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'fakeimg');

    this.reply(envelope, fakeimg.apply(this, args));
  }

  function fakeimg(width, height, text, font) {
    var url = 'http://fakeimg.pl/';

    if(width)  { url += width; }
    if(height) { url += 'x' + height; }
    if(text)   { url += '/?text=' + encodeURIComponent(text); }
    if(font)   { url += '&font=' + encodeURIComponent(font) }

    return url;
  }

})(exports);
