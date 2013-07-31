
(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('showmewhoyouare', message);
  }

  listener.callback = function(message, envelope) {
    var speech = 'http://2.bp.blogspot.com/_uhAVIQRB_8Y/S9ksmNEi71I/AAAAAAAAHQw/LxI55py1GUg/s400/ED209_00.jpg';

    this.reply(envelope, speech);
  }
})(exports);
