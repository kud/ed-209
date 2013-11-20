// This plugins provides stdin-reading for the bot
//
// Every line entered through the console is send to the first joined channel

var shellwords = require('shellwords')

exports.name = 'stdin-reader';

exports.register = function(bot) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', function (chunk) {
    if (chunk.match(/^\//) !== null) {
      var args = shellwords.split(chunk.slice(1))
      bot.client.send.apply(bot.client, args)
    } else {
      bot.say(bot.config.channels[0], chunk)
    }
  })
}
