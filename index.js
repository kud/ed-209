// Imports
var irc  = require('irc'),
    fs   = require('fs'),
    path = require('path'),
    util = require('util'),
    Bot  = require('./bot.js');

// Load the config.json file if it exists
if (fs.existsSync('config.json')) {
  var config = JSON.parse(fs.readFileSync('config.json'));
}
else {
  console.error('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!');
  process.exit(1);
}

// IRC client
var client = new irc.Client(config.server, config.botName, {
    channels: config.channels,
    floodProtection: config.flood.protection,
    floodProtectionDelay: config.flood.delay
});

var bot = new Bot(client, config);

client.addListener('message#', function(from, to, message) {
  bot.listen(message, {type: 'channel', from: from, to: to});
});

client.addListener('pm', function(from, message) {
  bot.listen(message, {type: 'pm', from: from});
});

client.addListener('notice', function(from, to, message) {
  bot.listen(message, {type: 'notice', from: from, to: to});
});

client.addListener('error', function(error) {
  console.error('Error: ' + util.inspect(error));
});

// Setup plugins
if (fs.existsSync('plugins')) {
  var plugins = fs.readdirSync('plugins');

  for (var i = 0, l = plugins.length; i < l; i++) {
    var pluginPath = './' + path.join('plugins', plugins[i]),
        pluginModule = require(pluginPath);

    bot.registerPlugin(pluginModule);
  }
}

// Setup listeners
if (fs.existsSync('listeners')) {
  var listeners = fs.readdirSync('listeners');

  for (var i = 0, l = listeners.length; i < l; i++) {
    var listenerPath = './' + path.join('listeners', listeners[i]),
        listenerName = path.basename(listeners[i], path.extname(listeners[i])),
        listenerModule = require(listenerPath);

    if (listenerModule.register !== undefined) {
      listenerModule.register(bot);
    } else {
      bot.addListener(listenerName, listenerModule);
    }
  }
}

// Death metal all the way!
