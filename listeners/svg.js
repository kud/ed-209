(function(listener) {
  listener.providesCommand = 'svg';

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('svg', message);
  }

  listener.callback = function(message, envelope) {
    var speech = [
          'http://iconmonstr.com/',
          'http://thenounproject.com/',
          'http://icomoon.io/app/'
        ].join('\n');

    this.reply(envelope, speech);
  }

})(exports);
