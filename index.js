var _irc = require('irc'),
    _ = require('lodash');

var botName = 'bbbot';

var client = new _irc.Client('irc.freenode.net', botName, {
    channels: ['##ability', '#francejs'],
    floodProtection: true,
    floodProtectionDelay: 1000
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    // We're talking to the bot
    if(message.search(botName) !== -1) {
      if(message.search('list') !== -1) {
        client.say(to, "['caniuse', 'google', 'mdn', 'conj', 'gh', 'repo', 'fakeimg', 'svg', 'char']");
      }

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

      if(message.search('mdn') !== -1) {
        var match = message.match(new RegExp(botName + ": mdn (.*)"));
        var param = match[1];
        client.say(to, 'https://developer.mozilla.org/en-US/search?q=' + param + '&sitesearch=developer.mozilla.org');
      }

      if(message.search('conj') !== -1) {
        var match = message.match(new RegExp(botName + ": conj (.*)"));
        var param = match[1];
        client.say(to, 'http://leconjugueur.lefigaro.fr/conjugaison/verbe/' + param + '.html');
      }

      if(message.search('gh') !== -1) {
        var match = message.match(new RegExp(botName + ": gh (.*)"));
        var param = match[1];
        client.say(to, 'https://github.com/search?q=' + param);
      }

      if(message.search('repo') !== -1) {
        var match = message.match(new RegExp(botName + ": repo (.*)"));
        var param = match[1];
        client.say(to, 'https://github.com/' + param);
      }

      if(message.search('fakeimg') !== -1) {
        client.say(to, 'Tiens connard : http://fakeimg.pl');
      }

      if(message.search('char') !== -1) {
        client.say(to, 'Ha tu veux de l\'unicode, bah tiens, gros con : http://copypastecharacter.com');
      }

      if(message.search('svg') !== -1) {
        var list = [
          'http://iconmonstr.com/',
          'http://thenounproject.com/',
          'http://icomoon.io/app/'
        ];
        client.say(to, list.join('\n'));
      }

      if(message.search('enculé') !== -1) {
        client.say(to, 'toi, enculé.');
      }

      if(message.search('batard') !== -1) {
        client.say(to, 'wowow, on se calme.');
      }

      if(message.search('fais pas la gueule') !== -1) {
        client.say(to, 'Je ne fais pas la gueule.');
      }
    }
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});