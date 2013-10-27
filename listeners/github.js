var https = require('https'),
    cheerio = require('cheerio'),
    moment = require('moment'),
    getUrl = /https?:\/\/\S+/g

;(function(listener) {

  var _toString = {}.toString,
      ARRAY_CLASS = "[object Array]",
      repoPattern = /https?:\/\/github.com\/(?:[^\/]+)\/(?:[^\/]+)(?:\/?)$/,
      issuePattern = /https?:\/\/github.com\/(?:[^\/]+)\/([^\/]+)\/(?:issues|pull)\/(?:\d+)(\/?)$/

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           (message.match(repoPattern) !== null ||
            message.match(issuePattern) !== null)
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
    var match = url.match(repoPattern)
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

    } // end repository pattern

    // Issue pattern
    var match = url.match(issuePattern)
    if(_toString.call(match) == ARRAY_CLASS && match.length) {
      https.get(url, function(response) {
        if(response.statusCode !== 404) {
          var dom = ''

          response.on("data", function(chunk) {
            dom += chunk
          })

          response.on("end", function() {
            var $,
                $discussionTitle,
                $participants,
                $time,
                repo, details,
                res
            dom = dom.toString()

            $ = cheerio.load(dom)
            $discussionTitle = $('h2.discussion-topic-title')
            $participants = $('.pull-participation .quickstat strong')
            $time = $('.discussion-topic-header time')

            repo = match[1] + ':'
            details = [
              '(Opened ',
              moment($time.attr('datetime')).fromNow(),
              ', ',
              $participants.text(),
              ' participants)'
            ].join('')

            res = [
              repo,
              $discussionTitle.text(),
              details
            ].join(' ')

            callback(res)
          })
        } else { // 404
          callback('This repository doesn\'t exist.')
        }
      })
    } // end issue pattern

  }

})(exports)
