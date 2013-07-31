(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('gh', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'gh');

    this.reply(envelope, gh.apply(this, args));
  }

  function gh(param) {
    return 'https://github.com/search?q=' + encodeURIComponent(param);
  }
})(exports);
