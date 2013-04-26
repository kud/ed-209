var _irc = require('irc'),
    _ = require('lodash');

var botName = 'bbbot';

var client = new _irc.Client('irc.freenode.net', botName, {
    channels: ['##ability'],
    floodProtection: true,
    floodProtectionDelay: 1000
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    // We're talking to the bot
    if(message.search(botName) !== -1) {
      if(message.search('caniuse') !== -1) {
        var match = message.match(new RegExp(botName + ": caniuse (.*)"));
        var param = match[1];
        client.say(to, 'http://caniuse.com/#search=' + param);
      }

      if(message.search('google') !== -1) {
        var match = message.match(new RegExp(botName + ": google (.*)"));
        var param = match[1];
        client.say(to, 'https://www.google.com/search?q=' + param);
      }
    }

    if(message.search('caniuse') !== -1) {

    }
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});