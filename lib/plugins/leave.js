const USAGE = 'leave - Forces the bot to leave the current channel'

function leaveWith(leaveMessage) {
  return function leave(bot, envelope, ...args) {
    if (args[0] === '--help') {
      return bot.reply(envelope, USAGE)
    }

    bot.reply(envelope, leaveMessage)
    bot.client.part(envelope.to)
  }
}

/**
 * This plugin adds the `leave` command, allowing to force the bot to leave a
 * channel.
 *
 * ## Configuration options
 *
 * - `leaveMessage`: A message that will be sent to the channel before leaving.
 *   Defaults to "Bye there!".
 *
 * ## Provided commands
 *
 * - `leave`: Forces the bot to leave the current channel
 */
export default function register(bot, config) {
  const leaveMessage = config.leaveMessage || "Bye there!"

  bot.addCommand('leave', leaveWith(leaveMessage), ['channel'])
}
