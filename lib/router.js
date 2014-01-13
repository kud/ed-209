var router = require("bloody-router")
  , config = require("../config")
  , cache = require("./cache")
  , botRouter = router.create()

botRouter.message = function(channel, message){
  // TODO: find a cleaner way to keep the channel
  cache[message] = channel
  this.update(message)
}

module.exports = botRouter

botRouter.defineParser("botName", {
  regexp : RegExp("\\s*(" + config.name + ")\\s*"),
  parser : function(name){
    return name
  }
})
