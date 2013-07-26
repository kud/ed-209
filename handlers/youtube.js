var http = require('http'),
    cheerio = require('cheerio');

exports.pattern = 'youtube.com';

exports.callback = function(context) {
  var pattern = /https?:\/\/\S+/g,
      getUrl = new RegExp(pattern),
      url,
      httpClient;

  url = context.message.match(getUrl)[0].replace('https', 'http');

  http.get(url, function(response) {
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
