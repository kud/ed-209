(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('js', message);
  }

  listener.callback = function(message, envelope) {
    var str = this.Util.removeCommand(message, 'js'),
        speech = '> ' + evalBox(str);

    this.reply(envelope, speech);
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
        return "Errored, fucker ("+e+")"
        console.error(e)
      }
    }
  })();

})(exports);
