var http = require('http'),
    cheerio = require('cheerio')

function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.providesCommand = 'franck-ribery'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('franck-ribery', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'franck-ribery')
      , url = 'http://www.topito.com/top-phrases-cultes-ribery'
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
        $results = $('.post-content ol li')

        $result = $results.eq(getRandomInt(1, $results.length - 1))
        content = $result.find('strong').text()

        self.reply(envelope, content)
      })
    })

  }

})(exports)
