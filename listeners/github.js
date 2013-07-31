var https   = require('https'),
    cheerio = require('cheerio');

(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('https://github.com') !== -1;
  };

  listener.callback = function(message, envelope) {
    var pattern = /https?:\/\/\S+/g,
        getUrl = new RegExp(pattern),
        url,
        self = this;

    url = message.match(getUrl)[0];

    parseURL(url, function(result) {
      self.reply(envelope, result);
    });
  };

  function parseURL(url, callback) {

    // Repository pattern
    var pattern = new RegExp(/https?:\/\/github.com\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)$/),
        match   = url.match(pattern);
    if(match instanceof Array && match.length > 0) {

      https.get(url, function(response) {
        if(response.statusCode !== 404) {
          var dom = '';

          response.on("data", function(chunk) {
            dom += chunk;
          });

          response.on("end", function() {
            dom = dom.toString();

            var $ = cheerio.load(dom),
                $socialCount = $('.social-count'),
                $description = $('.repository-description').first(),
                $lastUpdate  = $('.updated').first();

            var description = $description.text().trim();

            var stars = $socialCount.first().text().trim(),
                forks = $socialCount.last().text().trim();

            var res = [
              description,
              'Stars: ' + stars,
              'Forks: ' + forks,
              'Last update: ' + $lastUpdate.text()
            ].join(' | ');

            callback(res);
          });
        } else { // 404
          callback('This repository doesn\'t exist.');
        }

      });

    }
  }

})(exports);