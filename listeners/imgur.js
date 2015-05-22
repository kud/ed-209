var https = require('https'),
    fs   = require('fs'),
    config

if (fs.existsSync('config.json')) {
  config = JSON.parse(fs.readFileSync('config.json'))
}

;(function(listener) {

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
      message.search('imgur.com') !== -1
  }

  listener.callback = function(message, envelope) {
    var pattern = RegExp('https?://(?:www\.)?imgur\.com/gallery/([^/]+)/?'),
        match = message.match(pattern),
        options,
        idImage,
        self = this

    if (match) {
      idImage = match[1],
      options = {
        host: 'api.imgur.com',
        path: '/3/image/' + idImage,
        port: "443",
        headers : {
          "Authorization" : "Client-ID " + config.api_keys.imgur_client_id,
          "Content-Type" : "application/json"
        }
      }

      https.get(options, function(response) {
        var json = ''

        response.on("error", function(error) {
          console.error('Error: ' + util.inspect(error))
        })

        response.on("data", function(chunk) {
          json += chunk
        })

        response.on("end", function() {
          var res = JSON.parse(json.trim()),
              reply = ''

          if (res.status == 200) {
            reply += '↳ ' + res.data.title
            if (res.data.nsfw) {
              reply += ' (NSFW)'
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
