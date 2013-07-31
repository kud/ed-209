(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('js', message);
  }

  listener.callback = function(message, envelope) {
    var args = this.Util.extractParams(message, 'js');

    this.reply(envelope, js.apply(this, args));
  }

  function js() {
    var str = Array.prototype.join.call(arguments, ' ')

    return "> " + evalBox(str)
  }

  var evalBox = (function(){
    function require() { throw "fucker"; }
    var module
    return function(str){
      try {
        if (str.match(/\bif\b|\bwhile\b|\bfor\b/) !== null) {
          return "Shove it up your ass, fucker"
        }
        var r = eval(str)
        return "" + r
      } catch(e){
        return "Errored, fucker"
      }
    }
  })();

})(exports);
