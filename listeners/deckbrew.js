var https = require('https')

;(function(listener) {
  listener.providesCommand = 'deckbrew'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('deckbrew', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'deckbrew'),
        url = "https://api.deckbrew.com/mtg/cards?name=" + encodeURIComponent(args.join(" ")),
        self = this

    https.get(url, function(response) {
      var json = ''

      response.on("error", function(error) {
        console.error('Error: ' + util.inspect(error))
      })

      response.on("data", function(chunk) {
        json += chunk
      })

      response.on("end", function() {
        var res = JSON.parse(json.trim()),
            name, types, cost, text,
            power, toughness, reply

        if (res.length == 0) {
          reply = "Nope!"
        } else {
          name = res[0].name
          types = res[0].types
          if (res[0].subtypes)
            types += ' ' + res[0].subtypes
          power = res[0].power ? res[0].power : 0
          toughness = res[0].toughness ? res[0].toughness : 0
          cost = res[0].cost
          text = res[0].text

          reply = '🃏  ' + name + '   ' + power + '/' + toughness + '  (' + cost + ')  ' + types + ' : "' + text + '"'
        }

        self.reply(envelope, reply)
      })
    })
  }

})(exports)
