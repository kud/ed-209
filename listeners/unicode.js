(function(listener) {
  listener.providesCommand = 'unicode';

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('unicode', message);
  }

  listener.callback = function(message, envelope) {
    var speech = 'Ha tu veux de l\'unicode, bah tiens, gros con : http://copypastecharacter.com';

    this.reply(envelope, speech);
  }

})(exports);
