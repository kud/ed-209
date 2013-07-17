var http = require('http'),
    cheerio = require('cheerio');

exports.pattern = 'http://open.spotify.com';

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url;

  url = context.message.match(getUrl)[0];

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

      context.client.say(context.to, '♫ ' +  artistName + ' - ' + songName + ' ♫');
    });
  });
}
