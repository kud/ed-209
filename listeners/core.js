(function(listener) {
  listener.register = function(bot) {
    bot.addListener('list-commands', ListCommands);
    bot.addListener('list-plugins',  ListPlugins);
  }

  ListCommands = {
    providesCommand: ['list', 'list-commands'],
    matcher: function(message, envelope) {
      return (envelope.type == 'channel') &&
             this.Util.matchesCommand('list(-commands)?', message);
    },
    callback: function(message, envelope) {
      var args = this.Util.extractParams(message, 'list(-commands)?');

      var keys = [];
      for (var key in this.listeners) {
        var command = this.listeners[key].providesCommand;

        if (command !== undefined) {
          if (command instanceof Array) {
            keys.push.apply(keys, command);
          } else {
            keys.push(command);
          }
        }
      }

      var speech = 'List: ➤ ' + keys.join('  ➤ ');

      this.reply(envelope, speech);
    }
  }

  ListPlugins = {
    providesCommand: 'list-plugins',
    matcher: function(message, envelope) {
      return (envelope.type == 'channel') &&
             this.Util.matchesCommand('list-plugins', message);
    },
    callback: function(message, envelope) {
      var args = this.Util.extractParams(message, 'list-plugins');

      var keys = [];
      for (var key in this.plugins) {
        if (key == "list") continue;
        keys.push(key);
      }
      var speech = 'Listeners: ➤ ' + keys.join('  ➤ ');

      this.reply(envelope, speech);
    }
  }
})(exports);
