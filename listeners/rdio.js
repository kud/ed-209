(function(listener) {
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('rdio.com') !== -1;
  }

  listener.callback = function(message, envelope) {
    var pattern    = new RegExp('https?://(?:www\\.)rdio\.com/artist/([^/]+)/album/([^/]+)/track/([^/]+)'),
        match      = message.match(pattern);

    if (match) {
      var artistName = decodeURIComponent(match[1].replace(/_/g, ' ')),
          songName   = decodeURIComponent(match[3].replace(/_/g, ' ')),
          reply      = '♫ ' +  artistName + ' - ' + songName + ' ♫';

      this.reply(envelope, reply);
    }
  }
})(exports);
