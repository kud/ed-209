function echoFilter(bot, envelope) {
  bot.reply(envelope, envelope.message)
}

/**
 * This plugin makes the bot echo back everything it sees. Yes, it is quite annoying.
 */
export default function register(bot) {
  bot.addFilter(echoFilter)
}
