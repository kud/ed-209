var evalBox = (function(){
  function require() { throw "fucker"; }
  var module
  return function(str){
    try {
      var r = eval(str)
      return "" + r
    } catch(e){
      return "Errored, fucker"
    }
  }
})();


(function(){
  // Import
  var _irc = require('irc'),
      _ = require('lodash'),
      shellwords = require('shellwords'),
      http = require('http'),
      https = require('https'),
      cheerio = require('cheerio'),
      fs = require('fs');

  process.stdin.resume();

  // Config
  var config = {
    botName: 'bobot',
    channels: [
      '#putaindecode',
      '#francejs',
      '#bobot'
    ],
    server: 'irc.freenode.net'
  };

  // Load the config.json file if it exists
  if (fs.existsSync('config.json')) {
    var jsonConfig = JSON.parse(fs.readFileSync('config.json'));

    for (var setting in jsonConfig) {
      config[setting] = jsonConfig[setting]
    }
  }

  // IRC client
  var client = new _irc.Client(config.server, config.botName, {
      channels: config.channels,
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

    paste: function() {
      return 'Paste your code on https://gist.github.com/ for fuck\'s sake!';
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

    js: function(str){
      return "> " + evalBox(str)
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

      if(message.search('http://open.spotify.com') !== -1) {
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

            client.say(to, '♫ ' +  artistName + ' - ' + songName + ' ♫');
          });
        });
      }

      if(message.search('rdio.com') !== -1) {
        var pattern    = new RegExp('https?://(?:www\\.)rdio\.com/artist/([^/]+)/album/([^/]+)/track/([^/]+)'),
            match      = message.match(pattern);

        if (match) {
          var artistName = decodeURIComponent(match[1].replace(/_/g, ' ')),
              songName   = decodeURIComponent(match[3].replace(/_/g, ' '));

          client.say(to, '♫ ' +  artistName + ' - ' + songName + ' ♫');
        }
      }

      if(message.search('https://twitter.com/') !== -1) {
        var pattern = /https?:\/\/\S+/g,
            getUrl = new RegExp(pattern),
            url;

        url = message.match(getUrl)[0];

        https.get(url, function(response) {
          var dom = '';

          response.on("data", function(chunk) {
            dom += chunk;
          });

          response.on("end", function() {
            dom = dom.toString();

            $ = cheerio.load(dom);

            var $tweet = $('.opened-tweet').find('.js-tweet-text').first(),
                $author = $('.js-account-group').first().find('.js-action-profile-name b'),
                tweet = $author.text() + ': ' + $tweet.text();

            client.say(to, tweet);
          });
        });
      }

      if(message.search('youtube.com') !== -1) {
        var pattern = /https?:\/\/\S+/g,
            getUrl = new RegExp(pattern),
            url,
            httpClient;

        url = message.match(getUrl)[0];
        httpClient = (message.search('https') !== -1) ? https : http;

        httpClient.get(url, function(response) {
          var dom = '';

          response.on("data", function(chunk) {
            dom += chunk;
          });

          response.on("end", function() {
            dom = dom.toString();

            $ = cheerio.load(dom);

            var $title = $('title').first()
                title = 'Youtube: ' + $title.text().replace('- YouTube', '');

            client.say(to, title);
          });
        });
      }
  });

  client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
  });

  // Allow admin to talk via shell.
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (chunk) {
    client.say('##ability', chunk);
  });

  // Talk itself
  // var speech = [
  //   "Space, space...?",
  //   "I'm in space.",
  //   "Spaaaaaaaaaaaaace..."
  // ];

  // setInterval(function() {
  //     var randomNumber = _.random(0, speech.length - 1);
  //     client.say('##ability', speech[randomNumber]);
  //   }, 15000);


})();
