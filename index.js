// Import
var _irc = require('irc'),
    _ = require('lodash');

// Config
var botName = 'bobot',
    channels = [
      '##ability',
      '#francejs',
      '#bobot'
    ],
    server = 'irc.freenode.net';

// IRC client
var client = new _irc.Client(server, botName, {
    channels: channels,
    floodProtection: true,
    floodProtectionDelay: 500
});

var app = {
  list: function() {
    var keys = [];
    for(var key in this){
      keys.push(key);
    }

    return 'List: .' + keys.join(' .');
  },

  caniuse: function(param) {
    return 'http://caniuse.com/#search=' + param;
  },

  img: function(param) {
    return 'http://mebe.co/' + param + '.jpeg';
  },

  google: function(param) {
    return 'https://www.google.com/search?q=' + param
  },

  mdn: function(param) {
    return 'https://developer.mozilla.org/en-US/search?q=' + param + '&sitesearch=developer.mozilla.org';
  },

  conj: function(param) {
    return 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + param + '.html';
  },

  gh: function(param) {
    return 'https://github.com/search?q=' + param;
  },

  repo: function(param) {
    return 'https://github.com/' + param;
  },

  roll: function(param) {
    var dice = function(sides) { return Math.floor((Math.random() * sides) + 1) };

    return '1d6: ' + dice(6);
  },

  fakeimg: function() {
    return 'Tiens connard : http://fakeimg.pl && http://placekitten.com && http://placedog.com && http://placesheen.com';
  },

  unicode: function() {
    return 'Ha tu veux de l\'unicode, bah tiens, gros con : http://copypastecharacter.com';
  },

  svg: function() {
    var list = [
          'http://iconmonstr.com/',
          'http://thenounproject.com/',
          'http://icomoon.io/app/'
        ];
    return list.join('\n');
  }
}

// Listeners
client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    // We're talking to the bot
    if(message.search(botName) !== -1) {
      var catchedMessage = message.match(new RegExp(botName + ": (.*)"));

      if(catchedMessage && catchedMessage[1]) {
        var plainParams = catchedMessage[1],
            params = plainParams.split(' '),
            cmd = params.shift();

        if(typeof app[cmd] !== 'undefined') {
          client.say(to, app[cmd].apply(app, params));
        } else {
          client.say(to, 'Unknown cmd. :]');
        }
      }
    }
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});
