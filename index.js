// Import
var _irc = require('irc'),
    _ = require('lodash'),
    shellwords = require('shellwords'),
    http = require('http'),
    cheerio = require('cheerio');

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

    // Remove the cmd itself
    keys.shift();

    return 'List: ➤ ' + keys.join('  ➤ ');
  },

  // PLEASE ORDER BELOW BY ALPHA
  caniuse: function(param) {
    return 'http://caniuse.com/#search=' + encodeURIComponent(param);
  },

  conj: function(param) {
    return 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + encodeURIComponent(param) + '.html';
  },

  fakeimg: function(width, height, text, font) {
    var content = 'http://fakeimg.pl/';

    if(width) { content += width; }
    if(height) { content += 'x' + height; }
    if(text) { content += '/?text=' + encodeURIComponent(text); }
    if(font) { content += '&font=' + encodeURIComponent(font) }

    return  content;
  },

  forkyou: function() {
    return 'Please, please, please https://github.com/kud/ed-209';
  },

  gh: function(param) {
    return 'https://github.com/search?q=' + encodeURIComponent(param);
  },

  google: function(param) {
    return 'https://www.google.com/search?q=' + encodeURIComponent(param)
  },

  img: function(param) {
    return 'http://mebe.co/' + encodeURIComponent(param) + '.jpeg';
  },

  mdn: function(param) {
    return 'https://developer.mozilla.org/en-US/search?q=' + encodeURIComponent(param) + '&sitesearch=developer.mozilla.org';
  },

  repo: function(param) {
    return 'https://github.com/' + param;
  },

  roll: function(param) {
    var dice = function(sides) { return Math.floor((Math.random() * sides) + 1) },
        expr = param.split('d'),
        diceCount = parseInt(expr[0]),
        sideCount = parseInt(expr[1]),
        results   = [];

    for (var i = 0; i < diceCount; i++)
      results.push(dice(sideCount));

    var sum = results.reduce(function(a, e) { return a + e });

    return param + ': ' + results + ' = ' + sum;
  },

  roulette: function() {
    var trigger = 4,
        user = Math.floor(Math.random()*8 + 1);

    return trigger === user ? 'BANG!' : 'Click!';
  },

  svg: function() {
    var list = [
          'http://iconmonstr.com/',
          'http://thenounproject.com/',
          'http://icomoon.io/app/'
        ];
    return list.join('\n');
  },

  unicode: function() {
    return 'Ha tu veux de l\'unicode, bah tiens, gros con : http://copypastecharacter.com';
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
            params = shellwords.split(plainParams),
            cmd = params.shift();

        if(typeof app[cmd] !== 'undefined') {
          client.say(to, app[cmd].apply(app, params));
        } else {
          client.say(to, 'Unknown cmd. :]');
        }
      }
    }

    if(message.search('open.spotify.com') !== -1) {
      var pattern = /https?:\/\/\S+/g,
          getUrl = new RegExp(pattern),
          url;

      url = message.match(getUrl)[0];

      http.get(url, function(response) {
        var dom = '';

        response.on("data", function(chunk) {
          dom += chunk;
        });

        response.on("end", function() {
          dom = dom.toString();

          $ = cheerio.load(dom);

          var $playerHeader = $('.player-header'),
              songName = $playerHeader.find('h1').text(),
              artistName = $playerHeader.find('h2').text().replace(' by ', '');

        console.log([songName, artistName]);

          client.say(to, '♫ ' +  artistName + ' - ' + songName + ' ♫');
        });
      });
    }

    if(message.search('rdio.com') !== -1) {
      var pattern    = new RegExp('https?://(?:www\\.)rdio\.com/artist/([^/]+)/album/([^/]+)/track/([^/]+)'),
          match      = message.match(pattern),
          artistName = match[1].replace('_', ' ', 'g'),
          songName   = match[3].replace('_', ' ', 'g');

      client.say(to, '♫ ' +  artistName + ' - ' + songName + ' ♫');
    }
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});

// Talk itself
var speech = [
  "Space, space...?",
  "I'm in space.",
  "Spaaaaaaaaaaaaace..."
];

client.addListener('message', function (from, to, message) {
  setInterval(function() {
    var randomNumber = _.random(0, speech.length - 1);
    client.say('##ability', speech[randomNumber]);
  }, 15000);
});



