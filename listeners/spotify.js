var http = require('http'),
    cheerio = require('cheerio'),
    getUrl = /https?:\/\/\S+/g

;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('http://open.spotify.com') !== -1
  }

  listener.callback = function(message, envelope) {
    var url = message.match(getUrl)[0],
        self = this

    http.get(url, function(response) {
      var dom = '', $

      response.on("data", function(chunk) {
        dom += chunk
      })

      response.on("end", function() {
        var $playerHeader, songName, artistName,
            reply
        dom = dom.toString()
        $ = cheerio.load(dom)
        
        $playerHeader = $('.player-header')
        songName = $playerHeader.find('h1').text()
        artistName = $playerHeader.find('h2').text().replace(' by ', '')
        reply = '♫ ' +  artistName + ' - ' + songName + ' ♫'

        self.reply(envelope, reply)
      })
    })
  }

})(exports)
