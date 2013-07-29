var https = require('https'),
    cheerio = require('cheerio');

exports.pattern = 'https://twitter.com/';

function getContent(url, context) {

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

        context.client.say(context.to, tweet);
        context.client.say(context.to, imgUrl);
      });

    });
  }

  // tweet
  else if(url.search(/status/) > 0) {
    https.get(url, function(response) {
      if(response.statusCode === 302) {
        getContent(response.headers.location, context);
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

          context.client.say(context.to, tweet);
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

        context.client.say(context.to, tweet);
      });
    });
  }
}

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url;

  url = context.message.match(getUrl)[0];

  getContent(url, context);
}

