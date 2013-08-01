var util = require('util');

/**
 * The main Bot class
 */
function Bot(client, config) {
  this.client = client;
  this.config = config;
  this.listeners = {};
  this.plugins = {};
}

Bot.prototype.join = function(channel) {
  this.client.join(channel);
}

Bot.prototype.part = function(channel) {
  this.client.part(channel);
}

Bot.prototype.say = function(to, message) {
  this.client.say(to, message);
}

Bot.prototype.reply = function(envelope, message) {
  var replyTo = (envelope.type == 'channel') ? envelope.to : envelope.from;

  this.say(replyTo, message);
}

Bot.prototype.broadcast = function(message) {
  var self = this;

  this.config.channels.forEach(function (channel) {
    self.say(channel, message);
  });
}

Bot.prototype.listen = function(message, envelope) {
  var hasMatched = false;

  for (var l in this.listeners) {
    var listener = this.listeners[l];

    if (listener.matcher.call(this, message, envelope)) {
      try {
        listener.callback.call(this, message, envelope);
      } catch(error) {
        this.reply(envelope, 'Error:' + util.inspect(error))
        console.error(error);
      }
      hasMatched = true;
    }
  }

  var pattern = this.Util.commandPattern('.+');
  if (!hasMatched && (message.match(pattern) !== null)) {
    this.reply(envelope, 'Unknown command, sucker. :]');
  }
}

Bot.prototype.addListener = function(name, listener) {
  this.listeners[name] = listener;
}

Bot.prototype.registerPlugin = function(plugin) {
  plugin.register(this);
  this.plugins[plugin.name] = plugin;
}

Bot.prototype.hasPlugin = function(name) {
  return name in this.plugins;
}

module.exports = Bot;
