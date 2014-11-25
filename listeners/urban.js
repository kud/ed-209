var http = require('http'),
    reNoLineBreak = /\r?\n|\r/g

;(function(listener) {
  listener.providesCommand = 'urban'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('urban', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'urban'),
        url = "http://api.urbandictionary.com/v0/define?term=" + encodeURIComponent(args.join(" ")),
        self = this

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
            word, definition, example,
            reply

        if (res.list.length == 0) {
          reply = "Nope!"
        } else {
          word = res.list[0].word.replace(reNoLineBreak, "")
          definition = res.list[0].definition.replace(reNoLineBreak, "  ")
          example = res.list[0].example.replace(reNoLineBreak, "  ")

          reply = word + ' : ' + definition + ' (ex: ' + example + ')'
        }

        self.reply(envelope, reply)
      })
    })
  }
})(exports)
