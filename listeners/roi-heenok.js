var http = require('http'),
    cheerio = require('cheerio')

function getRandomInt( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min
}

;(function(listener) {
  listener.providesCommand = 'roi-heenok'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('roi-heenok', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'roi-heenok')
      , url = 'http://www.roi-heenok.com/citations-roi-heenok-' + getRandomInt( 1, 22 ) + '.html'
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
        $results = $('ul.citations_block li')

        $result = $results.eq(getRandomInt(1, $results.length - 1))
        content = $result.text()

        self.reply(envelope, content)
      })
    })

  }

})(exports)
