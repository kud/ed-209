(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'pm') && (envelope.from == 'madx`');
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, ''),
        cmd  = args.shift();

    if (this[cmd] !== undefined) this[cmd].apply(this, args);
  }
})(exports);
