var http = require('http'),
    cheerio = require('cheerio')

function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.providesCommand = 'google'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('classe-americaine', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'google')
      , url = 'http://cyclim.se/script.html'
      , self = this

    http.get(url, function(response) {
      var dom = '', $

      response.on("data", function(chunk) {
        dom += chunk
      })

      response.on("end", function() {
        var $results
          , $result
          , content

        dom = dom.toString()
        $ = cheerio.load(dom)
        $results = $('.script tr')

        $result = $results.eq(getRandomInt(1, $results.length - 1)).find('td').eq(1)

        content = $result.text()

        self.reply(envelope, content)
      })
    })

  }

})(exports)
