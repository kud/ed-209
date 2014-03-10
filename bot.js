var util = require('util'),
    bot = Object.create(null)

// The main bot object

// Create a new bot
bot.create = function(){
  var self = Object.create(this)
  self.constructor.apply(self, arguments)
  return self
}

// Colors used for terminal output
bot.colors = {
    green : function(str){ return "\033[0m\033[32m" + str + "\033[0m" },
    blue : function(str){ return "\033[0m\033[34m" + str + "\033[0m" },
    yellow : function(str){ return "\033[0m\033[33m" + str + "\033[0m" }
}

// Bot constructor
//
// Takes an irc.Client and a config object
bot.constructor = function(client, config){
  var self = this
  self.client = client
  self.config = config
  self.listeners = Object.create(null)
  self.plugins = Object.create(null)
  return self
}

bot.constructor.prototype = bot;

// Join a given channel
bot.join = function(channel) {
  var self = this
  console.log("  " + self.colors.blue("Joining") + " " + self.colors.yellow(channel))
  self.client.join(channel)
}

// Leave a given channel
bot.part = function(channel) {
  this.client.part(channel)
}

// Send a message to a channel or a nick
bot.say = function(to, message) {
  this.client.say(to, message)
}

// Automatically reply to where a message has been posted (a channel or a
// private message)
bot.reply = function(envelope, message) {
  var replyTo = envelope.type == 'channel' ? envelope.to : envelope.from

  this.say(replyTo, message)
}

// Send a message to all registered channels
bot.broadcast = function(message) {
  var self = this

  this.config.channels.forEach(function (channel) { // TODO: only say on joined channels
    self.say(channel, message)
  })
}

// Read a message and call the appropriate listeners
bot.listen = function(message, envelope) {
  var self = this,
      hasMatched = false,
      listeners = self.getListeners(),
      listener, pattern, l, i

  for (i = 0, l = listeners.length; i < l; i++) {
    listener = listeners[i]
    if (listener.matcher.call(self, message, envelope)) {
      try {
        listener.callback.call(self, message, envelope)
      } catch(error) {
        self.reply(envelope, 'Error: ' + util.inspect(error))
        console.error(error.stack)
      }
      hasMatched = true
      envelope.matched = true
    }
  }

  pattern = self.util.commandPattern('.+')
  if (!hasMatched && message.match(pattern) !== null) {
    self.reply(envelope, 'unknown command, sucker :]')
  }
}

// Return all listeners in priority order
bot.getListeners = function() {
  var self = this,
      listeners = self.listeners,
      listenersList = [],
      priority, listener, i, l

  for (l in listeners) {
    listener = listeners[l]
    priority = listener.priority || Priority.MEDIUM

    listenersList[priority] = listenersList[priority] || []
    listenersList[priority].push(listener)
  }

  // Fill in the gaps
  for (i = 0, l = listenersList.length; i < l; i++) {
    if (listenersList[i] === undefined) listenersList[i] = []
  }

  return [].concat.apply([], listenersList)
}

// Register a listener
bot.addListener = function(name, listener) {
  this.listeners[name] = listener
}

// Register a plugin
bot.registerPlugin = function(plugin) {
  plugin.register(this)
  this.plugins[plugin.name] = plugin
}

// Returns true if a given plugin is registered
bot.hasPlugin = function(name) {
  return name in this.plugins
}

module.exports = bot
