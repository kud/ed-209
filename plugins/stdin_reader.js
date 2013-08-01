exports.name = 'stdin-reader';

exports.register = function(bot) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (chunk) {
    bot.say(bot.config.channels[0], chunk);
  });

}
