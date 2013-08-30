// Imports
var irc  = require('irc'),
    fs   = require('fs'),
    path = require('path'),
    util = require('util'),
    bot  = require('./bot.js'),
    config,
    client,
    botInstance,
    i, l

Priority = {
  HIGH:   0,
  MEDIUM: 1,
  LOW:    2
}

function each(arr, fn, thisValue){
  var i = -1,
      l = arr.length >>> 0
  if(arguments.length > 2) {
    while(++i < l) if(fn.call(thisValue, arr[i], i, arr) === false) break
  } else {
    while(++i < l) if(fn(arr[i], i, arr) === false) break
  }
  return arr
}

console.log("  " + bot.colors.blue("ed-209") + " - " + bot.colors.yellow("{P!}"))
console.log("  ...")


// Load the config.json file if it exists
if (fs.existsSync('config.json')) {
  config = JSON.parse(fs.readFileSync('config.json'))
}
else {
  console.error('Wow, wow, wow! Please, have a `config.json` for fuck\'s sake!')
  process.exit(1)
}

// IRC client
client = new irc.Client(config.server, config.botName, {
    channels: config.channels,
    floodProtection: config.flood.protection,
    floodProtectionDelay: config.flood.delay
})

each(config.channels, function(channel){
  console.log("  " + bot.colors.blue("Joining") + " " + bot.colors.yellow(channel))
})

botInstance = bot.create(client, config)

client.addListener('message#', function(from, to, message) {
  botInstance.listen(message, {type: 'channel', from: from, to: to})
})

client.addListener('pm', function(from, message) {
  botInstance.listen(message, {type: 'pm', from: from})
})

client.addListener('notice', function(from, to, message) {
  botInstance.listen(message, {type: 'notice', from: from || '', to: to});
});

client.addListener('error', function(error) {
  console.error('Error: ' + util.inspect(error))
})

// Setup plugins
if (fs.existsSync('plugins-enabled')) {
  each(fs.readdirSync('plugins-enabled'), function(plugin) {
    if (plugin.charAt(0) == '.') return

    var pluginPath = './' + path.join('plugins-enabled', plugin),
        pluginModule = require(pluginPath)

    botInstance.registerPlugin(pluginModule)
  })
}

// Setup listeners
if (fs.existsSync('listeners-enabled')) {
  each(fs.readdirSync('listeners-enabled'), function(listener) {
    if (listener.charAt(0) == '.') return

    var listenerPath = './' + path.join('listeners-enabled', listener),
        listenerName = path.basename(listener, path.extname(listener)),
        listenerModule = require(listenerPath)

    if (listenerModule.register !== void 0) {
      listenerModule.register(botInstance)
    } else {
      botInstance.addListener(listenerName, listenerModule)
    }
  })
}

// There is no way I can let the previous comment here.
