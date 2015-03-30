var cheerio = require('cheerio'),
    util = require('util'),
    getUrl = /https?:\/\/\S+/g,
    contentTypes = [
      "text/html",
      "application/xhtml+xml"
    ]

;(function(listener) {
  listener.priority = Priority.LOW

  listener.matcher = function(message, envelope) {
    return (envelope.matched !== true) &&
           message.match(getUrl) !== null;
  }

  listener.callback = function(message, envelope) {
    var url = message.match(getUrl)[0],
        proto = url.search('https') !== -1 ? 'https' : 'http',
        httpClient = require(proto),
        self = this


    httpClient.get(url, function(response) {
      var dom = '', $, $title, title

      if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
        listener.callback.call(self, response.headers.location, envelope)
        return
      }

      var recognized = contentTypes.some(function(type) {
        if (!response.headers["content-type"]) {
          return false
        }
        return response.headers["content-type"].match(type) !== null
      })

      response.on("data", function(chunk) {
        dom += chunk
      });

      response.on("end", function() {
        if (!recognized) {
          return
        }
        try {
          dom = dom.toString()
          $ = cheerio.load(dom)

          $title = $('title').first()
          title = $title.text().trim()

          if(title !== "") {
            reply = '↳ ' + title
            self.reply(envelope, reply)
          }
        } catch (err) {
          console.error("Error:" + util.inspect(err))
        }
      })
    }).on("error", function(error) {
      console.error('Error: ' + util.inspect(error))
    })
  }

})(exports)
