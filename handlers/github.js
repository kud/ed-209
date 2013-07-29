var https   = require('https'),
    cheerio = require('cheerio');

exports.pattern = 'https://github.com/';

var getContent = function (url, context) {

  var patterns = [{

    pattern: new RegExp('https?://github.com/([^/]+)/([^/]+)'),
    fn: function() {
      https.get(url, function(response) {
        var dom = '';

        response.on("data", function(chunk) {
          dom += chunk;
        });

        response.on("end", function() {
          dom = dom.toString();

          var $ = cheerio.load(dom),
              $socialCount = $('.social-count'),
              $description = $('.repository-description').first();

          var description = $description.text().trim();

          var stars = $socialCount.first().text().trim(),
              forks = $socialCount.last().text().trim();

          context.client.say(context.to, description + ' | Stars: ' + stars + ' | Forks: ' + forks);
        });

      });
    }

  }, {

    pattern: new RegExp('https?://github.com/([^/]+)'),
    fn: function() {}

  }];

  var patternsLength = patterns.length;

  for(var i = 0; i < patternsLength ; i++) {
    var patternObj = patterns[i],
        pattern    = patternObj.pattern,
        fn         = patternObj.fn,
        match      = context.message.match(pattern);
    if(match instanceof Array && match.length > 0) {
      fn();
    }
  }

};

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url;

  url = context.message.match(getUrl)[0];

  getContent(url, context);
};

