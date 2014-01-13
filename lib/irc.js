var irc = require("irc")
  , config = require("../config")

module.exports = new irc.Client(config.server, config.name, {
  channels: config.channels,
  floodProtection: config.flood.protection,
  floodProtectionDelay: config.flood.delay
})
