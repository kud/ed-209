// This plugins provides stdin-reading for the bot
//
// Every line entered through the console is send to the first joined channel
exports.name = 'stdin-reader';

exports.register = function(bot) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', function (chunk) {
    bot.say(bot.config.channels[0], chunk)
  })
}
