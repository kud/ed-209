(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('paste', message);
  }

  listener.callback = function(message, envelope) {
    var speech = 'Paste your code on https://gist.github.com/ for fuck\'s sake!';

    this.reply(envelope, speech);
  }

})(exports);
