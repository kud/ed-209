// Import
var irc = require('irc'),
    shellwords = require('shellwords'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');

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

var app = {
  list: function() {
    var keys = [];
    for(var key in this){
      keys.push(key);
    }

    // Remove the cmd itself
    keys.shift();

    return 'List: ➤ ' + keys.join('  ➤ ');
  }
}
var messageHandlers = {};

// Load commands from the commands/ dir
if (fs.existsSync('commands')) {
  var commands = fs.readdirSync('commands');

  for (var i = 0, l = commands.length; i < l; i++) {
    var cmdPath = './' + path.join('commands', commands[i]),
        cmdModule = require(cmdPath);

    for (var cmdName in cmdModule) {
      app[cmdName] = cmdModule[cmdName];
    }
  }
}

// Load handlers from the handlers/ dir
if (fs.existsSync('handlers')) {
  var handlers = fs.readdirSync('handlers');

  for (var i = 0, l = handlers.length; i < l; i++) {
    var handlerPath = './' + path.join('handlers', handlers[i]),
        handlerName = path.basename(handlers[i], path.extname(handlers[i])),
        handlerModule = require(handlerPath);

    messageHandlers[handlerName] = handlerModule;
  }
}

// Listeners
client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    // We're talking to the bot
    if(message.search(config.botName) !== -1) {
      var catchedMessage = message.match(new RegExp(config.botName + ": (.*)"));

      if(catchedMessage && catchedMessage[1]) {
        var plainParams = catchedMessage[1],
            params,
            cmd;

        try {
          params = shellwords.split(plainParams);
          cmd = params.shift();

          if(typeof app[cmd] !== 'undefined') {
            client.say(to, app[cmd].apply(app, params));
          } else {
            client.say(to, 'Unknown command, sucker. :]');
          }
        } catch(err) {
          client.say(to, 'Unknown command, sucker. :]');
        }
      }
    }

    for (var handlerName in messageHandlers) {
      var handler = messageHandlers[handlerName];

      if (message.search(handler.pattern) !== -1) {
        handler.callback.call(this, {
          from: from,
          to: to,
          message: message,
          client: client
        });
      }
    }
});

client.addListener('pm', function (from, message) {
  console.log(from + ' => ME: ' + message);
  if (message == "reload " + config.api_key) {
    var spawn = require('child_process').spawn;
    git = spawn('git', ['pull']);

    git.on('close', function(code) {
      console.log('git pull finished: '+code);
      client.say(from, 'Done');
    });
  }
});

client.addListener('error', function (error) {
  console.error('Error: ' + util.inspect(error));
});

// Allow admin to talk via shell.
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (chunk) {
  client.say(config.channels[0], chunk);
});

