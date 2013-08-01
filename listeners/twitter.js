var https = require('https'),
    cheerio = require('cheerio');

(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('https://twitter.com') !== -1;
  }

  listener.callback = function(message, envelope) {
    var pattern = /https?:\/\/\S+/g,
        getUrl = new RegExp(pattern),
        url,
        self = this;

    url = message.match(getUrl)[0];

    parseURL(url, function(result) {
      self.reply(envelope, result);
    });
  }

  function parseURL(url, callback) {

    // photo
    if(url.search(/photo/) > 0) {
        https.get(url, function(response) {
        var dom = '';

        response.on("data", function(chunk) {
          dom += chunk;
        });

        response.on("end", function() {
          dom = dom.toString();

          $ = cheerio.load(dom);

          var $tweet = $('.tweet').find('.tweet-text').first(),
              $author = $('.tweet').find('.tweet-screen-name').first(),
              $imgUrl = $('.media-gallery-image-wrapper').find('.media-slideshow-image').first();
              tweet = '@' + $author.text() + ': ' + $tweet.text(),
              imgUrl = $imgUrl.attr('src');

          var reTweet = /pic\.twitter\.com/gi;

          tweet = tweet.replace(reTweet, "http://pic.twitter.com");

          var reImgUrl = /\:large/gi;

          imgUrl = imgUrl.replace(reImgUrl, "");

          callback([tweet, imgUrl].join('\n'));
        });

      });
    }

    // tweet
    else if(url.search(/status/) > 0) {
      https.get(url, function(response) {
        if(response.statusCode === 302) {
          parseURL(response.headers.location, callback);
        }
        else {
          var dom = '';

          response.on("data", function(chunk) {
            dom += chunk;
          });

          response.on("end", function() {
            dom = dom.toString();

            $ = cheerio.load(dom);

            var $tweet = $('.opened-tweet').find('.js-tweet-text').first(),
              $author = $('.permalink-tweet-container').first().find('.js-action-profile-name b').first(),
              tweet = '@' + $author.text() + ': ' + $tweet.text();

            callback(tweet);
          });
        }
      });
    }

    // bio
    else {
      https.get(url, function(response) {
        var dom = '';

        response.on("data", function(chunk) {
          dom += chunk;
        });

        response.on("end", function() {
          dom = dom.toString();

          $ = cheerio.load(dom);

          var $tweet = $('.profile-header').first().find('.bio-container .bio').first(),
              $author = $('.profile-header').first().find('.screen-name').first(),
              tweet = $author.text() + ': ' + $tweet.text();

          callback(tweet);
        });
      });
    }
  }

})(exports);

