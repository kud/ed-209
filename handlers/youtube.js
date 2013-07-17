var http = require('http'),
    https = require('https'),
    cheerio = require('cheerio');

exports.pattern = 'youtube.com';

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url,
      httpClient;

  url = context.message.match(getUrl)[0];
  httpClient = (context.message.search('https') !== -1) ? https : http;

  httpClient.get(url, function(response) {
    var dom = '';

    response.on("data", function(chunk) {
      dom += chunk;
    });

    response.on("end", function() {
      dom = dom.toString();

      $ = cheerio.load(dom);

      var $title = $('title').first()
          title = 'Youtube: ' + $title.text().replace('- YouTube', '');

      context.client.say(context.to, title);
    });
  });
}
