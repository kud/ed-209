var vm = require('vm');

;(function(listener) {
  listener.providesCommand = 'js'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('js', message)
  }

  listener.callback = function(message, envelope) {
    var str = this.util.removeCommand(message, 'js'),
        self = this,
        speech = '> ' + evalBox(str, function(msg) {
          self.say(envelope.from, msg)
        })

    this.reply(envelope, speech)
  }

  var evalBox = (function(){
    return function(str, reply){
      try {
        if (str.match(/\bif\b|\bwhile\b|\bfor\b|\beval\b|\bforEach\b|\bmap\b|\bfilter\b|\breduce\b/) !== null) {
          return "Shove it up your ass, fucker"
        }
        if (str.match(/\bsetTimeout\b/) !== null) {
          var timeout = 1000 *  ~~((Math.random() * 10))
          setTimeout(function() { reply('SURPRISE, MOTHER FUCKER!') }, timeout)
          return "Yeah, like I'm going to eval that"
        }
        if (str.match(/\bsetInterval\b/) !== null) {
          var makeCallback = function(tries) {
            var speech = [
              'Your mother sucks hairy balls',
              'She likes dicks too',
              'OH FUCK I\'M A BOT AFTER ALL',
              'Y U SO DUMMMMMB',
              'Did you know you were a dick?',
              'I guess you did.',
              'This is boring, isn\'t it?',
              'SO NEXT TIME STOP TRYING TO FUCK WITH MY CODE',
              'Thanks.',
              'Bastard.'
            ]
            return function() {
              reply(speech[10 - tries])
              if (tries > 0) {
                var timeout = 1000 *  ~~((Math.random() * 5))
                setTimeout(makeCallback(tries - 1), timeout)
              }
            }
          }
          setTimeout(makeCallback(10), 3000)
          return "Yeah, like I'm going to eval that"
        }
        var context = {}
        var r = vm.runInContext(str, vm.createContext(context))
        return "" + r
      } catch(e){
        return "Errored, fucker ("+e+")"
        console.error(e)
      }
    }
  })()

})(exports)
