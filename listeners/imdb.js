var http = require('http'),
    fs   = require('fs'),
    config

if (fs.existsSync('config.json')) {
  config = JSON.parse(fs.readFileSync('config.json'))
}


;(function(listener) {

  var _underscore = /_/g
    listener.matcher = function(message, envelope) {
      return (envelope.type == 'channel') &&
        message.search('imdb.com') !== -1
    }

  listener.callback = function(message, envelope) {
    var pattern = RegExp('https?://(?:www\\.)imdb\.com/title/([^/]+)/?'),
        match = message.match(pattern),
        token = config.api_keys.my_api_films,
        options = "&format=json&language=en-us&actors=1",
        url = "http://www.myapifilms.com/imdb/idIMDB?",
        idIMDB,
        self = this

    if (match) {
      idIMDB = decodeURIComponent(match[1].replace(_underscore, ' ')),
      url += "idIMDB=" + idIMDB + "&token=" + token + options

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

          res.data.movies.forEach(function(movie) {
            if (movie.title) {
              reply += '↳ ' + movie.title
            }

            if (movie.year) {
              reply += ' (' + movie.year + ') '
            }

            if (movie.rating) {
              reply += movie.rating + '★ '
            }

            if (movie.actors) {
              reply += ' - '
              for (i = 0; i < 4; i++) {
                if (movie.actors[i]) {
                  reply += movie.actors[i].actorName + ', '
                }
              }
            }
          })

          if (reply) {
            self.reply(envelope, reply)
          }

        })
      })
    }
  }
})(exports)
