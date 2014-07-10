;(function(listener) {
  listener.providesCommand = 'caniuse'

  var request = require('request')
    , caniuseDataUrl = 'https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json'
    , caniuseData

  request(caniuseDataUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      caniuseData = JSON.parse(body)
    }
  })

  listener.matcher = function(message, envelope) {
    return (envelope.type == 'channel') &&
           this.util.matchesCommand('caniuse', message)
  }

  listener.callback = function(message, envelope) {
    var args = this.util.extractParams(message, 'caniuse')

    if(typeof caniuseData !== "object") // if we didn't succeed in loading the caniuse database, just provide a link to the website
      this.reply(envelope, caniuseFallback.apply(this, args))
    else {
      var propertyIndex

      for(propertyIndex in args) {
        var property = args[propertyIndex]
          , propertyData, key, item
          , matchesStartsWith = []
          , matchesContains = []
          , support = []
          , infosLight = ['ie', 'firefox', 'chrome'], infosLightProp, letters

        if(typeof caniuseData.data[args[property]] !== typeof void 0) { // if we have a perfect match with the property name
          propertyData = caniuseData.data[args[property]]
        } else {
          for(key in caniuseData.data) {
            if(key.indexOf(property) === 0) { // search if the property name starts with the property requested
              matchesStartsWith.push(key)
            }
            if(key.indexOf(property) > -1) { // search if the property name contains the property requested
              matchesContains.push(key)
            }
          }
          if(matchesStartsWith.length == 1 || matchesContains.length == 1) { // if we have a unqiue match in any case
            item = matchesStartsWith.shift() || matchesContains.shift()
            propertyData = caniuseData.data[item]
          }
          else if(matchesStartsWith.length > 0) { // if we have several matches for the property requested, ask to specify
              return this.reply(envelope, '> for property "'+property+'", i found several results, please specify between '+matchesStartsWith.join(','))
          }
          else if(matchesContains.length > 0) { // if we have several matches for the property requested, ask to specify
              return this.reply(envelope, '> for property "'+property+'", i found several results, please specify between '+matchesContains.join(','))
          }
          else {
            return this.reply(envelope, '> no match in the caniuse database for property "'+property+'"')
          }

          infosLight.forEach(function(item){
            support[item] = {}
            for(infosLightProp in propertyData.stats[item]) {
              console.log(propertyData.stats[item][infosLightProp])
              letters = propertyData.stats[item][infosLightProp].split(' ')
              letters.forEach(function(letter) {
                console.log(support[item][letter])
                if(typeof support[item][letter] === typeof void 0) support[item][letter] = 0

                if(parseFloat(propertyData.stats[item][infosLightProp]) > support[item][letter])
                  support[item][letter] = parseFloat(propertyData.stats[item][infosLightProp])
              })
            }
          })
          console.log(support)

          this.reply(envelope, '> '+propertyData.title)
          this.reply(envelope, '> '+propertyData.spec)
        }
      }
    }
  }

  function caniuseFallback(param) {
    return 'http://caniuse.com/#search=' + encodeURIComponent(param)
  }

  function sortByVersion(a, b) {
    if(parseFloat(a) < parseFloat(b))
      return -1
    if(parseFloat(a) > parseFloat(b))
      return 1
    return 0
  }

})(exports)
