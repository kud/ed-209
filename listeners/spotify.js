var http = require('http'),
    cheerio = require('cheerio');

(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('http://open.spotify.com') !== -1;
  }

  listener.callback = function(message, envelope) {
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
            artistName = $playerHeader.find('h2').text().replace(' by ', ''),
            reply = '♫ ' +  artistName + ' - ' + songName + ' ♫';

        this.reply(envelope, reply);
      });
    });
  }

})(exports);

