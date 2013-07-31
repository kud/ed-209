(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('list', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'list');

    this.reply(envelope, list.apply(this, args));
  }

  function list() {
    var keys = [];
    for(var key in this.listeners){
      if (key == "list") continue;
      keys.push(key);
    }

    return 'List: ➤ ' + keys.join('  ➤ ');
  }

})(exports);
