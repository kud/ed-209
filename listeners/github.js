var https = require('https'),
    cheerio = require('cheerio'), 
    getUrl = /https?:\/\/\S+/g

;(function(listener) {
  
  var _toString = {}.toString,
      ARRAY_CLASS = "[object Array]",
      gitHubPattern = /https?:\/\/github.com\/([a-zA-Z0-9-_]+)\/([a-zA-Z0-9-_]+)(\/?)$/
      
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('https://github.com') !== -1
  }

  listener.callback = function(message, envelope) {
    var url = message.match(getUrl)[0],
        self = this

    parseURL(url, function(result) {
      self.reply(envelope, result)
    })
  }

  function parseURL(url, callback) {

    // Repository pattern
    var match   = url.match(gitHubPattern)
    if(_toString.call(match) == ARRAY_CLASS && match.length) {

      https.get(url, function(response) {
        if(response.statusCode !== 404) {
          var dom = ''

          response.on("data", function(chunk) {
            dom += chunk
          })

          response.on("end", function() {
            var $, 
                name, 
                $socialCount, $description, $lastUpdate,
                stars, forks, 
                res
            dom = dom.toString()

            $ = cheerio.load(dom)
            $socialCount = $('.social-count')
            $description = $('.repository-description').first()
            $lastUpdate = $('.updated').first()

            name = $description.text().trim()
            if(!name.length) {
              $name = $('.js-repo-home-link')
              name = $name.text().trim()
            }

            stars = $socialCount.first().text().trim(),
            forks = $socialCount.last().text().trim()

            res = [
              name,
              'Stars: ' + stars,
              'Forks: ' + forks,
              'Last update: ' + $lastUpdate.text()
            ].join(' | ')

            callback(res)
          })
        } else { // 404
          callback('This repository doesn\'t exist.')
        }

      })

    }
  }

})(exports)