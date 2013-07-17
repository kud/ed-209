var https = require('https'),
    cheerio = require('cheerio');

exports.pattern = 'https://twitter.com/';

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url;

  url = context.message.match(getUrl)[0];

  https.get(url, function(response) {
    var dom = '';

    response.on("data", function(chunk) {
      dom += chunk;
    });

    response.on("end", function() {
      dom = dom.toString();

      $ = cheerio.load(dom);

      var $tweet = $('.opened-tweet').find('.js-tweet-text').first(),
          $author = $('.js-account-group').first().find('.js-action-profile-name b'),
          tweet = $author.text() + ': ' + $tweet.text();

      context.client.say(context.to, tweet);
    });
  });
}

