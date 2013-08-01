(function(listener) {
  listener.providesCommand = 'forkyou';

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('forkyou', message);
  }

  listener.callback = function(message, envelope) {
    var speech = 'Please, please, please https://github.com/putaindecode/ed-209';

    this.reply(envelope, speech);
  }
})(exports);
