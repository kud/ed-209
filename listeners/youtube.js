var http = require('http'),
    cheerio = require('cheerio');

(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('youtube.com') !== -1;
  }

  listener.callback = function(message, envelope) {
    var pattern = /https?:\/\/\S+/g,
        getUrl = new RegExp(pattern),
        url,
        httpClient,
        self = this;

    url = message.match(getUrl)[0].replace('https', 'http');

    http.get(url, function(response) {
      var dom = '';

      response.on("data", function(chunk) {
        dom += chunk;
      });

      response.on("end", function() {
        dom = dom.toString();

        $ = cheerio.load(dom);

        var $title = $('title').first()
            title = 'Youtube: ' + $title.text().replace('- YouTube', '');

        self.reply(envelope, title);
      });
    });
  }

})(exports);

