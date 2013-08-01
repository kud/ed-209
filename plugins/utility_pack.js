var util = require('util')
    shellwords = require('shellwords');

exports.name = 'utility_pack';

exports.register = function(bot) {
  bot.Util = new UtilityPack(bot);
}
/**
 * Utility functions for the listeners
 */
function UtilityPack(bot) {
  this.bot = bot;
};

UtilityPack.prototype.commandPattern = function(command) {
  return new RegExp('^' + this.bot.client.nick + ": +" + command + '(\s|$)');
}

UtilityPack.prototype.matchesCommand = function(command, message) {
  var pattern = this.commandPattern(command);

  return (message.match(pattern) !== null);
}

UtilityPack.prototype.extractParams = function(message, command) {
  var plainParams = this.removeCommand(message, command);

  try {
    return shellwords.split(plainParams);
  } catch(error) {
    console.error('Error: ' + util.inspect(error));
    return [];
  }
}

UtilityPack.prototype.removeCommand = function(message, command) {
  var pattern     = this.commandPattern(command);
      plainParams = message.replace(pattern, '').trim();

  return plainParams;
}
