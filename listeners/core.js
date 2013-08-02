;(function(listener) {
  
  var _toString = {}.toString,
      ARRAY_CLASS = "[object Array]"
  
  listener.register = function(bot) {
    bot.addListener('list-commands', ListCommands)
    bot.addListener('list-plugins',  ListPlugins)
  }

  ListCommands = {
    providesCommand: 'list',
    matcher: function(message, envelope) {
      return (envelope.type == 'channel') &&
             this.util.matchesCommand('list', message)
    },
    callback: function(message, envelope) {
      var args = this.util.extractParams(message, 'list'),
          keys = [], 
          listeners = this.listeners,
          key, command, speech
      for (key in listeners) {
        command = listeners[key].providesCommand

        if (command !== undefined) {
          if (_toString.call(command) == ARRAY_CLASS) {
            keys.push.apply(keys, command)
          } else {
            keys.push(command)
          }
        }
      }

      speech = 'Commands: ' + keys.join(' ∙ ')

      this.reply(envelope, speech)
    }
  }

  ListPlugins = {
    providesCommand: 'list-plugins',
    matcher: function(message, envelope) {
      return (envelope.type == 'channel') &&
             this.util.matchesCommand('list-plugins', message)
    },
    callback: function(message, envelope) {
      var args = this.util.extractParams(message, 'list-plugins'),
          plugins = this.plugins
          keys = [], key, speech
      for (key in plugins) {
        if (key == "list") continue
        keys.push(key)
      }
      speech = 'Plugins: ' + keys.join(' ∙ ')

      this.reply(envelope, speech)
    }
  }
})(exports)