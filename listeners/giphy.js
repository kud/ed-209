var http = require('http')

;(function(listener) {
  listener.providesCommand = 'giphy'

  listener.matcher = function( message, envelope ) {
    return ( envelope.type == 'channel' ) &&
           this.util.matchesCommand( 'giphy', message )
  }

  listener.callback = function( message, envelope ) {
    var args = this.util.extractParams( message, 'giphy' )
        , self = this
        , url = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC'
        , sentence = encodeURIComponent( args )

    if ( sentence.length > 0 )
      url += '&tag=' + sentence

    http.get( url, function( response ) {
      var data = ''

      response.on( "data", function( chunk ) {
        data += chunk
      })

      response.on( "end", function() {
        var json = JSON.parse( data )

        var content = json.data.image_original_url

        self.reply( envelope, content )
      })
    })

  }

})(exports)
