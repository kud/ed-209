var http = require('http'),
    cheerio = require('cheerio'),
    getUrl = /https?:\/\/\S+/g

;(function(listener) {
  listener.priority = Priority.LOW

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('cl.ly') !== -1 &&
           message.match(getUrl) !== null;
  }

  listener.callback = function(message, envelope) {
    var url = message.match(getUrl)[0].replace('https', 'http'),
        httpClient,
        self = this

    http.get(url, function(response) {
      var dom = '', $, $title, title

      response.on("data", function(chunk) {
        dom += chunk
      });

      response.on("end", function() {
        dom = dom.toString()
        $ = cheerio.load(dom)

        url = $('a.embed').first().attr('href')

        self.reply(envelope, url)
      })
    })
  }

})(exports)
