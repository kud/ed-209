/**
 * Listener: Twitter
 */

// Imports
var https = require('https'),
    cheerio = require('cheerio');

var twitter = {
  parseURL: function(url, callback) {
    var mode = 'bio',
        self = this;

    if(url.search(/photo/) > 0) {
      mode = 'photo';
    }

    if(url.search(/status/) > 0 && mode === 'bio') {
      mode = 'status';
    }

    // call
    https.get(url, function(response) {
      // redirection?
      if(response.statusCode === 302) {
        self.parseURL(response.headers.location, callback);
      }
      else {
        var dom = '';

        response.on("data", function(chunk) {
          dom += chunk;
        });

        response.on("end", function() {
          dom = dom.toString();
          var $ = cheerio.load(dom),

              author = '',
              tweet = '';

           // photo
          if(mode === 'photo') {
            var $tweet = $('.tweet').find('.tweet-text').first(),
                $author = $('.tweet').find('.tweet-screen-name').first(),
                $imgUrl = $('.media-gallery-image-wrapper').find('.media-slideshow-image').first(),
                imgUrl = 'Photo: ' + $imgUrl.attr('src');

            tweet = [$tweet.text(), imgUrl].join('\n');
            author = $author.text();
          }

           // status
          if(mode === 'status') {
            var $tweet = $('.opened-tweet').find('.js-tweet-text').first(),
                $author = $('.permalink-tweet-container').first().find('.js-action-profile-name b').first();

            tweet = $tweet.text();
            author = $author.text();
          }

          // bio
          if(mode === 'bio') {
            var $tweet = $('.profile-header').first().find('.bio-container .bio').first(),
                $author = $('.profile-header').first().find('.screen-name').first();

            tweet = $tweet.text();
            author = $author.text();
            author = author.substring(1);
          }

          if(tweet.length === 0) {
            tweet = 'No tweet available.'
          }
          else {
            tweet = '@' + author + ': ' + tweet;

            // clean the tweet
            tweet = tweet.replace(/\:large/gi, "");
            tweet = tweet.replace(/pic\.twitter\.com/gi, "http://pic.twitter.com");
          }

          callback(tweet);
        });
      }
    });
  }
}

var listener = {
  matcher: function(message, envelope) {
    return (envelope.type == 'channel') && message.search('https://twitter.com') !== -1;
  },

  callback: function(message, envelope) {
    var pattern = /https?:\/\/\S+/g,
        getUrl = new RegExp(pattern),
        url = undefined,
        self = this;

    url = message.match(getUrl)[0];

    twitter.parseURL(url, function(result) {
      self.reply(envelope, result);
    });
  }
}

module.exports = listener;

