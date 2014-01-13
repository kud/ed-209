var klass = require("bloody-class")
  , irc = require("./irc")
  , router = require("./router")
  , cache = require("./cache")

// default callback is K
function K(){}
function identity(value){ return value }

module.exports = klass.extend({
  constructor : function(name, object){
    this.listeners[name] = this
    router.define(object.route, function(){
      var channel = cache[this.lastRoute]
      delete cache[this.lastRoute]
      irc.say(channel, object.callback.apply(null, arguments))
    })
  },
  listeners : {},
  callback : K
})
