var util = require('util'),
    bot = Object.create(null)

/**
 * The main bot object
 */


bot.create = function(){
  var self = Object.create(this)
  self.constructor.apply(self, arguments)
  return self
}

bot.colors = {
    green : function(str){ return "\033[0m\033[32m" + str + "\033[0m" },
    blue : function(str){ return "\033[0m\033[34m" + str + "\033[0m" },
    yellow : function(str){ return "\033[0m\033[33m" + str + "\033[0m" }
}

bot.constructor = function(client, config){
  var self = this
  self.client = client
  self.config = config
  self.listeners = Object.create(null)
  self.plugins = Object.create(null)
  return self
}

bot.constructor.prototype = bot;

bot.join = function(channel) {
  var self = this
  console.log("  " + self.colors.blue("Joining") + " " + self.colors.yellow(channel))
  self.client.join(channel)
}

bot.part = function(channel) {
  this.client.part(channel)
}

bot.say = function(to, message) {
  this.client.say(to, message)
}

bot.reply = function(envelope, message) {
  var replyTo = envelope.type == 'channel' ? envelope.to : envelope.from

  this.say(replyTo, message)
}

bot.broadcast = function(message) {
  var self = this

  this.config.channels.forEach(function (channel) {
    self.say(channel, message)
  })
}

bot.listen = function(message, envelope) {
  var self = this,
      hasMatched = false, 
      listeners = self.listeners,
      listener, pattern, l

  for (l in listeners) {
    listener = listeners[l]
    if (listener.matcher.call(self, message, envelope)) {
      try {
        listener.callback.call(self, message, envelope)
      } catch(error) {
        self.reply(envelope, 'Error:' + util.inspect(error))
        console.error(error)
      }
      hasMatched = true
    }
  }
  pattern = self.util.commandPattern('.+')
  if (!hasMatched && message.match(pattern) !== null) {
    self.reply(envelope, 'Unknown command, sucker. :]')
  }
}

bot.addListener = function(name, listener) {
  this.listeners[name] = listener
}

bot.registerPlugin = function(plugin) {
  plugin.register(this)
  this.plugins[plugin.name] = plugin
}

bot.hasPlugin = function(name) {
  return name in this.plugins
}

module.exports = bot
