var irc = require("./lib/irc")
  , router = require("./lib/router")
  , cache = require("./lib/cache")
  , config = require("./config")
  , listeners = []

config.channels.forEach(function(channel){
  irc.addListener("message" + channel, function(from, message) {
    router.message(channel, message)
  })
})

config.listeners.forEach(function(listenerName){
  // TODO: check listeners first, and node_modules then
  listeners.push(require("./listeners/" + listenerName))
})

irc.addListener("error", function(message) {
    console.log("error: ", message)
})
