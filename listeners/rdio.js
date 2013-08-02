;(function(listener) {
  
  var _underscore = /_/g
  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           message.search('rdio.com') !== -1
  }

  listener.callback = function(message, envelope) {
    var pattern = RegExp('https?://(?:www\\.)rdio\.com/artist/([^/]+)/album/([^/]+)/track/([^/]+)'),
        match = message.match(pattern),
        artistName, songName, reply

    if (match) {
      artistName = decodeURIComponent(match[1].replace(_underscore, ' '))
      songName = decodeURIComponent(match[3].replace(_underscore, ' '))
      reply = '♫ ' +  artistName + ' - ' + songName + ' ♫'

      this.reply(envelope, reply)
    }
  }
})(exports)