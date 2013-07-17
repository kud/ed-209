exports.pattern = 'rdio.com';

exports.callback = function(context) {
  var pattern    = new RegExp('https?://(?:www\\.)rdio\.com/artist/([^/]+)/album/([^/]+)/track/([^/]+)'),
      match      = context.message.match(pattern);

  if (match) {
    var artistName = decodeURIComponent(match[1].replace(/_/g, ' ')),
        songName   = decodeURIComponent(match[3].replace(/_/g, ' '));

    context.client.say(context.to, '♫ ' +  artistName + ' - ' + songName + ' ♫');
  }
}
