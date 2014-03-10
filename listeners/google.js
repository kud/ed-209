var https = require('https'),
    cheerio = require('cheerio')

;(function(listener) {
  listener.providesCommand = 'google'

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('google', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'google')
      , url = 'https://www.google.com/search?q=' + encodeURIComponent(args)
      , self = this

    https.get(url, function(response) {
      var dom = '', $

      response.on("data", function(chunk) {
        dom += chunk
      })

      response.on("end", function() {
        var $results
          , titleResult
          , urlResult

        dom = dom.toString()
        $ = cheerio.load(dom)
        $results = $('#search .g')

        $results.each( function(){
          var $a = $(this).find('h3 a')
          titleResult = $a.text()
          urlResult = $a.attr('href')

          urlResult = urlResult.replace(/\/url\?q=/i, '')
          urlResult = urlResult.split('&sa=')[0]

          self.reply(envelope, titleResult + ': ' + urlResult)
        })

      })
    })

  }

})(exports)
