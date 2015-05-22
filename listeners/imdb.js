var http = require('http')

;(function(listener) {

  var _underscore = /_/g
    listener.matcher = function(message, envelope) {
      return (envelope.type == 'channel') &&
        message.search('imdb.com') !== -1
    }

  listener.callback = function(message, envelope) {
    var pattern = RegExp('https?://(?:www\\.)imdb\.com/title/([^/]+)/'),
    match = message.match(pattern),
    url = "http://www.myapifilms.com/imdb?format=JSON&lang=en-us&actors=S&idIMDB=",
    idIMDB,
    self = this

    if (match) {
      idIMDB = decodeURIComponent(match[1].replace(_underscore, ' ')),
      url += idIMDB

      http.get(url, function(response) {
        var json = ''

        response.on("error", function(error) {
          console.error('Error: ' + util.inspect(error))
        })

        response.on("data", function(chunk) {
          json += chunk
        })

        response.on("end", function() {
          var res = JSON.parse(json.trim()),
              i,
              reply = ''

          if (res.title) {
            reply += '↳ ' + res.title
          }

          if (res.year) {
            reply += ' (' + res.year + ') '
          }

          if (res.rating) {
            reply += res.rating + '★ '
          }

          if (res.actors) {
            reply += ' - '
            for (i = 0; i < 3; i++) {
              if (res.actors[i]) {
                reply += res.actors[i].actorName + ', '
              }
            }
          }

          if (reply) {
            self.reply(envelope, reply)
          }

        })
      })
    }
  }
})(exports)
