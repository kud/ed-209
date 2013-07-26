var https = require('https'),
    cheerio = require('cheerio');

exports.pattern = 'https://twitter.com/';

function getContent(url, context) {
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

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url;

  url = context.message.match(getUrl)[0];

  getContent(url, context);
}

