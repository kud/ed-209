(function(listener) {
  listener.providesCommand = 'js';

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.Util.matchesCommand('js', message);
  }

  listener.callback = function(message, envelope) {
    var str = this.Util.removeCommand(message, 'js'),
        self = this,
        speech = '> ' + evalBox(str, function(msg) {
          self.say(envelope.from, msg);
        });

    this.reply(envelope, speech);
  }

  var evalBox = (function(){
    var module, process, exports, require;

    return function(str, reply){
      try {
        if (str.match(/\bif\b|\bwhile\b|\bfor\b/) !== null) {
          return "Shove it up your ass, fucker"
        }
        if (str.match(/\bsetTimeout\b/) !== null) {
          var timeout = 1000 *  Math.floor((Math.random() * 10));
          setTimeout(function() { reply('SURPRISE, MOTHER FUCKER!') }, timeout);
          return "Yeah, like I'm going to eval that"
        }
        if (str.match(/\bsetInterval\b/) !== null) {
          var makeCallback = function(tries) {
            return function() {
              reply('Your mother sucks hairy balls');
              if (tries > 0) {
                setTimeout(makeCallback(tries - 1), 1000);
              }
            }
          }
          setTimeout(makeCallback(10), 0);
          return "Yeah, like I'm going to eval that"
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
