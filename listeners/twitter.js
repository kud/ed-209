var https = require('https'),
    cheerio = require('cheerio'),
    reTweet = /pic\.twitter\.com/gi,
    reImgUrl = /\:large/gi,
    getUrl = /https?:\/\/\S+/g

;(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('https://twitter.com') !== -1
  }

  listener.callback = function(message, envelope) {
    var url = message.match(getUrl)[0],
        self = this

    parseURL(url, function(result) {
      self.reply(envelope, result)
    })
  }

  function parseURL(url, callback) {
    var dom = '', $,
        $tweet, $author, $imgUrl, tweet, imgUrl, $title

    // photo
    if(url.search(/photo/) > 0) {
        https.get(url, function(response) {

        response.on("data", function(chunk) {
          dom += chunk;
        })

        response.on("end", function() {
          dom = dom.toString()
          $ = cheerio.load(dom)

          $tweet = $('.tweet').find('.tweet-text').first()
          $author = $('.tweet').find('.username').find('b').first()
          $imgUrl = $('a.media-thumbnail').first()
          tweet = '@' + $author.text() + ': ' + $tweet.text()
          imgUrl = $imgUrl.attr('data-url')

          tweet = tweet.replace(reTweet, "http://pic.twitter.com")
          imgUrl = imgUrl.replace(reImgUrl, "")

          callback([tweet, imgUrl].join('\n'))
        })

      })
    }

    // tweet
    else if(url.search(/status/) > 0) {
      https.get(url, function(response) {
        if(response.statusCode === 302) {
          parseURL(response.headers.location, callback)
        }
        else {
          dom = ''

          response.on("data", function(chunk) {
            dom += chunk
          })

          response.on("end", function() {
            dom = dom.toString()
            $ = cheerio.load(dom)

            $tweet = $('.opened-tweet').find('.js-tweet-text').first()
            $author = $('.permalink-tweet-container').first().find('.js-action-profile-name b').first()
            tweet = '@' + $author.text() + ': ' + $tweet.text()
            tweet = tweet.replace(reTweet, "http://pic.twitter.com")

            callback(tweet)
          })
        }
      })
    }

    // search: only show the title of the page, no sense getting a specific tweet
    else if(url.search(/search/) > 0) {
      https.get(url, function(response) {
        dom = ''

        response.on("data", function(chunk) {
          dom += chunk;
        })

        response.on("end", function() {
          dom = dom.toString()
          $ = cheerio.load(dom)

          $title = $('title').text()

          callback($title)
        })
      })
    }

    // bio
    else {
      https.get(url, function(response) {
        dom = ''

        response.on("data", function(chunk) {
          dom += chunk;
        })

        response.on("end", function() {
          dom = dom.toString()
          $ = cheerio.load(dom)

          $tweet = $('.ProfileHeaderCard').first().find('.ProfileHeaderCard-bio').first()
          $author = $('.ProfileHeaderCard').first().find('.ProfileHeaderCard-name').first()
          tweet = $author.text().trim() + ': ' + $tweet.text().trim()

          callback(tweet)
        })
      })
    }
  }

})(exports)
