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
      fs = require('fs')
      path = require('path');

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
    }
  }

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
