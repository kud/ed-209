// Imports
var irc        = require('irc'),
    fs         = require('fs'),
    path       = require('path'),
    util       = require('util'),
    Bot        = require('./bot.js');

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

client.addListener('error', function(error) {
  console.error('Error: ' + util.inspect(error));
});

// Automatically setup listeners from the listeners/ dir
if (fs.existsSync('listeners')) {
  var listeners = fs.readdirSync('listeners');

  for (var i = 0, l = listeners.length; i < l; i++) {
    var listenerPath = './' + path.join('listeners', listeners[i]),
        listenerName = path.basename(listeners[i], path.extname(listeners[i])),
        listenerModule = require(listenerPath);

    bot.addListener(listenerName, listenerModule);
  }
}

// Allow admin to talk via shell.
// TODO: move this to a separate plugin
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
  client.say(config.channels[0], chunk);
});

